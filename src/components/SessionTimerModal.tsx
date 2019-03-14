import React, { Component } from 'react'
import { AppState, View, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'

import { ModalBody } from './ModalBody'

import { init, handleAppStateChangeForBackgroundTimer } from '../utils'

export interface ISessionTimerModalProps {
  backgroundTime?: number
  modalTime?: number
  containerStyle?: ViewStyle
  title?: string
  titleStyle?: TextStyle
  subtitle?: string
  subtitleStyle?: TextStyle
  countdownTextStyle?: TextStyle
  confirmText?: string
  cancelText?: string
  buttonTextStyle?: TextStyle
  onModalConfirmPress?(): any
  onModalCancelPress?(): any
  onTimerEnd?(): any
}

const defaultProps = {
  backgroundTime: 9,
  modalTime: 1,
  containerStyle: null,
  title: '',
  titleStyle: null,
  subtitle: '',
  subtitleStyle: null,
  countdownTextStyle: null,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  buttonTextStyle: null,
  onModalConfirmPress: () => null,
  onModalCancelPress: () => null,
  onTimerEnd: () => null,
}

interface ISessionTimerModalStates {
  isShowModal: boolean
}

export class SessionTimerModal extends Component<
  ISessionTimerModalProps,
  ISessionTimerModalStates
> {
  public static defaultProps = defaultProps

  public state = {
    isShowModal: false,
  }

  public componentDidMount() {
    init({
      ...this.props,
      defaultCallback: this.toggleSessionTimerModal,
      hideModal: this.hideModal,
    })
    AppState.addEventListener('change', handleAppStateChangeForBackgroundTimer)
  }

  public componentWillUnmount() {
    AppState.removeEventListener(
      'change',
      handleAppStateChangeForBackgroundTimer,
    )
  }

  public hideModal = () => this.setState({ isShowModal: false })

  public toggleSessionTimerModal = () =>
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }))

  public render() {
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
