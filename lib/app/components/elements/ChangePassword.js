'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChangePassword = function (_React$Component) {
    (0, _inherits3.default)(ChangePassword, _React$Component);

    function ChangePassword() {
        (0, _classCallCheck3.default)(this, ChangePassword);
        return (0, _possibleConstructorReturn3.default)(this, (ChangePassword.__proto__ || (0, _getPrototypeOf2.default)(ChangePassword)).apply(this, arguments));
    }

    (0, _createClass3.default)(ChangePassword, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                (0, _counterpart2.default)('g.external_link_message'),
                ': ',
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: $STM_Config.wallet_url + '/market' },
                    (0, _counterpart2.default)('navigation.currency_market')
                )
            );
        }
    }]);
    return ChangePassword;
}(_react2.default.Component); /* eslint react/prop-types: 0 */


exports.default = reduxForm()(ChangePassword);