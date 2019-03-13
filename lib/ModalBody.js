"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var moment_1 = __importDefault(require("moment"));
var timerUtils_1 = require("./timerUtils");
var formatCountdown = function (countdown) {
    var result = '';
    if (countdown && moment_1.default.isDuration(countdown)) {
        var minutes = countdown.minutes();
        var seconds = countdown.seconds();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        result = minutes + ":" + seconds;
    }
    return result;
};
var defaultModalTimeDuration;
var modalEndtime = 0;
var ModalBody = /** @class */ (function (_super) {
    __extends(ModalBody, _super);
    function ModalBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            countdown: moment_1.default.duration(_this.props.modalTime, 'minutes'),
        };
        _this.handleAppStateChangeForCountdown = function (nextAppState) {
            if (nextAppState === 'active') {
                _this.startCountdown();
            }
        };
        _this.initializeSessionCountdown = function (duration) {
            return duration >= 0
                ? moment_1.default.duration(duration, 'milliseconds')
                : defaultModalTimeDuration;
        };
        _this.startCountdown = function () {
            var duration = modalEndtime - timerUtils_1.getCurrentTimeStamp();
            if (duration > 0) {
                _this.setState({ countdown: _this.initializeSessionCountdown(duration) }, function () {
                    timerUtils_1.startSessionTimer(_this.handleCountDown, 1000);
                });
            }
            else {
                _this.handleSessionTimeout(true);
            }
        };
        _this.handleCountDown = function () { return _this.setState(function (_a) {
            var countdown = _a.countdown;
            return ({ countdown: countdown.subtract(1, 's') });
        }, function () {
            var countdown = _this.state.countdown;
            if (countdown.asMilliseconds() <= 0) {
                _this.handleSessionTimeout(true);
            }
        }); };
        _this.handleSessionTimeout = function (unauthenticated, manualPress) {
            _this.resetCountdown();
            _this.props.hideModal();
            timerUtils_1.stopSessionTimer(unauthenticated);
            if (_this.props.timerEndCallback && unauthenticated && !manualPress) {
                setTimeout(_this.props.timerEndCallback, 100);
            }
        };
        _this.handleYesBtnPress = function () {
            _this.handleSessionTimeout(false);
            if (_this.props.onModalYesPress) {
                setTimeout(_this.props.onModalYesPress, 100);
            }
        };
        _this.handleNoBtnPress = function () {
            _this.handleSessionTimeout(true, true);
            if (_this.props.onModalNoPress) {
                setTimeout(_this.props.onModalNoPress, 100);
            }
        };
        _this.resetCountdown = function () {
            return _this.setState({
                countdown: _this.initializeSessionCountdown(-1),
            });
        };
        return _this;
    }
    ModalBody.prototype.componentDidMount = function () {
        react_native_1.AppState.addEventListener('change', this.handleAppStateChangeForCountdown);
        defaultModalTimeDuration = moment_1.default.duration(this.props.modalTime, 'minutes');
        modalEndtime = defaultModalTimeDuration.asMilliseconds() + timerUtils_1.getBackgroundTimerEndTime();
        this.startCountdown();
    };
    ModalBody.prototype.componentWillUnmount = function () {
        react_native_1.AppState.removeEventListener('change', this.handleAppStateChangeForCountdown);
    };
    ModalBody.prototype.render = function () {
        var countdown = this.state.countdown;
        var _a = this.props, modalTitle = _a.modalTitle, modalSubtitle = _a.modalSubtitle, modalNoText = _a.modalNoText, modalYesText = _a.modalYesText;
        return (react_1.default.createElement(react_native_1.View, { style: styles.modalContainer },
            react_1.default.createElement(react_native_1.View, { style: styles.textContainer },
                react_1.default.createElement(react_native_1.Text, { style: styles.title, accessible: true }, modalTitle),
                react_1.default.createElement(react_native_1.Text, { style: styles.countdown, accessible: true }, formatCountdown(countdown)),
                react_1.default.createElement(react_native_1.Text, { style: styles.desc, accessible: true }, modalSubtitle)),
            react_1.default.createElement(react_native_1.View, { style: styles.btnRow },
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: this.handleNoBtnPress, style: [styles.modalBtn, styles.noBtn] },
                    react_1.default.createElement(react_native_1.Text, { style: styles.modalBtnText }, modalNoText)),
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: this.handleYesBtnPress, style: styles.modalBtn },
                    react_1.default.createElement(react_native_1.Text, { style: styles.modalBtnText }, modalYesText)))));
    };
    return ModalBody;
}(react_1.Component));
exports.ModalBody = ModalBody;
var styles = react_native_1.StyleSheet.create({
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
    modalBtn: __assign({ alignItems: 'center' }, react_native_1.Platform.select({
        android: {
            borderTopColor: '#CCCCCC',
            borderTopWidth: 0.5,
        },
    }), { width: '50%' }),
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
    noBtn: __assign({}, react_native_1.Platform.select({
        android: {
            borderRightWidth: 1,
        },
        ios: {
            borderRightWidth: 0.5,
        },
    }), { borderRightColor: '#CCCCCC' }),
    textContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        marginBottom: 3,
        textAlign: 'center',
    },
});
