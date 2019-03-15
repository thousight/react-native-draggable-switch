import { Duration } from 'moment'
import { ISessionTimerModalProps } from '../SessionTimerModal/types'

export interface IModalBodyProps extends ISessionTimerModalProps {
  hideModal(): void
}

export interface IModalBodyStates {
  countdown: Duration
}
