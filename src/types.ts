import { ViewStyle, ViewProps } from 'react-native'

export interface ISwitchProps extends ViewProps {
  containerStyle?: ViewStyle
  circleStyle?: ViewStyle
  backgroundColor?: string
  circleColor?: string
  activeColor?: string
  disabledColor?: string
  width: number
  height: number
  value: boolean
  disabled?: boolean
  onValueChange(value: boolean): any
}

export const defaultProps = {
  backgroundColor: '#F6F7FA',
  circleColor: '#FFFFFF',
  activeColor: '#66D0B1',
  disabledColor: '#A1A1A1',
}
