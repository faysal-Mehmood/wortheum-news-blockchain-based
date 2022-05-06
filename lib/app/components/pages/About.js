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

var _client_config = require('app/client_config');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = function (_React$Component) {
    (0, _inherits3.default)(About, _React$Component);

    function About() {
        (0, _classCallCheck3.default)(this, About);
        return (0, _possibleConstructorReturn3.default)(this, (About.__proto__ || (0, _getPrototypeOf2.default)(About)).apply(this, arguments));
    }

    (0, _createClass3.default)(About, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'About' },
                _react2.default.createElement(
                    'section',
                    { className: 'AboutMission' },
                    _react2.default.createElement(
                        'div',
                        { className: 'AboutMission__heading-container' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'AboutMission__heading' },
                            'Wortheum Mission, Vision and Values'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'AboutMission__section' },
                        _react2.default.createElement(
                            'div',
                            { className: 'AboutMission__text-container' },
                            _react2.default.createElement('div', { className: 'AboutMission__square' }),
                            _react2.default.createElement(
                                'h2',
                                { className: 'AboutMission__heading' },
                                'Mission'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'Make great communities for journalism',
                                ' ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'line-break' },
                                    'with financial inclusion.'
                                )
                            ),
                            _react2.default.createElement('div', { className: 'AboutMission__square AboutMission__square--2' }),
                            _react2.default.createElement(
                                'h2',
                                { className: 'AboutMission__heading' },
                                'Vision'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'Our vision is that wortheum is a vibrant communities web app, expanding the boundaries of community coordination and online discussion by incorporating cryptocurrency as incentives. The company focuses on sustainability and decentralization by lowering running costs and increasing revenues, while increasing stickiness by providing better homepage and community tools, and is always demanding a secure and safe, client-side signing experience.'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'AboutMission__image-container' },
                            _react2.default.createElement('img', {
                                className: 'AboutMission__img',
                                src: '/images/about/about.jpeg',
                                alt: true
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'AboutMission__section' },
                        _react2.default.createElement(
                            'div',
                            { className: 'AboutMission__text-container' },
                            _react2.default.createElement('div', { className: 'AboutMission__square' }),
                            _react2.default.createElement(
                                'h2',
                                { className: 'AboutMission__heading' },
                                'Values'
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'AboutMission__subheading' },
                                'Cryptocurrency adoption'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'Cryptocurrency adoption means advancing tools that contribute to the consumers\u2019 ability to be aware of, use, hold and appreciate cryptocurrency for its benefits, such as sovereign value store and peer-to-peer payments.'
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'AboutMission__subheading' },
                                'Sustainability'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'Sustainability means building real business from wortheum by way of advertisements and programatically selling cryptocurrency assets that wortheum OU holds. Wortheum, for instance, has held lots of WORTH since creation. The company could have sold all of it over the past some time, and instead continues to hold and only sell programmatically, because we value the potential of Worth. Advertising is also an important part of our business for aligning wortheum with all its participants, such as jurnalists, bloggers, content consumers, community builders and our company\u2019s shareholders, who all benefit from increased stickiness and usage of wortheum.news. Both of these revenue sources\u2013capital gains from currency sales and advertising revenue\u2013are valuable to our sustainability.'
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'AboutMission__subheading' },
                                'Health'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'Health means aligning our organization leaders, including employees and contractors, to contribute in ways that advance our organization, which means taking care of their well being in return for their commitment to our mission, vision and values.'
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'AboutMission__subheading' },
                                'Safety'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'Safety means introducing changes slowly and predictably with much testing. We greatly prefer to move carefully and not break things, especially when those things are near steemit.com\u2019s wallet functionality or when proposing Steem hardforking upgrades, rather than move fast while introducing breaking changes.'
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'AboutMission__subheading' },
                                'Security'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'Security means providing tools to our users of wortheum that mitigate risk when it comes to cryptocurrency interactions. This principle has led us to preferred use of client-side signing for cryptocurrency use on wortheum.news, which means all transactions are pushed by the user while Wortheum. never has access to, nor sees the user\u2019s private keys; this keeps the risk of cryptocurrency manageable for the user because they can be assured they are the only person responsible for their private key usage. Security also comes from open-sourcing most of our software. By open-sourcing, we\u2019ve found community engagement occurs to help audit and review the published tools. Sometimes bugs and pitfalls are discovered this way. Beyond that, we publish our open-source software with an MIT license, which means others can build from it freely and can then advance the ecosystem in parallel.'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'AboutMission__image-container' },
                            _react2.default.createElement('img', {
                                className: 'AboutMission__img',
                                src: '/images/about/coin.jpg',
                                alt: true
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'AboutMission__section AboutMission__section--vision' },
                        _react2.default.createElement(
                            'div',
                            { className: 'AboutMission__text-container' },
                            _react2.default.createElement('div', { className: 'AboutMission__square' }),
                            _react2.default.createElement(
                                'h2',
                                { className: 'AboutMission__heading' },
                                'Priorities'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'We strive to make wortheum great for communities and financial inclusion. This includes focusing on the following:'
                            ),
                            _react2.default.createElement(
                                'ul',
                                { className: 'AboutMission__list' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'AboutMission__list-item' },
                                    'Lower operating costs for sustainability and decentralization'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'AboutMission__list-item' },
                                    'Increasing advertisements revenue'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'AboutMission__list-item' },
                                    'Bite-size, visible changes, which includes increasing homepage functionality, such as the following:'
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'AboutMission__list' },
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'AboutMission__list-item' },
                                        'Updates Log'
                                    ),
                                    _react2.default.createElement(
                                        'ul',
                                        { className: 'AboutMission__list' },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Publish our development-recaps and updates-focused content via Update Log'
                                        ),
                                        _react2.default.createElement(
                                            'ul',
                                            { className: 'AboutMission__list' },
                                            _react2.default.createElement(
                                                'li',
                                                { className: 'AboutMission__list-item' },
                                                'Communication of Wortheum developments'
                                            ),
                                            _react2.default.createElement(
                                                'li',
                                                { className: 'AboutMission__list-item' },
                                                'Communication of wortheum.news developments'
                                            ),
                                            _react2.default.createElement(
                                                'li',
                                                { className: 'AboutMission__list-item' },
                                                'Communication of Wortheum developments'
                                            ),
                                            _react2.default.createElement(
                                                'li',
                                                { className: 'AboutMission__list-item' },
                                                'Communication of Wortheum Dapps / Ecosystem developments'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Notify media outlets of additions to the Updates Log'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'AboutMission__list-item' },
                                    'Implementing Communities functionality'
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'What do our Mission, Vision and Values mean for our Wortheum development?'
                            ),
                            _react2.default.createElement(
                                'ul',
                                { className: 'AboutMission__list' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'AboutMission__list-item' },
                                    'We strive to make Wortheum great for online communities and financial inclusion. This includes focusing on the following items:'
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'AboutMission__list' },
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'AboutMission__list-item' },
                                        'Lowering costs for decentralization'
                                    ),
                                    _react2.default.createElement(
                                        'ul',
                                        { className: 'AboutMission__list' },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Such as with RocksDB enhancements'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Lower costs of running full (economic) nodes'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Lower costs of running wortheum.news by lowering costs of hive nodes or new social plugins architecture'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'AboutMission__list-item' },
                                        'Propose hardforking upgrades for increasing beneficial functionality'
                                    ),
                                    _react2.default.createElement(
                                        'ul',
                                        { className: 'AboutMission__list' },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Tokens (WHTs)'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Tokens with vote-able emissions'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Additional token functions'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'AboutMission__list-item' },
                                        'Providing support'
                                    ),
                                    _react2.default.createElement(
                                        'ul',
                                        { className: 'AboutMission__list' },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'AboutMission__list-item' },
                                            'Exchange support'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'This is our principled focus for achieving success. Anything we haven\u2019t included in here, and there are plenty, because opportunities are so bountiful in this space, is not a focus for us. We encourage you to contribute and seek opportunities by picking up anything we aren\u2019t covering, particularly if it contributes to WORTH and cryptocurrency adoption.'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'AboutMission__image-container' },
                            _react2.default.createElement('img', {
                                className: 'AboutMission__img',
                                src: '/images/about/priorities.jpg',
                                alt: true
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'AboutMission__section' },
                        _react2.default.createElement(
                            'div',
                            { className: 'AboutMission__text-container' },
                            _react2.default.createElement('div', { className: 'AboutMission__square' }),
                            _react2.default.createElement(
                                'h2',
                                { className: 'AboutMission__heading' },
                                'Disclaimer'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'AboutMission__text' },
                                'WORTHEUM (The \u201CCompany\u201D), is a private company that helps develop the open-source software that powers WORTHEUM.NEWS, including steemd. The Company may own various digital assets, including, without limitation, quantities of cryptocurrencies such as WORTH. These assets are the sole property of the Company. Further, the Company\u2019s mission, vision, goals, statements, actions, and core values do not constitute a contract, commitment, obligation, or other duty to any person, company or cryptocurrency network user and are subject to change at any time.'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'AboutMission__image-container' },
                            _react2.default.createElement('img', {
                                className: 'AboutMission__img',
                                src: '/images/about/talk.jpg',
                                alt: true
                            })
                        )
                    )
                )
            );
        }
    }]);
    return About;
}(_react2.default.Component);

module.exports = {
    path: 'about.html',
    component: About
};