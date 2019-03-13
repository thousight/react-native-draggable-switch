"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_background_timer_1 = __importDefault(require("react-native-background-timer"));
var moment_1 = __importDefault(require("moment"));
var backgroundDuration = moment_1.default.duration(27, 'minutes').asMilliseconds();
var modalDuration = moment_1.default.duration(3, 'minutes').asMilliseconds();
var defaultCallback = null;
var currentCallback = null;
var timerEndCallback = null;
var backgroundTimerEndTime = 0;
var hideModal = null;
var timeout;
var authenticated = false;
exports.init = function (props) {
    backgroundDuration = moment_1.default
        .duration(props.backgroundTime, 'minutes')
        .asMilliseconds();
    modalDuration = moment_1.default
        .duration(props.modalTime, 'minutes')
        .asMilliseconds();
    defaultCallback = props.defaultCallback;
    hideModal = props.hideModal;
    timerEndCallback = props.timerEndCallback;
};
exports.getCurrentTimeStamp = function () { return new Date().getTime(); };
exports.getBackgroundTimerEndTime = function () { return backgroundTimerEndTime; };
exports.startSessionTimer = function (cb, interval) {
    var duration = interval || backgroundDuration;
    if (!cb) {
        backgroundTimerEndTime = exports.getCurrentTimeStamp() + duration;
        currentCallback = defaultCallback;
    }
    else {
        currentCallback = cb;
    }
    if (!currentCallback) {
        return;
    }
    // Reset before start
    exports.stopSessionTimer();
    react_native_background_timer_1.default.start();
    timeout = react_native_background_timer_1.default.setInterval(currentCallback, duration);
    authenticated = true;
};
exports.stopSessionTimer = function (unauthenticated) {
    if (unauthenticated === void 0) { unauthenticated = false; }
    react_native_background_timer_1.default.clearInterval(timeout);
    react_native_background_timer_1.default.stop();
    if (unauthenticated) {
        authenticated = false;
    }
};
function handleAppStateChangeForBackgroundTimer(nextAppState) {
    if (authenticated) {
        if (nextAppState === 'active') {
            // only handle background timer
            if (currentCallback === defaultCallback && backgroundTimerEndTime) {
                var currentTime = exports.getCurrentTimeStamp();
                if (backgroundTimerEndTime > currentTime) {
                    exports.startSessionTimer(currentCallback, backgroundTimerEndTime - currentTime);
                }
                else if (modalDuration + backgroundTimerEndTime - currentTime <= 0 && timerEndCallback) {
                    timerEndCallback();
                }
                else {
                    currentCallback();
                }
            }
        }
        else {
            exports.stopSessionTimer();
        }
    }
    else {
        hideModal();
    }
}
exports.handleAppStateChangeForBackgroundTimer = handleAppStateChangeForBackgroundTimer;
