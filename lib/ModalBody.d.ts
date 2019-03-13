import { Component } from 'react';
import moment, { Duration } from 'moment';
import { ITimingModalProps } from './SessionTimerModal';
interface IModalBodyProps extends ITimingModalProps {
    hideModal(): void;
}
interface IModalBodyStates {
    countdown: Duration;
}
export declare class ModalBody extends Component<IModalBodyProps, IModalBodyStates> {
    state: {
        countdown: moment.Duration;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleAppStateChangeForCountdown: (nextAppState: string) => void;
    initializeSessionCountdown: (duration: number) => moment.Duration;
    startCountdown: () => void;
    handleCountDown: () => void;
    handleSessionTimeout: () => void;
    handleYesBtnPress: () => void;
    resetCountdown: () => void;
    render(): JSX.Element;
}
export {};
