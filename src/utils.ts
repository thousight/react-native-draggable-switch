import BackgroundTimer from 'react-native-background-timer'
import moment from 'moment'

import { ISessionTimerModalProps } from './components/SessionTimerModal'

interface ITimeUtilsInitPops extends ISessionTimerModalProps {
  defaultCallback(): any
  hideModal(): any
}

let backgroundDuration: number = moment.duration(27, 'minutes').asMilliseconds()
let modalDuration: number = moment.duration(3, 'minutes').asMilliseconds()
let defaultCallback: any = null
let currentCallback: any = null
let onTimerEnd: any = null
let backgroundTimerEndTime: number = 0
let hideModal: any = null
let timeout: number
let authenticated: boolean = false

export const init = (props: ITimeUtilsInitPops) => {
  backgroundDuration = moment
    .duration(props.backgroundTime, 'minutes')
    .asMilliseconds()
  modalDuration = moment
    .duration(props.modalTime, 'minutes')
    .asMilliseconds()
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

  // Reset before start
  stopSessionTimer()
  BackgroundTimer.start()
  timeout = BackgroundTimer.setInterval(currentCallback, duration)
}

export const stopSessionTimer = (isStillAuthed: boolean = true) => {
  BackgroundTimer.clearInterval(timeout)
  BackgroundTimer.stop()

  authenticated = isStillAuthed
}

export function handleAppStateChangeForBackgroundTimer(nextAppState: string) {
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
        } else if (modalDuration + backgroundTimerEndTime - currentTime <= 0 && onTimerEnd) {
          onTimerEnd()
        } else {
          currentCallback()
        }
      }
    } else {
      stopSessionTimer(false)
    }
  } else {
    hideModal()
  }
}
