# React Native Session Timer Modal

A customizable session timer modal that times on the background. It won't work with Expo since it makes use of [react-native-background-timer](https://github.com/ocetnik/react-native-background-timer) which requires native library linking.

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
         countdownTextStyle={styles.countdown}
         confirmText="YES"
         cancelText="NO"
         buttonTextStyle={styles.buttonText}
         onModalConfirmPress={() => Alert.alert('Yes Pressed')}
         onModalCancelPress={() => Alert.alert('No Pressed')}
         onTimerEnd={() => Alert.alert('Timer End')}
       >
         <App />
       </SessionTimerModal>
     )
   }
   ...
   ```

2. Call `startSessionTimer()` when your app finished logging the user in, and `stopSessionTimer()` when the user logs out.

## Props

| Prop                | Explanation                                                                                                                                                                                                                                                                           | Type      | Default   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------- |
| backgroundTime      | The number of **minutes** that the modal will be counting on the background, specifically it is the time period between `startSessionTimer` is called and the counting modal shows up.                                                                                                | number    | 9         |
| modalTime           | The number of **minutes** that the modal will be counting after the modal shows up.                                                                                                                                                                                                   | number    | 1         |
| title               | Title of the modal.                                                                                                                                                                                                                                                                   | string    | ''        |
| subtitle            | Subtitle of the modal.                                                                                                                                                                                                                                                                | string    | ''        |
| confirmText         | Text for the confirm button.                                                                                                                                                                                                                                                          | string    | 'Confirm' |
| cancelText          | Text for the cancel button.                                                                                                                                                                                                                                                           | string    | 'Cancel'  |
| onModalConfirmPress | The callback function called when confirm button is pressed, this is usually the place to call refresh user token. Make sure to call `startSessionTimer` at the end of the successful token refresh, since pressing any buttons on the modal will stop the timer for better accuracy. | function  | () => {}  |
| onModalCancelPress  | The callback function called when cancel button is pressed, this is usually the place to call user log out.                                                                                                                                                                           | function  | () => {}  |
| onTimerEnd          | The callback function called when the modal counts to 0 seconds if the user is in foreground, and when the user puts your app back to foreground, from background, after the modal countdown is supposed to end.                                                                      | function  | () => {}  |
| containerStyle      | The styles for the modal card.                                                                                                                                                                                                                                                        | ViewStyle | null      |
| titleStyle          | The styles for the title.                                                                                                                                                                                                                                                             | TextStyle | null      |
| subtitleStyle       | The styles for the subtitle.                                                                                                                                                                                                                                                          | TextStyle | null      |
| countdownTextStyle  | The styles for the countdown number.                                                                                                                                                                                                                                                  | TextStyle | null      |
| buttonTextStyle     | The styles for the cancel and confirm button texts.                                                                                                                                                                                                                                   | TextStyle | null      |
