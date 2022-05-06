'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _CloseButton = require('app/components/elements/CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidePanel = function SidePanel(_ref) {
    var alignment = _ref.alignment,
        visible = _ref.visible,
        hideSidePanel = _ref.hideSidePanel,
        username = _ref.username,
        walletUrl = _ref.walletUrl;

    if (process.env.BROWSER) {
        visible && document.addEventListener('click', hideSidePanel);
        !visible && document.removeEventListener('click', hideSidePanel);
    }

    var loggedIn = username === undefined ? 'show-for-small-only' : 'SidePanel__hide-signup';

    var makeLink = function makeLink(i, ix, arr) {
        // A link is internal if it begins with a slash
        var isExternal = !i.link.match(/^\//) || i.isExternal;
        if (isExternal) {
            var cn = ix === arr.length - 1 ? 'last' : null;
            return _react2.default.createElement(
                'li',
                { key: i.value, className: cn },
                _react2.default.createElement(
                    'a',
                    {
                        href: i.link,
                        target: i.internal ? null : '_blank',
                        rel: 'noopener noreferrer'
                    },
                    i.label,
                    '\xA0',
                    _react2.default.createElement(_Icon2.default, { name: 'extlink' })
                )
            );
        } else {
            var _cn = ix === arr.length - 1 ? 'last' : null;
            return _react2.default.createElement(
                'li',
                { key: i.value, className: _cn },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: i.link },
                    i.label
                )
            );
        }
    };

    var sidePanelLinks = {
        internal: [{
            value: 'welcome',
            label: (0, _counterpart2.default)('navigation.welcome'),
            link: '/welcome'
        }, {
            value: 'faq',
            label: (0, _counterpart2.default)('navigation.faq'),
            link: '/faq.html'
        }, {
            value: 'tags',
            label: (0, _counterpart2.default)('navigation.explore'),
            link: '/tags'
        }, {
            value: 'market',
            label: (0, _counterpart2.default)('navigation.currency_market'),
            link: walletUrl + '/market'
        }, {
            value: 'advertise',
            label: (0, _counterpart2.default)('navigation.advertise'),
            link: 'https://wortheum.io',
            isExternal: true
        }, {
            value: 'recover_account_step_1',
            label: (0, _counterpart2.default)('navigation.stolen_account_recovery'),
            link: walletUrl + '/recover_account_step_1'
        }, {
            value: 'change_password',
            label: (0, _counterpart2.default)('navigation.change_account_password'),
            link: walletUrl + '/change_password'
        }, {
            value: 'vote_for_witnesses',
            label: (0, _counterpart2.default)('navigation.vote_for_witnesses'),
            link: walletUrl + '/~witnesses'
        }],
        organizational: [{
            value: 'telegram support group',
            label: (0, _counterpart2.default)('navigation.telegram'),
            link: 'https://t.me/wortheumofficial'
        }, {
            value: 'whitepaper',
            label: (0, _counterpart2.default)('navigation.whitepaper'),
            link: 'http://wortheum.io/assets/Whitepaper-2.0.pdf'
        }, {
            value: 'about',
            label: (0, _counterpart2.default)('navigation.about'),
            link: '/about.html',
            internal: true
        }],
        legal: [{
            value: 'privacy',
            label: (0, _counterpart2.default)('navigation.privacy_policy'),
            link: '/privacy.html'
        }, {
            value: 'tos',
            label: (0, _counterpart2.default)('navigation.terms_of_service'),
            link: '/tos.html'
        }],
        extras: [{
            value: 'login',
            label: (0, _counterpart2.default)('g.sign_in'),
            link: '/login.html'
        }, {
            value: 'signup',
            label: (0, _counterpart2.default)('g.sign_up'),
            link: 'https://signup.wortheum.news'
        }, {
            value: 'post',
            label: (0, _counterpart2.default)('g.post'),
            link: '/submit.html'
        }]
    };

    return _react2.default.createElement(
        'div',
        { className: 'SidePanel' },
        _react2.default.createElement(
            'div',
            { className: (visible ? 'visible ' : '') + alignment },
            _react2.default.createElement(_CloseButton2.default, { onClick: hideSidePanel }),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu ' + loggedIn },
                sidePanelLinks['extras'].map(makeLink)
            ),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu' },
                sidePanelLinks['internal'].map(makeLink)
            ),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu' },
                sidePanelLinks['organizational'].map(makeLink)
            ),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu' },
                sidePanelLinks['legal'].map(makeLink)
            )
        )
    );
};

SidePanel.propTypes = {
    alignment: _propTypes2.default.oneOf(['left', 'right']).isRequired,
    visible: _propTypes2.default.bool.isRequired,
    hideSidePanel: _propTypes2.default.func.isRequired,
    username: _propTypes2.default.string
};

SidePanel.defaultProps = {
    username: undefined
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var walletUrl = state.app.get('walletUrl');
    return (0, _extends3.default)({
        walletUrl: walletUrl
    }, ownProps);
}, function (dispatch) {
    return {};
})(SidePanel);