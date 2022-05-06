'use strict';

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

var _reactRouter = require('react-router');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Market = function (_React$Component) {
    (0, _inherits3.default)(Market, _React$Component);

    function Market() {
        (0, _classCallCheck3.default)(this, Market);
        return (0, _possibleConstructorReturn3.default)(this, (Market.__proto__ || (0, _getPrototypeOf2.default)(Market)).apply(this, arguments));
    }

    (0, _createClass3.default)(Market, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'column' },
                    (0, _counterpart2.default)('g.external_link_message'),
                    ': ',
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: $STM_Config.wallet_url + '/market' },
                        (0, _counterpart2.default)('navigation.currency_market')
                    )
                )
            );
        }
    }]);
    return Market;
}(_react2.default.Component);

module.exports = {
    path: 'market',
    component: Market
};