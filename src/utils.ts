import BackgroundTimer from 'react-native-background-timer'
import moment, { Duration } from 'moment'

import { ITimeUtilsInitProps } from './components/SessionTimerModal/types'

let backgroundDuration: number = moment.duration(27, 'minutes').asMilliseconds()
let modalDuration: number = moment.duration(3, 'minutes').asMilliseconds()
let defaultCallback: any = null
let currentCallback: any = null
let onTimerEnd: any = null
let backgroundTimerEndTime: number = 0
let hideModal: any = null
let timeout: number
let authenticated: boolean = false

export const init = (props: ITimeUtilsInitProps) => {
  backgroundDuration = moment
    .duration(props.backgroundTime, 'minutes')
    .asMilliseconds()
  modalDuration = moment.duration(props.modalTime, 'minutes').asMilliseconds()
  defaultCallback = props.defaultCallback
  hideModal = props.hideModal
  onTimerEnd = props.onTimerEnd
}

export const getCurrentTimeStamp = () => new Date().getTime()

export const getBackgroundTimerEndTime = () => backgroundTimerEndTime

export const startSessionTimer = (cb: any, interval: number) => {
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

  stopSessionTimer()
  BackgroundTimer.start()
  timeout = BackgroundTimer.setInterval(currentCallback, duration)
}

export const stopSessionTimer = (isStillAuthed: boolean = true) => {
  BackgroundTimer.clearInterval(timeout)
  BackgroundTimer.stop()

  authenticated = isStillAuthed
}

export const handleAppStateChangeForBackgroundTimer = (
  nextAppState: string,
) => {
  if (authenticated) {
    if (
      nextAppState === 'active' &&
      currentCallback === defaultCallback &&
      backgroundTimerEndTime
    ) {
      const currentTime = getCurrentTimeStamp()

      if (backgroundTimerEndTime > currentTime) {
        startSessionTimer(currentCallback, backgroundTimerEndTime - currentTime)
      } else if (
        modalDuration + backgroundTimerEndTime - currentTime <= 0 &&
        onTimerEnd
      ) {
        onTimerEnd()
      } else {
        currentCallback()
      }
    } else {
      stopSessionTimer()
    }
  } else {
    hideModal()
  }
}

export const formatCountdown = (countdown: Duration) => {
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
