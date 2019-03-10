import React, { Component } from 'react'
import { AppState, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

import ModalBody from './ModalBody'

import { init, handleAppStateChangeForBackgroundTimer } from './timerUtils'

export default class TimingModal extends Component {
  state = {
    isShowModal: false,
  }

  componentDidMount() {
    init({
      ...this.props,
      defaultCallback: this.toggleSessionTimerModal,
      hideModal: this.hideModal,
    })
    AppState.addEventListener('change', handleAppStateChangeForBackgroundTimer)
  }

  componentWillUnmount() {
    AppState.removeEventListener(
      'change',
      handleAppStateChangeForBackgroundTimer,
    )
  }

  hideModal = () => this.setState({ isShowModal: false })

  toggleSessionTimerModal = () =>
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }))

  render() {
    const { isShowModal } = this.state
    const { children } = this.props

    return (
      <View style={styles.container} pointerEvents="box-none">
        {children}

        <Modal
          isVisible={isShowModal}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
        >
          <ModalBody {...this.props} hideModal={this.hideModal} />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
