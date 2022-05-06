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

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecoverAccountStep1 = function (_React$Component) {
    (0, _inherits3.default)(RecoverAccountStep1, _React$Component);

    function RecoverAccountStep1() {
        (0, _classCallCheck3.default)(this, RecoverAccountStep1);
        return (0, _possibleConstructorReturn3.default)(this, (RecoverAccountStep1.__proto__ || (0, _getPrototypeOf2.default)(RecoverAccountStep1)).apply(this, arguments));
    }

    (0, _createClass3.default)(RecoverAccountStep1, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'RestoreAccount' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-4' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            (0, _counterpart2.default)('navigation.stolen_account_recovery')
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('recoveraccountstep1_jsx.recover_account_intro', { APP_URL: _client_config.APP_DOMAIN, APP_NAME: _client_config.APP_NAME })
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('g.external_link_message'),
                            ': ',
                            _react2.default.createElement(
                                _reactRouter.Link,
                                {
                                    to: $STM_Config.wallet_url + '/recover_account_step_1'
                                },
                                (0, _counterpart2.default)('navigation.stolen_account_recovery')
                            )
                        )
                    )
                )
            );
        }
    }]);
    return RecoverAccountStep1;
}(_react2.default.Component);

module.exports = {
    path: 'recover_account_step_1',
    component: RecoverAccountStep1
};