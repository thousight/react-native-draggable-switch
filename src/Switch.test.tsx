import React from 'react'
import { GestureResponderHandlers, GestureResponderEvent } from 'react-native'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Switch from './Switch'

configure({
  adapter: new Adapter(),
})

jest.useFakeTimers()

const fakeGestureEvent: GestureResponderEvent = {
  nativeEvent: {
    changedTouches: [
      {
        identifier: '2333',
        changedTouches: [],
        locationX: 23,
        locationY: 23,
        pageX: 0,
        pageY: 0,
        target: '123',
        timestamp: 23333,
        touches: [],
      },
    ],
    identifier: '1',
    locationX: 23,
    locationY: 23,
    pageX: 0,
    pageY: 0,
    target: '123',
    timestamp: 233333,
    touches: [
      {
        identifier: '2333',
        changedTouches: [],
        locationX: 23,
        locationY: 23,
        pageX: 0,
        pageY: 0,
        target: '123',
        timestamp: 2333333,
        touches: [],
      },
    ],
  },
  currentTarget: 2333,
  target: 2333,
  timeStamp: 23333333,
  type: 'fake',
  eventPhase: 23333,
  bubbles: false,
  cancelable: false,
  isTrusted: false,
  defaultPrevented: false,
  isDefaultPrevented: () => false,
  preventDefault: () => null,
  isPropagationStopped: () => false,
  stopPropagation: () => null,
  persist: () => null,
}

describe('Switch', () => {
  describe('required props only', () => {
    const props = {
      width: 50,
      height: 30,
      value: false,
      onValueChange: jest.fn(),
    }
    const rendered = shallow(<Switch {...props} />)
    const instance = rendered.instance() as Switch

    it('smoke test', () => {
      expect(rendered).toBeDefined()
    })

    it('changes with value prop change', () => {
      rendered.setProps({ value: true })
      jest.runAllTimers()
      expect(
        rendered
          .find('AnimatedComponent')
          .last()
          .props().style[2].transform[0].translateX._parent._value,
      ).toEqual(props.width - props.height)

      rendered.setProps({ value: false })
      jest.runAllTimers()
      expect(
        rendered
          .find('AnimatedComponent')
          .last()
          .props().style[2].transform[0].translateX._parent._value,
      ).toEqual(-1 * (props.width - props.height))

      rendered.setProps({ value: false })
      jest.runAllTimers()
      expect(
        rendered
          .find('AnimatedComponent')
          .last()
          .props().style[2].transform[0].translateX._parent._value,
      ).toEqual(-1 * (props.width - props.height))
    })

    it('can be tapped without crash', () => {
      const circleProps = rendered
        .find('AnimatedComponent')
        .last()
        .props() as GestureResponderHandlers
      expect(circleProps).toHaveProperty('onStartShouldSetResponder')
      expect(circleProps).toHaveProperty('onResponderGrant')
      expect(circleProps).toHaveProperty('onResponderMove')
      expect(circleProps).toHaveProperty('onResponderRelease')
      circleProps.onStartShouldSetResponder(fakeGestureEvent)
      // TODO: mock the data right, if possible, to get the 2 below working
      // circleProps.onResponderGrant(fakeGestureEvent)
      // circleProps.onResponderMove(fakeGestureEvent)
      instance.onCircleTapIn()
      instance.circleAnimations.direction.setValue(0)
      circleProps.onResponderRelease(fakeGestureEvent)
    })

    it('can tap on the background without crash', () => {
      rendered
        .find('TouchableWithoutFeedback')
        .first()
        .simulate('press')
    })

    it('can be dragged without crash', () => {
      const circleProps = rendered
        .find('AnimatedComponent')
        .last()
        .props() as GestureResponderHandlers
      circleProps.onStartShouldSetResponder(fakeGestureEvent)
      // TODO: mock the data right, if possible, to get the 2 below working
      // circleProps.onResponderGrant(fakeGestureEvent)
      // circleProps.onResponderMove(fakeGestureEvent)

      // Mimic drag right
      instance.onCircleTapIn()
      instance.circleAnimations.direction.setValue(20)
      circleProps.onResponderRelease(fakeGestureEvent)

      // Mimic drag left
      instance.onCircleTapIn()
      instance.circleAnimations.direction.setValue(-20)
      circleProps.onResponderRelease(fakeGestureEvent)

      // Mimic drag to middle toward left
      instance.onCircleTapIn()
      instance.circleAnimations.direction.setValue(16)
      circleProps.onResponderRelease(fakeGestureEvent)
    })
  })

  describe('disabled handling', () => {
    const props = {
      width: 50,
      height: 30,
      value: true,
      onValueChange: jest.fn(),
      disabled: true,
      circleStyle: {
        margin: 5,
      },
    }
    const rendered = shallow(<Switch {...props} />)

    it('smoke test', () => {
      expect(rendered).toBeDefined()
    })

    it('changes is able to disabled status', () => {
      rendered.setProps({
        disabled: false,
        value: true,
      })
      expect(rendered).toBeDefined()
    })
  })
})
