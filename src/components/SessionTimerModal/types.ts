import { TextStyle, ViewStyle } from 'react-native'
import { ModalProps } from 'react-native-modal'

export interface ISessionTimerModalProps {
  backgroundTime?: number
  modalTime?: number
  containerStyle?: ViewStyle
  title?: string
  titleStyle?: TextStyle
  subtitle?: string
  subtitleStyle?: TextStyle
  countdownTextStyle?: TextStyle
  buttonsContainerStyle?: ViewStyle
  modalConfigs?: ModalProps
  confirmButtonConfigs: IButtonConfigs
  cancelButtonConfigs: IButtonConfigs
  onTimerEnd?(): any
}

export const defaultProps = {
  backgroundTime: 9,
  modalTime: 1,
  title: '',
  subtitle: '',
  modalConfigs: {},
  confirmButtonConfigs: {},
  cancelButtonConfigs: {},
  onTimerEnd: () => null,
}

export interface IButtonConfigs {
  buttonStyle?: ViewStyle
  buttonViewStyle?: ViewStyle
  textStyle?: TextStyle
  text?: string
  onPress?(): any
}

export interface ISessionTimerModalStates {
  isShowModal: boolean
}

export interface ITimeUtilsInitProps extends ISessionTimerModalProps {
  defaultCallback(): any
  hideModal(): any
}
