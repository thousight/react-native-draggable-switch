import { ISessionTimerModalProps } from './SessionTimerModal';
/**
 * This timer is currently used for user session timeouts.
 * Please be careful to use this for other purposes
 * because the library only allows one background process to
 * run at once so you could potentially kill the user session
 * timeout event.
 */
interface ITimeUtilsInitPops extends ISessionTimerModalProps {
    defaultCallback(): any;
    hideModal(): any;
}
export declare const init: (props: ITimeUtilsInitPops) => void;
export declare const getCurrentTimeStamp: () => number;
export declare const getBackgroundTimerEndTime: () => number;
export declare const startSessionTimer: (cb: any, interval: number) => void;
export declare const stopSessionTimer: (unauthenticated?: boolean) => void;
export declare function handleAppStateChangeForBackgroundTimer(nextAppState: string): void;
export {};
