import { TextStyle, ViewStyle } from 'react-native'

export interface ISessionTimerModalProps {
  backgroundTime?: number
  modalTime?: number
  containerStyle?: ViewStyle
  title?: string
  titleStyle?: TextStyle
  subtitle?: string
  subtitleStyle?: TextStyle
  countdownTextStyle?: TextStyle
  confirmText?: string
  cancelText?: string
  buttonTextStyle?: TextStyle
  onModalConfirmPress?(): any
  onModalCancelPress?(): any
  onTimerEnd?(): any
}

export const defaultProps = {
  backgroundTime: 9,
  modalTime: 1,
  containerStyle: null,
  title: '',
  titleStyle: null,
  subtitle: '',
  subtitleStyle: null,
  countdownTextStyle: null,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  buttonTextStyle: null,
  onModalConfirmPress: () => null,
  onModalCancelPress: () => null,
  onTimerEnd: () => null,
}

export interface ISessionTimerModalStates {
  isShowModal: boolean
}

export interface ITimeUtilsInitProps extends ISessionTimerModalProps {
  defaultCallback(): any
  hideModal(): any
}
