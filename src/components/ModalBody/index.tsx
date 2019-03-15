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

export default class ModalBody extends Component<
  IModalBodyProps,
  IModalBodyStates
> {
  state = {
    countdown: moment.duration(this.props.modalTime, 'minutes'),
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeForCountdown)
    defaultModalTimeDuration = moment.duration(this.props.modalTime, 'minutes')
    modalEndtime =
      defaultModalTimeDuration.asMilliseconds() + getBackgroundTimerEndTime()

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
      setTimeout(this.props.onTimerEnd, 310)
    }
  }

  handleYesBtnPress = () => {
    this.handleSessionTimeout(true, true)
    if (this.props.onModalConfirmPress) {
      setTimeout(this.props.onModalConfirmPress, 310)
    }
  }

  handleNoBtnPress = () => {
    this.handleSessionTimeout(false, true)
    if (this.props.onModalCancelPress) {
      setTimeout(this.props.onModalCancelPress, 310)
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
      cancelText,
      confirmText,
      buttonTextStyle,
    } = this.props

    return (
      <View style={[styles.modalContainer, containerStyle]}>
        <View style={[styles.textContainer, titleStyle]}>
          <Text style={styles.title} accessible={true}>
            {title}
          </Text>
          <Text
            style={[styles.countdown, countdownTextStyle]}
            accessible={true}
          >
            {formatCountdown(countdown)}
          </Text>
          <Text style={[styles.desc, subtitleStyle]} accessible={true}>
            {subtitle}
          </Text>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            onPress={this.handleNoBtnPress}
            style={[styles.modalBtn, styles.noBtn]}
          >
            <Text style={[styles.modalBtnText, buttonTextStyle]}>
              {cancelText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleYesBtnPress}
            style={styles.modalBtn}
          >
            <Text style={[styles.modalBtnText, buttonTextStyle]}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
