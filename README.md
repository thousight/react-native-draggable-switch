
# React Native Session Timer Modal
A customizable session timer modal that times on the background. It won't work with Expo since it makes use of [react-native-background-timer](https://github.com/ocetnik/react-native-background-timer) which requires native library linking.

## Getting started

`yarn add react-native-session-timer-modal react-native-background-timer moment react-native-modal`

### Automatic Linking

`react-native link react-native-background-timer`

### Manual Linking

Follow [this readme](https://github.com/ocetnik/react-native-background-timer/blob/master/README.md) to manually link the `react-native-background-timer` library.

## Usage

1. Wrap your app with the `<SessionTimerModal />` in App.js (or whereever the root of your project is)

	```javascript
	...
	import { SessionTimerModal } from 'react-native-session-timer-modal';

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
			  cancelText="NO"
			  confirmText="YES"
			  buttonTextStyle={styles.buttonText}
			  onModalConfirmPress={() => Alert.alert('Yes Pressed')}
			  onModalCancelPress={() => Alert.alert('No Pressed')}
			  timerEndCallback={() => Alert.alert('Timer End')}
			>
			  <App />
			</SessionTimerModal>
		)
	}
	...
	```
  2. Call `startSessionTimer` when the user finished loggging in, and `stopSessionTimer` when the user log out.

## Props

| Prop | Explanation | Type | Required |
| ------------- | ------------- | ----- | ----- |
| backgroundTime | The number of **minutes** that the modal will be counting on the background | number | true |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

