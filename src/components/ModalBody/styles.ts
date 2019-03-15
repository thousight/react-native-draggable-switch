import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    marginHorizontal: 25,
    maxWidth: 300,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    marginBottom: 3,
    textAlign: 'center',
  },
  countdown: {
    fontSize: 30,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
  },
  modalBtn: {
    alignItems: 'center',
    width: '50%',
  },
  modalBtnText: {
    color: '#007AFF',
    paddingVertical: 10,
  },
})
