'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _StateFunctions = require('app/utils/StateFunctions');

var _Tooltip = require('app/components/elements/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Translator = require('app/Translator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserWallet = function (_React$Component) {
    (0, _inherits3.default)(UserWallet, _React$Component);

    function UserWallet() {
        (0, _classCallCheck3.default)(this, UserWallet);
        return (0, _possibleConstructorReturn3.default)(this, (UserWallet.__proto__ || (0, _getPrototypeOf2.default)(UserWallet)).apply(this, arguments));
    }

    (0, _createClass3.default)(UserWallet, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                account = _props.account,
                gprops = _props.gprops,
                walletUrl = _props.walletUrl;

            // do not render if account is not loaded or available

            if (!account) return null;

            // do not render if state appears to contain only lite account info
            if (!account.has('vesting_shares')) return null;

            var vesting_steem = (0, _StateFunctions.vestingSteem)(account.toJS(), gprops);
            var delegated_steem = (0, _StateFunctions.delegatedSteem)(account.toJS(), gprops);

            var power_balance_str = (0, _StateFunctions.numberWithCommas)(vesting_steem.toFixed(3));
            var received_power_balance_str = (delegated_steem < 0 ? '+' : '') + (0, _StateFunctions.numberWithCommas)((-delegated_steem).toFixed(3));

            return _react2.default.createElement(
                'div',
                { className: 'UserWallet' },
                _react2.default.createElement(
                    'div',
                    { className: 'UserWallet__balance row zebra' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-8' },
                        'WORTH POWER',
                        ' ',
                        delegated_steem != 0 ? _react2.default.createElement(
                            'span',
                            { className: 'secondary' },
                            (0, _counterpart2.default)('tips_js.part_of_your_steem_power_is_currently_delegated', { user_name: account.get('name') })
                        ) : null
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-4' },
                        power_balance_str + ' WORTH',
                        delegated_steem != 0 ? _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _Tooltip2.default,
                                { t: 'WORTH POWER delegated to/from this account' },
                                '(',
                                received_power_balance_str,
                                ' WORTH)'
                            )
                        ) : null
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'wallet-link row zebra' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: walletUrl },
                            'Go to wallet'
                        )
                    )
                )
            );
        }
    }]);
    return UserWallet;
}(_react2.default.Component); /* eslint react/prop-types: 0 */


exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var gprops = state.global.get('props');
    var walletUrl = state.app.get('walletUrl');
    return (0, _extends3.default)({
        walletUrl: walletUrl
    }, ownProps, {
        gprops: state.global.get('props').toJS()
    });
})(UserWallet);