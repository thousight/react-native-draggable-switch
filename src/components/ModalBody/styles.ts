import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  btnRow: {
    borderTopColor: '#CCCCCC',
    borderTopWidth: 0.5,
    flexDirection: 'row',
  },
  countdown: {
    fontSize: 30,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 12,
    textAlign: 'center',
  },
  modalBtn: {
    alignItems: 'center',
    ...Platform.select({
      android: {
        borderTopColor: '#CCCCCC',
        borderTopWidth: 0.5,
      },
    }),
    width: '50%',
  },
  modalBtnText: {
    color: 'blue',
    paddingVertical: 10,
  },
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 25,
    maxWidth: 250,
  },
  noBtn: {
    ...Platform.select({
      android: {
        borderRightWidth: 1,
      },
      ios: {
        borderRightWidth: 0.5,
      },
    }),
    borderRightColor: '#CCCCCC',
  },

  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    marginBottom: 3,
    textAlign: 'center',
  },
})
