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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExternalLinkWarning = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(ExternalLinkWarning, _Component);

    function ExternalLinkWarning() {
        (0, _classCallCheck3.default)(this, ExternalLinkWarning);
        return (0, _possibleConstructorReturn3.default)(this, (ExternalLinkWarning.__proto__ || (0, _getPrototypeOf2.default)(ExternalLinkWarning)).apply(this, arguments));
    }

    (0, _createClass3.default)(ExternalLinkWarning, [{
        key: 'render',
        value: function render() {
            var url = this.props.url;
            return _react2.default.createElement(
                'span',
                { className: 'ExternalLinkWarning' },
                _react2.default.createElement(
                    'h4',
                    null,
                    (0, _counterpart2.default)('externallink_jsx.about_to_leave_steemit')
                ),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(
                    'p',
                    null,
                    (0, _counterpart2.default)('externallink_jsx.the_link_you_clicked_is_external'),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'b',
                        null,
                        url
                    )
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    (0, _counterpart2.default)('externallink_jsx.we_just_want_to_verify_to_continue')
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'a',
                        {
                            className: 'button hollow open-external-link',
                            href: url,
                            rel: 'nofollow noopener external'
                        },
                        (0, _counterpart2.default)('externallink_jsx.open_link')
                    )
                )
            );
        }
    }]);
    return ExternalLinkWarning;
}(_react.Component), _class.propTypes = {
    url: _propTypes2.default.string.isRequired
}, _temp);
exports.default = (0, _reactRedux.connect)()(ExternalLinkWarning);