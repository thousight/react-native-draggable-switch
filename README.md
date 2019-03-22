[![npm version](https://badge.fury.io/js/react-native-draggable-switch.svg)](https://badge.fury.io/js/react-native-draggable-switch)
[![Build Status](https://travis-ci.org/thousight/react-native-draggable-switch.svg?branch=master)](https://travis-ci.org/thousight/react-native-draggable-switch)
[![Greenkeeper Badge](https://badges.greenkeeper.io/thousight/react-native-draggable-switch.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/thousight/react-native-draggable-switch/badge.svg?branch=master)](https://coveralls.io/github/thousight/react-native-draggable-switch?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2d08b8ef83bd44bdbd8ce5fe94b94758)](https://app.codacy.com/app/thousight/react-native-draggable-switch?utm_source=github.com&utm_medium=referral&utm_content=thousight/react-native-draggable-switch&utm_campaign=Badge_Grade_Dashboard)

# React Native Draggable Switch

A stateless, JS-only, animated, draggable switch component that maintains itself at 60fps.

## Demo

![GIF DEMO](https://i.imgur.com/lcrZukf.gif)

## Getting started

`yarn add react-native-draggble-switch`

## Usage

```javascript
...
import Switch from 'react-native-draggable-switch';

...
render() {
  ...
  return (
    <Switch
     width={50}
     height={30}
     value={this.state.isSwitchOn}
     onValueChange={(isSwitchOn) => this.setState({ isSwitchOn })}
    />
  )
}
...
```

## Props Definitions

### `<Switch />`

| Prop            | Explanation                                                                                          | Type      | Default   | Required |
| --------------- | ---------------------------------------------------------------------------------------------------- | --------- | --------- | -------- |
| width           | The width of the switch                                                                              | number    |           | true     |
| height          | The height of the switch                                                                             | number    |           | true     |
| value           | The value of the switch, indicating if the switch is on or off                                       | boolean   |           | true     |
| onValueChange   | The callback function for when the value is changed in Switch, providing the updated value in params | function  |           | true     |
| disabled        | If user touch is disabled                                                                            | boolean   | false     | false    |
| containerStyle  | Style for Switch outer container                                                                     | ViewStyle | null      | false    |
| circleStyle     | Style for the dragging circle of the switch                                                          | ViewStyle | null      | false    |
| backgroundColor | Background color of the Switch when it is not on                                                     | string    | '#F6F7FA' | false    |
| circleColor     | Color of the dragging circle                                                                         | string    | '#FFFFFF' | false    |
| activeColor     | Background color of the Switch when it is on                                                         | string    | '#66D0B1' | false    |
| disabledColor   | Background color of the Switch when it is disabled                                                   | string    | '#A1A1A1' | false    |
