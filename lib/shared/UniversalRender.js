'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serverRender = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

/**
 *
 * @param {*} location
 * @param {*} initialState
 * @param {*} ErrorPage
 * @param {*} userPreferences
 * @param {*} offchain
 * @param {RequestTimer} requestTimer
 * @returns promise
 */
var serverRender = exports.serverRender = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(location, initialState, ErrorPage, userPreferences, offchain, requestTimer) {
        var error, redirect, renderProps, _ref2, _ref3, server_store, onchain, url, key, params, content, msg, stack_trace, app, status, meta;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        error = void 0, redirect = void 0, renderProps = void 0;
                        _context.prev = 1;
                        _context.next = 4;
                        return runRouter(location, _RootRoute2.default);

                    case 4:
                        _ref2 = _context.sent;
                        _ref3 = (0, _slicedToArray3.default)(_ref2, 3);
                        error = _ref3[0];
                        redirect = _ref3[1];
                        renderProps = _ref3[2];
                        _context.next = 15;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](1);

                        console.error('Routing error:', _context.t0.toString(), location);
                        return _context.abrupt('return', {
                            title: 'Routing error - Wortheum',
                            statusCode: 500,
                            body: (0, _server.renderToString)(ErrorPage ? _react2.default.createElement(ErrorPage, null) : _react2.default.createElement(
                                'span',
                                null,
                                'Routing error'
                            ))
                        });

                    case 15:
                        if (!(error || !renderProps)) {
                            _context.next = 17;
                            break;
                        }

                        return _context.abrupt('return', {
                            title: 'Page Not Found - Wortheum',
                            statusCode: 404,
                            body: (0, _server.renderToString)(_react2.default.createElement(_NotFound.component, null))
                        });

                    case 17:
                        server_store = void 0, onchain = void 0;
                        _context.prev = 18;
                        url = getUrlFromLocation(location);


                        requestTimer.startTimer('apiGetState_ms');
                        _context.next = 23;
                        return apiGetState(url);

                    case 23:
                        onchain = _context.sent;

                        requestTimer.stopTimer('apiGetState_ms');

                        // If a user profile URL is requested but no profile information is
                        // included in the API response, return User Not Found.

                        if (!((url.match(_ResolveRoute.routeRegex.UserProfile1) || url.match(_ResolveRoute.routeRegex.UserProfile3)) && (0, _getOwnPropertyNames2.default)(onchain.accounts).length === 0)) {
                            _context.next = 27;
                            break;
                        }

                        return _context.abrupt('return', {
                            title: 'User Not Found - Wortheum',
                            statusCode: 404,
                            body: (0, _server.renderToString)(_react2.default.createElement(_NotFound.component, null))
                        });

                    case 27:

                        // If we are not loading a post, truncate state data to bring response size down.
                        if (!url.match(_ResolveRoute.routeRegex.Post)) {
                            for (key in onchain.content) {
                                //onchain.content[key]['body'] = onchain.content[key]['body'].substring(0, 1024) // TODO: can be removed. will be handled by steemd
                                // Count some stats then remove voting data. But keep current user's votes. (#1040)
                                onchain.content[key]['stats'] = (0, _StateFunctions.contentStats)(onchain.content[key]);
                                onchain.content[key]['active_votes'] = null;
                            }
                        }

                        // Are we loading an un-category-aliased post?

                        if (!(!url.match(_ResolveRoute.routeRegex.PostsIndex) && !url.match(_ResolveRoute.routeRegex.UserProfile1) && !url.match(_ResolveRoute.routeRegex.UserProfile2) && url.match(_ResolveRoute.routeRegex.PostNoCategory))) {
                            _context.next = 43;
                            break;
                        }

                        params = url.substr(2, url.length - 1).split('/');
                        content = void 0;

                        if (!process.env.OFFLINE_SSR_TEST) {
                            _context.next = 35;
                            break;
                        }

                        content = get_content_perf;
                        _context.next = 38;
                        break;

                    case 35:
                        _context.next = 37;
                        return _steemJs.api.getContentAsync(params[0], params[1]);

                    case 37:
                        content = _context.sent;

                    case 38:
                        if (!(content.author && content.permlink)) {
                            _context.next = 42;
                            break;
                        }

                        // valid short post url
                        onchain.content[url.substr(2, url.length - 1)] = content;
                        _context.next = 43;
                        break;

                    case 42:
                        return _context.abrupt('return', {
                            title: 'Page Not Found - Wortheum',
                            statusCode: 404,
                            body: (0, _server.renderToString)(_react2.default.createElement(_NotFound.component, null))
                        });

                    case 43:

                        // Insert the special posts into the list of posts, so there is no
                        // jumping of content.
                        offchain.special_posts.featured_posts.forEach(function (featuredPost) {
                            onchain.content[featuredPost.author + '/' + featuredPost.permlink] = featuredPost;
                        });

                        offchain.special_posts.promoted_posts.forEach(function (promotedPost) {
                            onchain.content[promotedPost.author + '/' + promotedPost.permlink] = promotedPost;
                        });

                        server_store = (0, _redux.createStore)(_RootReducer2.default, {
                            app: initialState.app,
                            global: onchain,
                            offchain: offchain
                        });
                        server_store.dispatch({
                            type: '@@router/LOCATION_CHANGE',
                            payload: { pathname: location }
                        });
                        server_store.dispatch(appActions.setUserPreferences(userPreferences));
                        _context.next = 61;
                        break;

                    case 50:
                        _context.prev = 50;
                        _context.t1 = _context['catch'](18);

                        if (!location.match(_ResolveRoute.routeRegex.UserProfile1)) {
                            _context.next = 57;
                            break;
                        }

                        console.error('User/not found: ', location);
                        return _context.abrupt('return', {
                            title: 'Page Not Found - Wortheum',
                            statusCode: 404,
                            body: (0, _server.renderToString)(_react2.default.createElement(_NotFound.component, null))
                        });

                    case 57:
                        msg = _context.t1.toString && _context.t1.toString() || _context.t1.message || _context.t1;
                        stack_trace = _context.t1.stack || '[no stack]';

                        console.error('State/store error: ', msg, stack_trace);
                        return _context.abrupt('return', {
                            title: 'Server error - Wortheum',
                            statusCode: 500,
                            body: (0, _server.renderToString)(_react2.default.createElement(ErrorPage, null))
                        });

                    case 61:
                        app = void 0, status = void 0, meta = void 0;

                        try {
                            requestTimer.startTimer('ssr_ms');
                            app = (0, _server.renderToString)(_react2.default.createElement(
                                _reactRedux.Provider,
                                { store: server_store },
                                _react2.default.createElement(
                                    _Translator2.default,
                                    null,
                                    _react2.default.createElement(_reactRouter.RouterContext, renderProps)
                                )
                            ));
                            requestTimer.stopTimer('ssr_ms');
                            meta = (0, _ExtractMeta2.default)(onchain, renderProps.params);
                            status = 200;
                        } catch (re) {
                            console.error('Rendering error: ', re, re.stack);
                            app = (0, _server.renderToString)(_react2.default.createElement(ErrorPage, null));
                            status = 500;
                        }

                        return _context.abrupt('return', {
                            title: 'Wortheum',
                            titleBase: 'Wortheum - ',
                            meta: meta,
                            statusCode: status,
                            body: _iso2.default.render(app, server_store.getState())
                        });

                    case 64:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 11], [18, 50]]);
    }));

    return function serverRender(_x, _x2, _x3, _x4, _x5, _x6) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * dependencies:
 * browserHistory
 * useScroll
 * OffsetScrollBehavior
 * location
 *
 * @param {*} initialState
 */


var apiGetState = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
        var offchain;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        offchain = void 0;


                        if (process.env.OFFLINE_SSR_TEST) {
                            offchain = get_state_perf;
                        }

                        _context2.next = 4;
                        return (0, _steemApi.getStateAsync)(url);

                    case 4:
                        offchain = _context2.sent;
                        return _context2.abrupt('return', offchain);

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function apiGetState(_x7) {
        return _ref5.apply(this, arguments);
    };
}();

exports.clientRender = clientRender;

var _iso = require('iso');

var _iso2 = _interopRequireDefault(_iso);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _steemJs = require('@steemit/steem-js');

var _RootRoute = require('app/RootRoute');

var _RootRoute2 = _interopRequireDefault(_RootRoute);

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _redux = require('redux');

var _reactRouterScroll = require('react-router-scroll');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _RootReducer = require('app/redux/RootReducer');

var _RootReducer2 = _interopRequireDefault(_RootReducer);

var _RootSaga = require('shared/RootSaga');

var _RootSaga2 = _interopRequireDefault(_RootSaga);

var _NotFound = require('app/components/pages/NotFound');

var _ExtractMeta = require('app/utils/ExtractMeta');

var _ExtractMeta2 = _interopRequireDefault(_ExtractMeta);

var _Translator = require('app/Translator');

var _Translator2 = _interopRequireDefault(_Translator);

var _ResolveRoute = require('app/ResolveRoute');

var _StateFunctions = require('app/utils/StateFunctions');

var _scrollBehavior = require('scroll-behavior');

var _scrollBehavior2 = _interopRequireDefault(_scrollBehavior);

var _steemApi = require('app/utils/steemApi');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get_state_perf = void 0,
    get_content_perf = false; /* eslint react/display-name: 0 */
/* eslint space-before-function-paren:0 */
// https://github.com/eslint/eslint/issues/4442

if (process.env.OFFLINE_SSR_TEST) {
    var testDataDir = process.env.OFFLINE_SSR_TEST_DATA_DIR || 'api_mockdata';
    var uri = __dirname + '/../../';
    get_state_perf = require(uri + testDataDir + '/get_state');
    get_content_perf = require(uri + testDataDir + '/get_content');
}

var calcOffsetRoot = function calcOffsetRoot(startEl) {
    var offset = 0;
    var el = startEl;
    while (el) {
        offset += el.offsetTop;
        el = el.offsetParent;
    }
    return offset;
};

//BEGIN: SCROLL CODE
/**
 * The maximum number of times to attempt scrolling to the target element/y position
 * (total seconds of attempted scrolling is given by (SCROLL_TOP_TRIES * SCROLL_TOP_DELAY_MS)/1000 )
 * @type {number}
 */
var SCROLL_TOP_TRIES = 50;
/**
 * The number of milliseconds to delay between scroll attempts
 * (total seconds of attempted scrolling is given by (SCROLL_TOP_TRIES * SCROLL_TOP_DELAY_MS)/1000 )
 * @type {number}
 */
var SCROLL_TOP_DELAY_MS = 100;
/**
 * The size of the vertical gap between the bottom of the fixed header and the top of the scrolled-to element.
 * @type {number}
 */
var SCROLL_TOP_EXTRA_PIXEL_OFFSET = 3;
/**
 * number of pixels the document can move in the 'wrong' direction (opposite of intended scroll) this covers accidental scroll movements by users.
 * @type {number}
 */
var SCROLL_FUDGE_PIXELS = 10;
/**
 * if document is being scrolled up this is set for prevDocumentInfo && documentInfo
 * @type {string}
 */
var SCROLL_DIRECTION_UP = 'up';
/**
 * if document is being scrolled down this is set for prevDocumentInfo && documentInfo
 * @type {string}
 */
var SCROLL_DIRECTION_DOWN = 'down';

/**
 * If an element with this id is present, the page does not want us to detect navigation history direction (clicking links/forward button or back button)
 * @type {string}
 */
var DISABLE_ROUTER_HISTORY_NAV_DIRECTION_EL_ID = 'disable_router_nav_history_direction_check';

var scrollTopTimeout = null;

/**
 * raison d'être: support hash link navigation into slow-to-render page sections.
 *
 * @param {htmlElement} el - the element to which we wish to scroll
 * @param {number} topOffset - number of pixels to add to the scroll. (would be a negative number if fixed header)
 * @param {Object} prevDocumentInfo -
 *          .scrollHeight {number} - document.body.scrollHeight
 *          .scrollTop {number} - ~document.scrollingElement.scrollTop
 *          .scrollTarget {number} - the previously calculated scroll target
 * @param {number} triesRemaining - number of attempts remaining
 */
var scrollTop = function scrollTop(el, topOffset, prevDocumentInfo, triesRemaining) {
    var documentInfo = {
        scrollHeight: document.body.scrollHeight,
        scrollTop: Math.ceil(document.scrollingElement.scrollTop),
        scrollTarget: calcOffsetRoot(el) + topOffset,
        direction: prevDocumentInfo.direction
    };
    var doScroll = false;
    //for both SCROLL_DIRECTION_DOWN, SCROLL_DIRECTION_UP
    //We scroll if the document has 1. not been deliberately scrolled, AND 2. we have not passed our target scroll,
    //NOR has the document changed in a meaningful way since we last looked at it
    if (prevDocumentInfo.direction === SCROLL_DIRECTION_DOWN) {
        doScroll = prevDocumentInfo.scrollTop <= documentInfo.scrollTop + SCROLL_FUDGE_PIXELS && (documentInfo.scrollTop < documentInfo.scrollTarget || prevDocumentInfo.scrollTarget < documentInfo.scrollTarget || prevDocumentInfo.scrollHeight < documentInfo.scrollHeight);
    } else if (prevDocumentInfo.direction === SCROLL_DIRECTION_UP) {
        doScroll = prevDocumentInfo.scrollTop >= documentInfo.scrollTop - SCROLL_FUDGE_PIXELS && (documentInfo.scrollTop > documentInfo.scrollTarget || prevDocumentInfo.scrollTarget > documentInfo.scrollTarget || prevDocumentInfo.scrollHeight > documentInfo.scrollHeight);
    }

    if (doScroll) {
        window.scrollTo(0, documentInfo.scrollTarget);
        if (triesRemaining > 0) {
            scrollTopTimeout = setTimeout(function () {
                return scrollTop(el, topOffset, documentInfo, triesRemaining - 1);
            }, SCROLL_TOP_DELAY_MS);
        }
    }
};

/**
 * Custom scrolling behavior needed because we have chunky page loads and a fixed header.
 */

var OffsetScrollBehavior = function (_ScrollBehavior) {
    (0, _inherits3.default)(OffsetScrollBehavior, _ScrollBehavior);

    function OffsetScrollBehavior() {
        (0, _classCallCheck3.default)(this, OffsetScrollBehavior);
        return (0, _possibleConstructorReturn3.default)(this, (OffsetScrollBehavior.__proto__ || (0, _getPrototypeOf2.default)(OffsetScrollBehavior)).apply(this, arguments));
    }

    (0, _createClass3.default)(OffsetScrollBehavior, [{
        key: 'scrollToTarget',

        /**
         * Raison d'être: on hash link navigation, assemble the needed info and pass it to scrollTop()
         * In cases where we're scrolling to a pixel offset, adjust the offset for the current header, and punt to default behavior.
         */
        value: function scrollToTarget(element, target) {
            clearTimeout(scrollTopTimeout); //it's likely this will be called multiple times in succession, so clear and existing scrolling.
            var header = document.getElementsByTagName('header')[0]; //this dimension ideally would be pulled from a scss file.
            var topOffset = SCROLL_TOP_EXTRA_PIXEL_OFFSET * -1;
            if (header) {
                topOffset += header.offsetHeight * -1;
            }
            var newTarget = []; //x coordinate
            var el = false;
            if (typeof target === 'string') {
                el = document.getElementById(target.substr(1));
                if (!el) {
                    el = document.getElementById(target);
                }
            } else {
                newTarget.push(target[0]);
                if (target[1] + topOffset > 0) {
                    newTarget.push(target[1] + topOffset);
                } else {
                    newTarget.push(0);
                }
            }

            if (el) {
                var documentInfo = {
                    scrollHeight: document.body.scrollHeight,
                    scrollTop: Math.ceil(document.scrollingElement.scrollTop),
                    scrollTarget: calcOffsetRoot(el) + topOffset
                };
                documentInfo.direction = documentInfo.scrollTop < documentInfo.scrollTarget ? SCROLL_DIRECTION_DOWN : SCROLL_DIRECTION_UP;
                scrollTop(el, topOffset, documentInfo, SCROLL_TOP_TRIES); //this function does the actual work of scrolling.
            } else {
                (0, _get3.default)(OffsetScrollBehavior.prototype.__proto__ || (0, _getPrototypeOf2.default)(OffsetScrollBehavior.prototype), 'scrollToTarget', this).call(this, element, newTarget);
            }
        }
    }]);
    return OffsetScrollBehavior;
}(_scrollBehavior2.default);
//END: SCROLL CODE

var bindMiddleware = function bindMiddleware(middleware) {
    if (process.env.BROWSER && process.env.NODE_ENV === 'development') {
        var _require = require('redux-devtools-extension'),
            composeWithDevTools = _require.composeWithDevTools;

        return composeWithDevTools(_redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middleware)));
    }
    return _redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middleware));
};

var runRouter = function runRouter(location, routes) {
    return new _promise2.default(function (resolve) {
        return (0, _reactRouter.match)({ routes: routes, location: location }, function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return resolve(args);
        });
    });
};

var onRouterError = function onRouterError(error) {
    console.error('onRouterError', error);
};function clientRender(initialState) {
    var sagaMiddleware = (0, _reduxSaga2.default)();
    var store = (0, _redux.createStore)(_RootReducer2.default, initialState, bindMiddleware([sagaMiddleware]));
    sagaMiddleware.run(_RootSaga2.default);
    var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

    /**
     * When to scroll - on hash link navigation determine if the page should scroll to that element (forward nav, or ignore nav direction)
     */
    var scroll = (0, _reactRouterScroll.useScroll)({
        createScrollBehavior: function createScrollBehavior(config) {
            return new OffsetScrollBehavior(config);
        }, //information assembler for has scrolling.
        shouldUpdateScroll: function shouldUpdateScroll(prevLocation, _ref4) {
            var location = _ref4.location;

            // eslint-disable-line no-shadow
            //if there is a hash, we may want to scroll to it
            if (location.hash) {
                //if disableNavDirectionCheck exists, we want to always navigate to the hash (the page is telling us that's desired behavior based on the element's existence
                var disableNavDirectionCheck = document.getElementById(DISABLE_ROUTER_HISTORY_NAV_DIRECTION_EL_ID);
                //we want to navigate to the corresponding id=<hash> element on 'PUSH' navigation (prev null + POP is a new window url nav ~= 'PUSH')
                if (disableNavDirectionCheck || prevLocation === null && location.action === 'POP' || location.action === 'PUSH') {
                    return location.hash;
                }
            }
            return true;
        }
    });

    if (process.env.NODE_ENV === 'production') {
        console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', 'WARNING!');
        console.log('%c%s', 'color: black; font-size: 16px;', 'This is a developer console, you must read and understand anything you paste or type here or you could compromise your account and your private keys.');
    }

    return (0, _reactDom.render)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _Translator2.default,
            null,
            _react2.default.createElement(_reactRouter.Router, {
                routes: _RootRoute2.default,
                history: history,
                onError: onRouterError,
                render: (0, _reactRouter.applyRouterMiddleware)(scroll)
            })
        )
    ), document.getElementById('content'));
}

/**
 * Do some pre-state-fetch url rewriting.
 *
 * @param {string} location
 * @returns {string}
 */
function getUrlFromLocation(location) {
    var url = location === '/' ? 'trending' : location;
    // Replace /curation-rewards and /author-rewards with /transfers for UserProfile
    // to resolve data correctly
    if (url.indexOf('/curation-rewards') !== -1) url = url.replace(/\/curation-rewards$/, '/transfers');
    if (url.indexOf('/author-rewards') !== -1) url = url.replace(/\/author-rewards$/, '/transfers');

    return url;
}