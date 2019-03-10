import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  AppState,
  Text,
} from 'react-native'
import moment from 'moment'
import {
  startSessionTimer,
  stopSessionTimer,
  getBackgroundTimerEndTime,
  getCurrentTimeStamp,
} from './timerUtils'

const formatCountdown = (countdown) => {
  let result = ''

  if (countdown && moment.isDuration(countdown)) {
    let minutes = countdown.minutes()
    let seconds = countdown.seconds()

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

let defaultModalTimeDuration = null
let modalEndtime = null

export default class ModalBody extends Component {
  state = {
    countdown: moment.duration(this.props.modalDuration, 'minutes'),
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeForCountdown)
    defaultModalTimeDuration = moment.duration(
      this.props.modalDuration,
      'minutes',
    )
    modalEndtime = defaultModalTimeDuration.asMilliseconds() + getBackgroundTimerEndTime()
    console.log({
      defaultModalTimeDuration,
      modalEndtime
    });
    
    this.startCountdown()
  }

  componentWillUnmount() {
    AppState.removeEventListener(
      'change',
      this.handleAppStateChangeForCountdown,
    )
  }

  handleAppStateChangeForCountdown = nextAppState => {
    if (nextAppState === 'active') {
      this.startCountdown()
    }
  }

  initializeSessionCountdown = (duration) => {
    return duration
      ? moment.duration(duration, 'milliseconds')
      : defaultModalTimeDuration
  }

  startCountdown = () => {
    const duration = modalEndtime - getCurrentTimeStamp()
    console.log({
      modalEndtime,
      startCountdown: duration
    });
    
    if (duration > 0) {
      this.setState(
        { countdown: this.initializeSessionCountdown(duration) },
        () => {
          startSessionTimer(this.handleCountDown, 1000)
        },
      )
    } else {
      this.handleSessionTimeout()
    }
  }

  handleCountDown = () => this.setState(
      ({ countdown }) => ({ countdown: countdown.subtract(1, 's') }),
      () => {
        const { countdown } = this.state

        if (countdown.asMilliseconds() <= 0) {
          console.log('countdown.asMilliseconds() <= 0');
          console.log({ countdown: countdown.asMilliseconds() });

          this.handleSessionTimeout()
        }
      },
    )

  handleSessionTimeout = () => {
    console.log('handleSessionTimeout()');
    
    this.resetCountdown()
    this.props.hideModal()
    stopSessionTimer(true)
  }

  handleYesBtnPress = () => {
    stopSessionTimer()
    this.resetCountdown()
    this.props.hideModal()
    this.props.refreshIToken()
  }

  resetCountdown = () =>
    this.setState({
      countdown: this.initializeSessionCountdown(null),
    })

  render() {
    const { countdown } = this.state

    return (
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title} accessible={true}>
            Title
          </Text>
          <Text style={styles.countdown} accessible={true}>
            {formatCountdown(countdown)}
          </Text>
          <Text style={styles.desc} accessible={true}>
            Subheader
          </Text>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            onPress={this.handleSessionTimeout}
            style={[styles.modalBtn, styles.noBtn]}
          >
            <Text style={styles.modalBtnText}>NO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleYesBtnPress}
            style={styles.modalBtn}
          >
            <Text style={styles.modalBtnText}>YES</Text>
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
