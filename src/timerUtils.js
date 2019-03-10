import BackgroundTimer from 'react-native-background-timer'
import moment from 'moment'

/**
 * This timer is currently used for user session timeouts.
 * Please be careful to use this for other purposes
 * because the library only allows one background process to
 * run at once so you could potentially kill the user session
 * timeout event.
 */

let backgroundDuration = moment.duration(27, 'minutes').asMilliseconds()
let modalDuration = moment.duration(3, 'minutes').asMilliseconds()
let defaultCallback = null
let currentCallback = null
let timerEndCallback = null
let backgroundTimerEndTime = null
let hideModal = null
let timeout = null
let authenticated = false

export const init = (props) => {
  console.log(props);
  
  backgroundDuration = moment
    .duration(props.backgroundTime, 'minutes')
    .asMilliseconds()
  modalDuration = moment
    .duration(props.modalDuration, 'minutes')
    .asMilliseconds()
  defaultCallback = props.defaultCallback
  hideModal = props.hideModal
  timerEndCallback = props.timerEndCallback
}

export const getCurrentTimeStamp = () => new Date().getTime()

export const getBackgroundTimerEndTime = () => backgroundTimerEndTime

export const startSessionTimer = (cb, interval) => {
  const duration = interval || backgroundDuration
  if (!cb) {
    backgroundTimerEndTime = getCurrentTimeStamp() + duration
    currentCallback = defaultCallback
  } else {
    currentCallback = cb
  }

  if (!currentCallback) {
    return
  }

  // Reset before start
  stopSessionTimer()
  console.log({ 'startSessionTimer()': duration });
  BackgroundTimer.start()
  timeout = BackgroundTimer.setInterval(currentCallback, duration)
  authenticated = true
}

export const stopSessionTimer = (unauthenticated = false) => {
  console.log('stopSessionTimer()');
  BackgroundTimer.clearInterval(timeout)
  BackgroundTimer.stop()

  if (unauthenticated) {
    authenticated = false
  }
}

export function handleAppStateChangeForBackgroundTimer(nextAppState) {
  if (authenticated) {
    if (nextAppState === 'active') {
      // only handle background timer
      if (currentCallback === defaultCallback && backgroundTimerEndTime) {
        const currentTime = getCurrentTimeStamp()
        if (backgroundTimerEndTime > currentTime) {
          startSessionTimer(
            currentCallback,
            backgroundTimerEndTime - currentTime,
          )
        } else if (modalDuration + backgroundTimerEndTime - currentTime <= 0) {
          timerEndCallback()
        } else {
          currentCallback()
        }
      }
    } else {
      stopSessionTimer()
    }
  } else {
    hideModal()
  }
}
