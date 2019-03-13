
# React Native Session Timer Modal
A customizable session timer modal that times on the background. It won't work with Expo since makes use of [react-native-background-timer](https://github.com/ocetnik/react-native-background-timer) which requires native library linking.

## Getting started

`yarn add react-native-session-timer-modal react-native-background-timer`

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
        timerEndCallback={() => Alert.alert('Timer End', 'timer end')}
        modalTitle="Session Timer"
        modalSubtitle="Your session will be ending soon!"
        modalNoText="NO"
        modalYesText="YES"
			>
				<App />
			</SessionTimerModal>
		)
	}
	...
	```
  2. Call `startSessionTimer` when the user finished loggging in, and `stopSessionTimer` when the user log out.
