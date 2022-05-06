'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CloseButton = require('app/components/elements/CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _reactRouter = require('react-router');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _constants = require('shared/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WelcomePanel = function (_React$Component) {
    (0, _inherits3.default)(WelcomePanel, _React$Component);

    function WelcomePanel(props) {
        (0, _classCallCheck3.default)(this, WelcomePanel);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WelcomePanel.__proto__ || (0, _getPrototypeOf2.default)(WelcomePanel)).call(this, props));

        _this.setShowBannerFalse = props.setShowBannerFalse;
        return _this;
    }

    (0, _createClass3.default)(WelcomePanel, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'welcomeWrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'welcomeBanner' },
                    _react2.default.createElement(_CloseButton2.default, { onClick: this.setShowBannerFalse }),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'text-center welcomeImage small-12 show-for-small-only' },
                            _react2.default.createElement('img', {
                                className: 'heroImage',
                                src: require('app/assets/images/welcome-wth.png')
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement('div', { className: 'large-1 show-for-large' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 medium-6 large-5 welcomePitch' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'fade-in--1' },
                                (0, _counterpart2.default)('navigation.intro_tagline')
                            ),
                            _react2.default.createElement(
                                'h4',
                                { className: 'fade-in--3' },
                                (0, _counterpart2.default)('navigation.intro_paragraph')
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row buttonWrapper' },
                                _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'button button--primary fade-in--5',
                                        href: _constants.SIGNUP_URL
                                    },
                                    ' ',
                                    _react2.default.createElement(
                                        'b',
                                        null,
                                        (0, _counterpart2.default)('navigation.sign_up')
                                    ),
                                    ' '
                                ),
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    {
                                        href: '/faq.html',
                                        className: 'button ghost fade-in--7'
                                    },
                                    _react2.default.createElement(
                                        'b',
                                        null,
                                        (0, _counterpart2.default)('navigation.learn_more')
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text-center welcomeImage medium-6 large-5 show-for-medium' },
                            _react2.default.createElement('img', {
                                className: 'heroImage',
                                src: require('app/assets/images/welcome-wth.png')
                            })
                        )
                    )
                )
            );
        }
    }]);
    return WelcomePanel;
}(_react2.default.Component);

exports.default = WelcomePanel;