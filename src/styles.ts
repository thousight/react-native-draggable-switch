import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#EFEEF0',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  activeBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  circle: {
    margin: 3.5,
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    ...Platform.select({
      ios: {
        shadowColor: '#333333',
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {
        elevation: 2,
        marginTop: 3,
      },
    }),
  },
})
