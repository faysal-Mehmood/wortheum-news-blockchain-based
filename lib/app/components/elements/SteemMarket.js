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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactSparklines = require('react-sparklines');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Coin = function (_Component) {
    (0, _inherits3.default)(Coin, _Component);

    function Coin(props) {
        (0, _classCallCheck3.default)(this, Coin);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Coin.__proto__ || (0, _getPrototypeOf2.default)(Coin)).call(this, props));

        _this.onPointMouseMove = _this.onPointMouseMove.bind(_this);
        _this.onPointMouseOut = _this.onPointMouseOut.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Coin, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var node = _reactDom2.default.findDOMNode(this.refs.coin);
            node.querySelectorAll('circle').forEach(function (circle) {
                circle.setAttribute('r', '8');
                circle.style.fillOpacity = 0;
                circle.style.cursor = 'pointer';
                circle.addEventListener('mouseover', _this2.onPointMouseMove);
            });
            node.querySelectorAll('polyline').forEach(function (circle) {
                circle.style.pointerEvents = 'none';
            });
            node.addEventListener('mouseout', this.onPointMouseOut);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this3 = this;

            var node = _reactDom2.default.findDOMNode(this.refs.coin);
            node.querySelectorAll('circle').forEach(function (circle) {
                circle.removeEventListener('mouseover', _this3.onPointMouseMove);
            });
            node.removeEventListener('mouseout', this.onPointMouseOut);
        }
    }, {
        key: 'render',
        value: function render() {
            var color = this.props.color;
            var coin = this.props.coin;
            var name = coin.get('name');
            var symbol = coin.get('symbol');
            var timepoints = coin.get('timepoints');
            var priceUsd = timepoints.last().get('price_usd');
            var pricesUsd = timepoints.map(function (point) {
                return parseFloat(point.get('price_usd'));
            }).toJS();
            return _react2.default.createElement(
                'div',
                { ref: 'coin', className: 'coin' },
                _react2.default.createElement(
                    'div',
                    { className: 'chart' },
                    _react2.default.createElement(
                        _reactSparklines.Sparklines,
                        { data: pricesUsd },
                        _react2.default.createElement(_reactSparklines.SparklinesLine, {
                            color: color,
                            style: { strokeWidth: 3.0 },
                            onMouseMove: function onMouseMove(e) {
                                console.log(e);
                            }
                        })
                    ),
                    _react2.default.createElement('div', { className: 'caption' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'coin-label' },
                    _react2.default.createElement(
                        'span',
                        { className: 'symbol' },
                        symbol
                    ),
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { className: 'price' },
                        parseFloat(priceUsd).toFixed(2)
                    )
                )
            );
        }
    }, {
        key: 'onPointMouseMove',
        value: function onPointMouseMove(e) {
            var node = _reactDom2.default.findDOMNode(this.refs.coin);
            var caption = node.querySelector('.caption');
            var circle = e.currentTarget;
            var circles = node.querySelectorAll('circle');
            var index = Array.prototype.indexOf.call(circles, circle);
            var points = this.props.coin.get('timepoints');
            var point = points.get(index);
            var priceUsd = parseFloat(point.get('price_usd')).toFixed(2);
            var timepoint = point.get('timepoint');
            var time = new Date(timepoint).toLocaleString();
            caption.innerText = '$' + priceUsd + ' ' + time;
        }
    }, {
        key: 'onPointMouseOut',
        value: function onPointMouseOut(e) {
            var node = _reactDom2.default.findDOMNode(this.refs.coin);
            var caption = node.querySelector('.caption');
            caption.innerText = '';
        }
    }]);
    return Coin;
}(_react.Component);

var SteemMarket = function (_Component2) {
    (0, _inherits3.default)(SteemMarket, _Component2);

    function SteemMarket() {
        (0, _classCallCheck3.default)(this, SteemMarket);
        return (0, _possibleConstructorReturn3.default)(this, (SteemMarket.__proto__ || (0, _getPrototypeOf2.default)(SteemMarket)).apply(this, arguments));
    }

    (0, _createClass3.default)(SteemMarket, [{
        key: 'render',
        value: function render() {
            var steemMarketData = this.props.steemMarketData;
            if (steemMarketData.isEmpty()) {
                return null;
            }
            var topCoins = steemMarketData.get('top_coins');
            var steem = steemMarketData.get('steem');
            var sbd = steemMarketData.get('sbd');

            return _react2.default.createElement(
                'div',
                { className: 'c-sidebar__module' },
                _react2.default.createElement(
                    'div',
                    { className: 'c-sidebar__header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'c-sidebar__h3' },
                        'Coin Marketplace'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'c-sidebar__content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'steem-market' },
                        _react2.default.createElement(Coin, { coin: steem, color: '#09d6a8' }),
                        _react2.default.createElement(Coin, { coin: sbd, color: '#09d6a8' }),
                        topCoins.map(function (coin) {
                            return _react2.default.createElement(Coin, {
                                key: coin.get('name'),
                                coin: coin,
                                color: '#788187'
                            });
                        })
                    )
                )
            );
        }
    }]);
    return SteemMarket;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var steemMarketData = state.app.get('steemMarket');
    return (0, _extends3.default)({}, ownProps, {
        steemMarketData: steemMarketData
    });
},
// mapDispatchToProps
function (dispatch) {
    return {};
})(SteemMarket);