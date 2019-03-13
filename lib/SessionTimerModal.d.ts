import { Component } from 'react';
export interface ITimingModalProps {
    backgroundTime: number;
    modalTime: number;
    modalTitle: string;
    modalSubtitle: string;
    modalNoText: string;
    modalYesText: string;
    timerEndCallback?(): any;
}
interface ITimingModalStates {
    isShowModal: boolean;
}
export declare class SessionTimerModal extends Component<ITimingModalProps, ITimingModalStates> {
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
