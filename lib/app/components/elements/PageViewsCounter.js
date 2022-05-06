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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ServerApiClient = require('app/utils/ServerApiClient');

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageViewsCounter = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(PageViewsCounter, _React$Component);

    function PageViewsCounter(props) {
        (0, _classCallCheck3.default)(this, PageViewsCounter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PageViewsCounter.__proto__ || (0, _getPrototypeOf2.default)(PageViewsCounter)).call(this, props));

        _this.last_page = null;
        return _this;
    }

    (0, _createClass3.default)(PageViewsCounter, [{
        key: 'pageView',
        value: function pageView() {
            var ref = document.referrer || '';
            (0, _ServerApiClient.recordPageView)(window.location.pathname, ref);
            this.last_page = window.location.pathname;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.pageView();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return window.location.pathname !== this.last_page;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.pageView();
        }
    }, {
        key: 'render',
        value: function render() {
            // Due to a MySQL mystery, no more page view reads; only writes.
            return null;
        }
    }]);
    return PageViewsCounter;
}(_react2.default.Component), _class.propTypes = {
    hidden: _propTypes2.default.bool
}, _class.defaultProps = {
    hidden: true
}, _temp);
exports.default = PageViewsCounter;