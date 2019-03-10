
# react-native-session-timer-modal

## Getting started

`$ npm install react-native-session-timer-modal --save`

### Mostly automatic installation

`$ react-native link react-native-session-timer-modal`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-session-timer-modal` and add `RNSessionTimerModal.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSessionTimerModal.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNSessionTimerModalPackage;` to the imports at the top of the file
  - Add `new RNSessionTimerModalPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-session-timer-modal'
  	project(':react-native-session-timer-modal').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-session-timer-modal/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-session-timer-modal')
  	```


## Usage
```javascript
import RNSessionTimerModal from 'react-native-session-timer-modal';

// TODO: What to do with the module?
RNSessionTimerModal;
```
  