import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  AppState,
  Text,
} from 'react-native'
import moment, { Duration } from 'moment'

import {
  startSessionTimer,
  stopSessionTimer,
  getBackgroundTimerEndTime,
  getCurrentTimeStamp,
} from './timerUtils'
import { ISessionTimerModalProps } from './SessionTimerModal'

interface IModalBodyProps extends ISessionTimerModalProps {
  hideModal(): void
}

interface IModalBodyStates {
  countdown: Duration
}

const formatCountdown = (countdown: Duration) => {
  let result = ''

  if (countdown && moment.isDuration(countdown)) {
    let minutes: any = countdown.minutes()
    let seconds: any = countdown.seconds()

    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    result = `${minutes}:${seconds}`
  }

  return result
}

let defaultModalTimeDuration: Duration
let modalEndtime: number = 0

export class ModalBody extends Component<IModalBodyProps, IModalBodyStates> {
  state = {
    countdown: moment.duration(this.props.modalTime, 'minutes'),
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeForCountdown)
    defaultModalTimeDuration = moment.duration(
      this.props.modalTime,
      'minutes',
    )
    modalEndtime = defaultModalTimeDuration.asMilliseconds() + getBackgroundTimerEndTime()
    
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
        () => {
          startSessionTimer(this.handleCountDown, 1000)
        },
      )
    } else {
      this.handleSessionTimeout(true)
    }
  }

  handleCountDown = () => this.setState(
      ({ countdown }) => ({ countdown: countdown.subtract(1, 's') }),
      () => {
        const { countdown } = this.state

        if (countdown.asMilliseconds() <= 0) {
          this.handleSessionTimeout(true)
        }
      },
    )

  handleSessionTimeout = (unauthenticated: boolean, manualPress?: boolean) => {
    this.resetCountdown()
    this.props.hideModal()
    stopSessionTimer(unauthenticated)
    if (this.props.timerEndCallback && unauthenticated && !manualPress) {
      this.props.timerEndCallback()
    }
  }

  handleYesBtnPress = () => {
    this.handleSessionTimeout(false)
    if (this.props.onModalYesPress) {
      this.props.onModalYesPress()
    }
  }

  handleNoBtnPress = () => {
    this.handleSessionTimeout(true, true)
    if (this.props.onModalNoPress) {
      this.props.onModalNoPress()
    }
  }

  resetCountdown = () =>
    this.setState({
      countdown: this.initializeSessionCountdown(-1),
    })

  render() {
    const { countdown } = this.state
    const {
      modalTitle,
      modalSubtitle,
      modalNoText,
      modalYesText,
    } = this.props

    return (
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title} accessible={true}>
            {modalTitle}
          </Text>
          <Text style={styles.countdown} accessible={true}>
            {formatCountdown(countdown)}
          </Text>
          <Text style={styles.desc} accessible={true}>
            {modalSubtitle}
          </Text>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            onPress={this.handleNoBtnPress}
            style={[styles.modalBtn, styles.noBtn]}
          >
            <Text style={styles.modalBtnText}>{modalNoText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleYesBtnPress}
            style={styles.modalBtn}
          >
            <Text style={styles.modalBtnText}>{modalYesText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnRow: {
    borderTopColor: '#CCCCCC',
    borderTopWidth: 0.5,
    flexDirection: 'row',
  },
  countdown: {
    fontSize: 30,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 12,
    textAlign: 'center',
  },
  modalBtn: {
    alignItems: 'center',
    ...Platform.select({
      android: {
        borderTopColor: '#CCCCCC',
        borderTopWidth: 0.5,
      },
    }),
    width: '50%',
  },
  modalBtnText: {
    color: 'blue',
    paddingVertical: 10,
  },
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 25,
    maxWidth: 250,
  },
  noBtn: {
    ...Platform.select({
      android: {
        borderRightWidth: 1,
      },
      ios: {
        borderRightWidth: 0.5,
      },
    }),
    borderRightColor: '#CCCCCC',
  },

  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    marginBottom: 3,
    textAlign: 'center',
  },
})
