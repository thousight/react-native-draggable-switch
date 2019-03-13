
# React Native Session Timer Modal
A customizable session timer modal that times on the background. It won't work with Expo since it makes use of [react-native-background-timer](https://github.com/ocetnik/react-native-background-timer) which requires native library linking.

## Getting started

`yarn add react-native-session-timer-modal react-native-background-timer moment react-native-modal`

### Automatic Linking

`react-native link react-native-background-timer`

### Manual Linking

Follow [this readme](https://github.com/ocetnik/react-native-background-timer/blob/master/README.md) to manually link the `react-native-background-timer` library.

## Usage

1. Wrap your app with `<SessionTimerModal />` in App.js (or whereever the root of your project is), and configure the props, make sure you put down all the required ones described in the section below.

	```javascript
	...
	import { SessionTimerModal, startSessionTimer, stopSessionTimer } from 'react-native-session-timer-modal';

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
			  subtitle="Your session will be ending soon!"
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
  2. Call `startSessionTimer()` when the user finished loggging in, and `stopSessionTimer()` when the user log out.

## Props

| Prop | Explanation | Type | Required |
| ------------- | ------------- | ----- | ----- |
| backgroundTime | The number of **minutes** that the modal will be counting on the background, it will be the time period between `startSessionTimer` called and the counting modal showing up. | number | true |
| modalTime | The number of **minutes** that the modal will be counting after it shows up. | number | true |
| title | Title of the modal. | string | false |
| subtitle | Subtitle of the modal. | string | false |
| confirmText | Text for the confirm button. | string | false |
| cancelText | Text for the cancel button. | string | false |
| onModalConfirmPress | The callback function called when confirm button is pressed, this is usually the place to call refresh user token. Make sure to call `startSessionTimer` at the end of the successful token refresh, since pressing any buttons on the modal will stop session timer. | function | false |
| onModalCancelPress | The callback function called when cancel button is pressed, this is usually the place to call user log out. | function | false |
| onTimerEnd | The callback function called when the modal counts to 0 if the user is in foreground, and when the user puts your app back to foreground from background after the time modal countdown is supposed to end. | function | false |
| containerStyle | The styles for the modal card. | ViewStyle | false |
| titleStyle | The styles for the title. | TextStyle | false |
| subtitleStyle | The styles for the subtitle. | TextStyle | false |
| countdownTextStyle | The styles for the countdown number. | TextStyle | false |
| buttonTextStyle | The styles for the cancel and confirm button texts. | TextStyle | false |
