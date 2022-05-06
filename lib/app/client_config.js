'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// sometimes it's impossible to use html tags to style coin name, hence usage of _UPPERCASE modifier
var APP_NAME = exports.APP_NAME = 'Wortheum';
// sometimes APP_NAME is written in non-latin characters, but they are needed for technical purposes
// ie. "Голос" > "Golos"
var APP_NAME_LATIN = exports.APP_NAME_LATIN = 'Wortheum';
var APP_NAME_UPPERCASE = exports.APP_NAME_UPPERCASE = 'WORTHEUM';
var APP_ICON = exports.APP_ICON = 'worth';
// FIXME figure out best way to do this on both client and server from env
// vars. client should read $STM_Config, server should read config package.
var APP_URL = exports.APP_URL = 'http://wortheum.news';
var APP_DOMAIN = exports.APP_DOMAIN = 'wortheum.news';
var LIQUID_TOKEN = exports.LIQUID_TOKEN = 'Worth';
// sometimes it's impossible to use html tags to style coin name, hence usage of _UPPERCASE modifier
var LIQUID_TOKEN_UPPERCASE = exports.LIQUID_TOKEN_UPPERCASE = 'WORTH';
var VESTING_TOKEN = exports.VESTING_TOKEN = 'WORTH POWER';
var INVEST_TOKEN_UPPERCASE = exports.INVEST_TOKEN_UPPERCASE = 'WORTH POWER';
var INVEST_TOKEN_SHORT = exports.INVEST_TOKEN_SHORT = 'WP';
var DEBT_TOKEN = exports.DEBT_TOKEN = 'WORTH DOLLAR';
var DEBT_TOKENS = exports.DEBT_TOKENS = 'WORTH DOLLARS';
var CURRENCY_SIGN = exports.CURRENCY_SIGN = '$';
var WIKI_URL = exports.WIKI_URL = ''; // https://wiki.golos.io/
var LANDING_PAGE_URL = exports.LANDING_PAGE_URL = 'https://wortheum.io/';
var TERMS_OF_SERVICE_URL = exports.TERMS_OF_SERVICE_URL = 'https://' + APP_DOMAIN + '/tos.html';
var PRIVACY_POLICY_URL = exports.PRIVACY_POLICY_URL = 'https://' + APP_DOMAIN + '/privacy.html';
var WHITEPAPER_URL = exports.WHITEPAPER_URL = 'https://wortheum.io/assets/Whitepaper-2.0.pdf';
var SIGNUP_URL = exports.SIGNUP_URL = 'https://signup.wortheum.news/';
// these are dealing with asset types, not displaying to client, rather sending data over websocket
var LIQUID_TICKER = exports.LIQUID_TICKER = 'WORTH';
var VEST_TICKER = exports.VEST_TICKER = 'VESTS';
var DEBT_TICKER = exports.DEBT_TICKER = 'WBD';
var DEBT_TOKEN_SHORT = exports.DEBT_TOKEN_SHORT = 'WBD';

// application settings
var DEFAULT_LANGUAGE = exports.DEFAULT_LANGUAGE = 'en'; // used on application internationalization bootstrap
var DEFAULT_CURRENCY = exports.DEFAULT_CURRENCY = 'USD';
var ALLOWED_CURRENCIES = exports.ALLOWED_CURRENCIES = ['USD'];

// meta info
var TWITTER_HANDLE = exports.TWITTER_HANDLE = '@wortheumio';
var SHARE_IMAGE = exports.SHARE_IMAGE = 'https://' + APP_DOMAIN + '/images/steemit-share.png';
var TWITTER_SHARE_IMAGE = exports.TWITTER_SHARE_IMAGE = 'https://' + APP_DOMAIN + '/images/steemit-twshare.png';
var SITE_DESCRIPTION = exports.SITE_DESCRIPTION = 'Wortheum is a web3 news platform where everyone gets paid for ' + 'creating and curating news based content. It leverages a robust digital points system, called Worth, that ' + 'supports real value for digital rewards through market price discovery and liquidity';

// various
var SUPPORT_EMAIL = exports.SUPPORT_EMAIL = 'support@' + APP_DOMAIN;
var IMG_PROXY_PREFIX = exports.IMG_PROXY_PREFIX = 'https://img.wortheum.news';