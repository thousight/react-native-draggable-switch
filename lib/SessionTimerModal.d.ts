import { Component } from 'react';
import { TextStyle } from 'react-native';
export interface ISessionTimerModalProps {
    backgroundTime: number;
    modalTime: number;
    modalTitle: string;
    modalTitleStyle: TextStyle;
    modalSubtitle: string;
    modalSubtitleStyle: TextStyle;
    modalYesText: string;
    modalNoText: string;
    buttonTextStyle: TextStyle;
    onModalYesPress?(): any;
    onModalNoPress?(): any;
    timerEndCallback?(): any;
}
interface ITimingModalStates {
    isShowModal: boolean;
}
export declare class SessionTimerModal extends Component<ISessionTimerModalProps, ITimingModalStates> {
    state: {
        isShowModal: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    hideModal: () => void;
    toggleSessionTimerModal: () => void;
    render(): JSX.Element;
}
export {};
