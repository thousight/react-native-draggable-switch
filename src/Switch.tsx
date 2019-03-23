import React, { Component } from 'react'
import { View, Animated, Easing, Platform, PanResponder } from 'react-native'

import { ISwitchProps, defaultProps } from './types'
import styles from './styles'

const animationConfigs = (isPressed: boolean) => ({
  duration: 130,
  easing: Easing.inOut(Easing.linear),
  toValue: isPressed ? 1 : 0,
  useNativeDriver: true,
})

const springConfigs = (toValue: number) => ({
  toValue,
  overshootClamping: true,
  useNativeDriver: true,
})

export default class Switch extends Component<ISwitchProps> {
  static defaultProps = defaultProps

  panResponder = null

  boundary = this.props.width - this.props.height

  circleAnimations = {
    direction: new Animated.Value(-1 * this.boundary),
    prevDirection: -1 * this.boundary,
    size: new Animated.Value(0),
  }

  styleProps = {
    circleMargin: 0,
    maxCircleSize: 0,
  }

  debounce = null

  componentWillMount() {
    const { circleStyle = {}, height, value } = this.props
    this.styleProps.circleMargin = circleStyle.margin
      ? parseFloat(circleStyle.margin.toString())
      : styles.circle.margin
    this.styleProps.maxCircleSize =
      height - (this.styleProps.circleMargin * 2 + 1)

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.props.disabled,
      onPanResponderGrant: this.onCircleTapIn,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.circleAnimations.direction },
      ]),
      onPanResponderRelease: this.onCircleTapOut,
    })

    this.toggle(value)
  }

  shouldComponentUpdate(nextProps: ISwitchProps) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.disabled !== this.props.disabled
    )
  }

  componentDidUpdate(prevProps: ISwitchProps) {
    if (prevProps.value !== this.props.value) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => this.toggle(this.props.value), 150)
    }
  }

  onCircleTapIn = () =>
    Animated.timing(this.circleAnimations.size, animationConfigs(true)).start()

  onCircleTapOut = () => {
    // Hacky way to get the Animated.Value as a number in TS
    const direction = (this.circleAnimations.direction as any)._value

    // If Circle didn't move, meaning user simply tapped on it
    // without dragging, then treat it as onPress()
    if (
      Math.abs(direction) < 1 ||
      this.circleAnimations.prevDirection === direction
    ) {
      return this.toggle(!this.props.value)
    }

    const isGoingLeft =
      (direction < 0 ? this.boundary : 0) + direction < this.boundary / 2
    const toValue = (isGoingLeft ? -1 : 1) * this.boundary

    Animated.parallel([
      Animated.spring(this.circleAnimations.direction, springConfigs(toValue)),
      Animated.timing(this.circleAnimations.size, animationConfigs(false)),
    ]).start(this.onAnimationFinished(toValue, !isGoingLeft))
  }

  onAnimationFinished = (animationToValue: number, newValue: boolean) => () => {
    this.circleAnimations.direction.setValue(animationToValue)
    this.circleAnimations.prevDirection = animationToValue
    if (this.props.value !== newValue) {
      this.props.onValueChange(newValue)
    }
  }

  toggle = (newValue: boolean) => {
    const toValue = (newValue ? 1 : -1) * this.boundary
    return Animated.parallel([
      Animated.spring(this.circleAnimations.direction, springConfigs(toValue)),
      Animated.timing(this.circleAnimations.size, animationConfigs(false)),
    ]).start(this.onAnimationFinished(toValue, newValue))
  }

  render() {
    const {
      containerStyle,
      circleStyle = {},
      backgroundColor,
      circleColor,
      activeColor,
      disabledColor,
      width,
      height,
      value,
      disabled,
      ...viewProps
    } = this.props

    const circlePosition = this.circleAnimations.direction.interpolate({
      inputRange: value ? [-1 * this.boundary, 0] : [0, this.boundary],
      outputRange: [0, this.boundary],
      extrapolate: 'clamp',
    })

    return (
      <View
        {...viewProps}
        style={[
          styles.container,
          containerStyle,
          {
            backgroundColor: disabled ? disabledColor : backgroundColor,
            width,
            height,
            borderRadius: height,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.activeBackground,
            {
              backgroundColor: disabled ? disabledColor : activeColor,
              borderRadius: height,
              opacity: Animated.divide(
                circlePosition,
                this.boundary,
              ).interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />

        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            styles.circle,
            circleStyle,
            {
              backgroundColor: circleColor,
              maxWidth: this.styleProps.maxCircleSize,
              maxHeight: this.styleProps.maxCircleSize,
              opacity: disabled ? 0.9 : 1,
              transform: [
                { translateX: circlePosition },
                {
                  scale: this.circleAnimations.size.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      1,
                      (height - (this.styleProps.circleMargin * 2.5 + 1)) /
                        this.styleProps.maxCircleSize,
                    ],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    )
  }
}
