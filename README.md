# React Native Session Timer Modal

A customizable session timer modal that times even when the app is on the background (not really, it uses timestamp to work around the iOS background limitation). It won't work with Expo since it makes use of [react-native-background-timer](https://github.com/ocetnik/react-native-background-timer) which requires native library linking.

## Demo

**note:** This demo has a backgroundTime of 0.07 minutes and a modalTime of 10 minutes.

![GIF DEMO](https://i.imgur.com/eCsuJDz.gif)

## Getting started

`yarn add react-native-session-timer-modal`

### Automatic Linking

`react-native link react-native-background-timer`

**note:** This is linking the dependent library `react-native-background-timer` instead of this library.

### Manual Linking

Follow [this readme](https://github.com/ocetnik/react-native-background-timer/blob/master/README.md) to manually link the `react-native-background-timer` library.

## Usage

1. Wrap your app with `<SessionTimerModal />` in App.js (or wherever the root of your project is), and configure the props, make sure you checkout the props table below to custimze the appearance!

   ```javascript
   ...
   import SessionTimerModal, { startSessionTimer, stopSessionTimer } from 'react-native-session-timer-modal';

   ...
   render() {
     ...
     return (
       <SessionTimerModal
         backgroundTime={9}
         modalTime={1}
         containerStyle={styles.container}
         title="Session Timer"
         titleStyle={styles.title}
         subtitle="Your session will be ending soon! Wanna stay in the app?"
         subtitleStyle={styles.subtitle}
         confirmButtonConfigs={{
           text: 'Oh yea'
         }}
         cancelButtonConfigs={{
           text: 'Log me out',
           textStyle: styles.cancelText
         }}
         onTimerEnd={() => Alert.alert('Timer End')}
       >
         <App />
       </SessionTimerModal>
     )
   }
   ...
   ```

2. Call `startSessionTimer()` when your app finished logging the user in and when the refresh token call finised.

3. Call `stopSessionTimer()` when the user logs out.

## Props Definitions

### `<SessionTimerModal />`

| Prop                  | Explanation                                                                                                                                                                            | Type                                                  | Default    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------- |
| backgroundTime        | The number of **minutes** that the modal will be counting on the background, specifically it is the time period between `startSessionTimer` is called and the counting modal shows up. | number                                                | 9          |
| modalTime             | The number of **minutes** that the modal will be counting after the modal shows up.                                                                                                    | number                                                | 1          |
| title                 | Title of the modal.                                                                                                                                                                    | string                                                | ''         |
| subtitle              | Subtitle of the modal.                                                                                                                                                                 | string                                                | ''         |
| containerStyle        | The styles for the modal card.                                                                                                                                                         | ViewStyle                                             | null       |
| titleStyle            | The styles for the title.                                                                                                                                                              | TextStyle                                             | null       |
| subtitleStyle         | The styles for the subtitle.                                                                                                                                                           | TextStyle                                             | null       |
| countdownTextStyle    | The styles for the countdown number.                                                                                                                                                   | TextStyle                                             | null       |
| buttonsContainerStyle | The styles for the the buttons row container.                                                                                                                                          | ViewStyle                                             | null       |
| modalConfigs          | Props for the [react-native-modal](https://github.com/react-native-community/react-native-modal#available-props), pass them down as an object.                                         | ModalProps                                            | {}         |
| cancelButtonConfigs   | The configurations for cancel button, the left one.                                                                                                                                    | IButtonConfigs (see below for the definition of this) | {}         |
| confirmButtonConfigs  | The configurations for confirm button, the right one.                                                                                                                                  | IButtonConfigs (see below for the definition of this) | {}         |
| onTimerEnd            | The callback function called when the modal counts to 0 seconds.                                                                                                                       | function                                              | () => null |

### `IButtonConfigs`

| Prop            | Explanation                                                                                                                                                  | Type      | Default    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---------- |
| buttonStyle     | The styles for the `TouchableOpacity` button.                                                                                                                | ViewStyle | null       |
| buttonViewStyle | The styles for the single `View` within `TouchableOpacity` button.                                                                                           | ViewStyle | null       |
| textStyle       | The styles for the button text.                                                                                                                              | TextStyle | null       |
| text            | Text of the button.                                                                                                                                          | string    | ''         |
| onPress         | Callback when the user taps the button, best place to call your refresh token or log out function depending on how you setup your cancel and confirm button. | function  | () => null |
