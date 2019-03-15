import React, { Component } from 'react'
import { AppState, View } from 'react-native'
import Modal from 'react-native-modal'

import ModalBody from '../ModalBody'

import { init, handleAppStateChangeForBackgroundTimer } from '../../utils'

import {
  ISessionTimerModalProps,
  defaultProps,
  ISessionTimerModalStates,
} from './types'
import styles from './styles'

export default class SessionTimerModal extends Component<
  ISessionTimerModalProps,
  ISessionTimerModalStates
> {
  static defaultProps = defaultProps

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
    const { children, modalConfigs } = this.props

    return (
      <View style={styles.container} pointerEvents="box-none">
        {children}

        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          {...modalConfigs}
          isVisible={isShowModal}
        >
          <ModalBody {...this.props} hideModal={this.hideModal} />
        </Modal>
      </View>
    )
  }
}
