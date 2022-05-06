// sometimes it's impossible to use html tags to style coin name, hence usage of _UPPERCASE modifier
export const APP_NAME = 'Wortheum';
// sometimes APP_NAME is written in non-latin characters, but they are needed for technical purposes
// ie. "Голос" > "Golos"
export const APP_NAME_LATIN = 'Wortheum';
export const APP_NAME_UPPERCASE = 'WORTHEUM';
export const APP_ICON = 'worth';
// FIXME figure out best way to do this on both client and server from env
// vars. client should read $STM_Config, server should read config package.
export const APP_URL = 'http://wortheum.news';
export const APP_DOMAIN = 'wortheum.news';
export const LIQUID_TOKEN = 'Worth';
// sometimes it's impossible to use html tags to style coin name, hence usage of _UPPERCASE modifier
export const LIQUID_TOKEN_UPPERCASE = 'WORTH';
export const VESTING_TOKEN = 'WORTH POWER';
export const INVEST_TOKEN_UPPERCASE = 'WORTH POWER';
export const INVEST_TOKEN_SHORT = 'WP';
export const DEBT_TOKEN = 'WORTH DOLLAR';
export const DEBT_TOKENS = 'WORTH DOLLARS';
export const CURRENCY_SIGN = '$';
export const WIKI_URL = ''; // https://wiki.golos.io/
export const LANDING_PAGE_URL = 'https://wortheum.io/';
export const TERMS_OF_SERVICE_URL = 'https://' + APP_DOMAIN + '/tos.html';
export const PRIVACY_POLICY_URL = 'https://' + APP_DOMAIN + '/privacy.html';
export const WHITEPAPER_URL = 'https://wortheum.io/assets/Whitepaper-2.0.pdf';
export const SIGNUP_URL = 'https://signup.wortheum.news/';
// these are dealing with asset types, not displaying to client, rather sending data over websocket
export const LIQUID_TICKER = 'WORTH';
export const VEST_TICKER = 'VESTS';
export const DEBT_TICKER = 'WBD';
export const DEBT_TOKEN_SHORT = 'WBD';

// application settings
export const DEFAULT_LANGUAGE = 'en'; // used on application internationalization bootstrap
export const DEFAULT_CURRENCY = 'USD';
export const ALLOWED_CURRENCIES = ['USD'];

// meta info
export const TWITTER_HANDLE = '@wortheumio';
export const SHARE_IMAGE =
    'https://' + APP_DOMAIN + '/images/steemit-share.png';
export const TWITTER_SHARE_IMAGE =
    'https://' + APP_DOMAIN + '/images/steemit-twshare.png';
export const SITE_DESCRIPTION =
    'Wortheum is a web3 news platform where everyone gets paid for ' +
    'creating and curating news based content. It leverages a robust digital points system, called Worth, that ' +
    'supports real value for digital rewards through market price discovery and liquidity';

// various
export const SUPPORT_EMAIL = 'support@' + APP_DOMAIN;
export const IMG_PROXY_PREFIX = 'https://img.wortheum.news';
