import React, { Component } from 'react'
import { View, TouchableOpacity, AppState, Text } from 'react-native'
import moment, { Duration } from 'moment'

import {
  startSessionTimer,
  stopSessionTimer,
  getBackgroundTimerEndTime,
  getCurrentTimeStamp,
  formatCountdown,
} from '../../utils'

import { IModalBodyProps, IModalBodyStates } from './types'
import styles from './styles'

let defaultModalTimeDuration: Duration
let modalEndtime: number = 0
let functionDebounceTime: number = 310

export default class ModalBody extends Component<
  IModalBodyProps,
  IModalBodyStates
> {
  state = {
    countdown: moment.duration(this.props.modalTime, 'minutes'),
  }

  componentDidMount() {
    const { modalConfigs } = this.props
    AppState.addEventListener('change', this.handleAppStateChangeForCountdown)
    defaultModalTimeDuration = moment.duration(this.props.modalTime, 'minutes')
    modalEndtime =
      defaultModalTimeDuration.asMilliseconds() + getBackgroundTimerEndTime()

    if (modalConfigs) {
      // Functions are called 10ms after the modal is hidden
      functionDebounceTime =
        Math.max(
          modalConfigs.animationInTiming || 0,
          modalConfigs.animationOutTiming || 0,
          modalConfigs.backdropTransitionInTiming || 0,
          modalConfigs.backdropTransitionOutTiming || 0,
        ) + 10
    }

    this.startCountdown()
  }

  componentWillUnmount() {
    AppState.removeEventListener(
      'change',
      this.handleAppStateChangeForCountdown,
    )
  }

  handleAppStateChangeForCountdown = (nextAppState: string) => {
    if (nextAppState === 'active') {
      this.startCountdown()
    }
  }

  initializeSessionCountdown = (duration: number): Duration => {
    return duration >= 0
      ? moment.duration(duration, 'milliseconds')
      : defaultModalTimeDuration
  }

  startCountdown = () => {
    const duration = modalEndtime - getCurrentTimeStamp()

    if (duration > 0) {
      this.setState(
        { countdown: this.initializeSessionCountdown(duration) },
        () => startSessionTimer(this.handleCountDown, 1000),
      )
    } else {
      this.handleSessionTimeout(false)
    }
  }

  handleCountDown = () =>
    this.setState(
      ({ countdown }) => ({ countdown: countdown.subtract(1, 's') }),
      () => {
        if (this.state.countdown.asMilliseconds() <= 0) {
          this.handleSessionTimeout(false)
        }
      },
    )

  handleSessionTimeout = (isStillAuthed: boolean, manualPress?: boolean) => {
    this.resetCountdown()
    this.props.hideModal()
    stopSessionTimer(isStillAuthed)
    if (this.props.onTimerEnd && !isStillAuthed && !manualPress) {
      setTimeout(this.props.onTimerEnd, functionDebounceTime)
    }
  }

  handleYesBtnPress = () => {
    const {
      confirmButtonConfigs: { onPress },
    } = this.props
    this.handleSessionTimeout(true, true)
    if (onPress) {
      setTimeout(onPress, functionDebounceTime)
    }
  }

  handleNoBtnPress = () => {
    const {
      cancelButtonConfigs: { onPress },
    } = this.props
    this.handleSessionTimeout(false, true)
    if (onPress) {
      setTimeout(onPress, functionDebounceTime)
    }
  }

  resetCountdown = () =>
    this.setState({
      countdown: this.initializeSessionCountdown(-1),
    })

  render() {
    const { countdown } = this.state
    const {
      containerStyle,
      title,
      titleStyle,
      subtitle,
      subtitleStyle,
      countdownTextStyle,
      buttonsContainerStyle,
      cancelButtonConfigs,
      confirmButtonConfigs,
    } = this.props

    return (
      <View style={[styles.modalContainer, containerStyle]}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, titleStyle]} accessible={true}>
            {title}
          </Text>
          <Text
            style={[styles.countdown, countdownTextStyle]}
            accessible={true}
          >
            {formatCountdown(countdown)}
          </Text>
          <Text style={[styles.subtitle, subtitleStyle]} accessible={true}>
            {subtitle}
          </Text>
        </View>
        <View style={[styles.btnRow, buttonsContainerStyle]}>
          <TouchableOpacity
            onPress={this.handleYesBtnPress}
            style={[styles.modalBtn, cancelButtonConfigs.buttonStyle]}
          >
            <View style={cancelButtonConfigs.buttonViewStyle}>
              <Text
                style={[styles.modalBtnText, cancelButtonConfigs.textStyle]}
              >
                {cancelButtonConfigs.text}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleNoBtnPress}
            style={[styles.modalBtn, confirmButtonConfigs.buttonStyle]}
          >
            <View style={confirmButtonConfigs.buttonViewStyle}>
              <Text
                style={[styles.modalBtnText, confirmButtonConfigs.textStyle]}
              >
                {confirmButtonConfigs.text}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
