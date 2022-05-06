'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.actions = exports.fetchDataWatches = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.getContentCaller = getContentCaller;
exports.fetchState = fetchState;
exports.fetchData = fetchData;
exports.fetchMeta = fetchMeta;

var _effects = require('redux-saga/effects');

var _steemJs = require('@steemit/steem-js');

var _FollowSaga = require('app/redux/FollowSaga');

var _SagaShared = require('app/redux/SagaShared');

var _GlobalReducer = require('./GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _AppReducer = require('./AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _immutable = require('immutable');

var _steemApi = require('app/utils/steemApi');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(getContentCaller),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(fetchState),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(syncSpecialPosts),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(getAccounts),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(fetchData),
    _marked6 = /*#__PURE__*/_regenerator2.default.mark(fetchMeta),
    _marked7 = /*#__PURE__*/_regenerator2.default.mark(fetchJson);

var REQUEST_DATA = 'fetchDataSaga/REQUEST_DATA';
var GET_CONTENT = 'fetchDataSaga/GET_CONTENT';
var FETCH_STATE = 'fetchDataSaga/FETCH_STATE';

var fetchDataWatches = exports.fetchDataWatches = [(0, _effects.takeLatest)(REQUEST_DATA, fetchData), (0, _effects.takeEvery)(GET_CONTENT, getContentCaller), (0, _effects.takeLatest)('@@router/LOCATION_CHANGE', fetchState), (0, _effects.takeLatest)(FETCH_STATE, fetchState), (0, _effects.takeEvery)('global/FETCH_JSON', fetchJson)];

function getContentCaller(action) {
    return _regenerator2.default.wrap(function getContentCaller$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _SagaShared.getContent)(action.payload);

                case 2:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

var is_initial_state = true;
function fetchState(location_change_action) {
    var pathname, m, username, server_location, ignore_fetch, url, state;
    return _regenerator2.default.wrap(function fetchState$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    pathname = location_change_action.payload.pathname;
                    m = pathname.match(/^\/@([a-z0-9\.-]+)/);

                    if (!(m && m.length === 2)) {
                        _context2.next = 10;
                        break;
                    }

                    username = m[1];
                    _context2.next = 6;
                    return (0, _effects.fork)(_FollowSaga.fetchFollowCount, username);

                case 6:
                    _context2.next = 8;
                    return (0, _effects.fork)(_FollowSaga.loadFollows, 'getFollowersAsync', username, 'blog');

                case 8:
                    _context2.next = 10;
                    return (0, _effects.fork)(_FollowSaga.loadFollows, 'getFollowingAsync', username, 'blog');

                case 10:
                    _context2.next = 12;
                    return (0, _effects.select)(function (state) {
                        return state.offchain.get('server_location');
                    });

                case 12:
                    server_location = _context2.sent;
                    ignore_fetch = pathname === server_location && is_initial_state;

                    is_initial_state = false;

                    if (!ignore_fetch) {
                        _context2.next = 17;
                        break;
                    }

                    return _context2.abrupt('return');

                case 17:
                    url = '' + pathname;

                    if (url === '/') url = 'trending';
                    // Replace /curation-rewards and /author-rewards with /transfers for UserProfile
                    // to resolve data correctly
                    if (url.indexOf('/curation-rewards') !== -1) url = url.replace('/curation-rewards', '/transfers');
                    if (url.indexOf('/author-rewards') !== -1) url = url.replace('/author-rewards', '/transfers');

                    _context2.next = 23;
                    return (0, _effects.put)(appActions.fetchDataBegin());

                case 23:
                    _context2.prev = 23;
                    _context2.next = 26;
                    return (0, _effects.call)(_steemApi.getStateAsync, url);

                case 26:
                    state = _context2.sent;
                    _context2.next = 29;
                    return (0, _effects.put)(globalActions.receiveState(state));

                case 29:
                    _context2.next = 31;
                    return (0, _effects.call)(syncSpecialPosts);

                case 31:
                    _context2.next = 38;
                    break;

                case 33:
                    _context2.prev = 33;
                    _context2.t0 = _context2['catch'](23);

                    console.error('~~ Saga fetchState error ~~>', url, _context2.t0);
                    _context2.next = 38;
                    return (0, _effects.put)(appActions.steemApiError(_context2.t0.message));

                case 38:
                    _context2.next = 40;
                    return (0, _effects.put)(appActions.fetchDataEnd());

                case 40:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this, [[23, 33]]);
}

function syncSpecialPosts() {
    var specialPosts, seenFeaturedPosts, seenPromotedPosts;
    return _regenerator2.default.wrap(function syncSpecialPosts$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    if (process.env.BROWSER) {
                        _context3.next = 2;
                        break;
                    }

                    return _context3.abrupt('return', null);

                case 2:
                    _context3.next = 4;
                    return (0, _effects.select)(function (state) {
                        return state.offchain.get('special_posts');
                    });

                case 4:
                    specialPosts = _context3.sent;


                    // Mark seen featured posts.
                    seenFeaturedPosts = specialPosts.get('featured_posts').map(function (post) {
                        var id = post.get('author') + '/' + post.get('permlink');
                        return post.set('seen', localStorage.getItem('featured-post-seen:' + id) === 'true');
                    });

                    // Mark seen promoted posts.

                    seenPromotedPosts = specialPosts.get('promoted_posts').map(function (post) {
                        var id = post.get('author') + '/' + post.get('permlink');
                        return post.set('seen', localStorage.getItem('promoted-post-seen:' + id) === 'true');
                    });

                    // Look up seen post URLs.

                    _context3.next = 9;
                    return (0, _effects.put)(globalActions.syncSpecialPosts({
                        featuredPosts: seenFeaturedPosts,
                        promotedPosts: seenPromotedPosts
                    }));

                case 9:

                    // Mark all featured posts as seen.
                    specialPosts.get('featured_posts').forEach(function (post) {
                        var id = post.get('author') + '/' + post.get('permlink');
                        localStorage.setItem('featured-post-seen:' + id, 'true');
                    });

                    // Mark all promoted posts as seen.
                    specialPosts.get('promoted_posts').forEach(function (post) {
                        var id = post.get('author') + '/' + post.get('permlink');
                        localStorage.setItem('promoted-post-seen:' + id, 'true');
                    });

                case 11:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked3, this);
}

/**
 * Request account data for a set of usernames.
 *
 * @todo batch the put()s
 *
 * @param {Iterable} usernames
 */
function getAccounts(usernames) {
    var accounts;
    return _regenerator2.default.wrap(function getAccounts$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    _context4.next = 2;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getAccountsAsync], usernames);

                case 2:
                    accounts = _context4.sent;
                    _context4.next = 5;
                    return (0, _effects.put)(globalActions.receiveAccounts({ accounts: accounts }));

                case 5:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked4, this);
}

function fetchData(action) {
    var _action$payload, order, author, permlink, accountname, postFilter, category, call_name, args, firstPermlink, fetched, endOfData, fetchLimitReached, fetchDone, batch, data, lastValue;

    return _regenerator2.default.wrap(function fetchData$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    _action$payload = action.payload, order = _action$payload.order, author = _action$payload.author, permlink = _action$payload.permlink, accountname = _action$payload.accountname, postFilter = _action$payload.postFilter;
                    category = action.payload.category;

                    if (!category) category = '';
                    category = category.toLowerCase();

                    _context5.next = 6;
                    return (0, _effects.put)(globalActions.fetchingData({ order: order, category: category }));

                case 6:
                    call_name = void 0, args = void 0;

                    if (order === 'trending') {
                        call_name = 'getDiscussionsByTrendingAsync';
                        args = [{
                            tag: category,
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else if (order === 'hot') {
                        call_name = 'getDiscussionsByHotAsync';
                        args = [{
                            tag: category,
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else if (order === 'promoted') {
                        call_name = 'getDiscussionsByPromotedAsync';
                        args = [{
                            tag: category,
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else if (order === 'payout') {
                        call_name = 'getPostDiscussionsByPayoutAsync';
                        args = [{
                            tag: category,
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else if (order === 'payout_comments') {
                        call_name = 'getCommentDiscussionsByPayoutAsync';
                        args = [{
                            tag: category,
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else if (order === 'created') {
                        call_name = 'getDiscussionsByCreatedAsync';
                        args = [{
                            tag: category,
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else if (order === 'by_replies') {
                        call_name = 'getRepliesByLastUpdateAsync';
                        args = [author, permlink, _constants2.default.FETCH_DATA_BATCH_SIZE];
                    } else if (order === 'by_feed') {
                        // https://github.com/steemit/steem/issues/249
                        call_name = 'getDiscussionsByFeedAsync';
                        args = [{
                            tag: accountname,
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else if (order === 'by_author') {
                        call_name = 'getDiscussionsByBlogAsync';
                        args = [{
                            tag: accountname,
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else if (order === 'by_comments') {
                        call_name = 'getDiscussionsByCommentsAsync';
                        args = [{
                            limit: _constants2.default.FETCH_DATA_BATCH_SIZE,
                            start_author: author,
                            start_permlink: permlink
                        }];
                    } else {
                        // this should never happen. undefined behavior
                        call_name = 'getDiscussionsByTrendingAsync';
                        args = [{ limit: _constants2.default.FETCH_DATA_BATCH_SIZE }];
                    }
                    _context5.next = 10;
                    return (0, _effects.put)(appActions.fetchDataBegin());

                case 10:
                    _context5.prev = 10;
                    firstPermlink = permlink;
                    fetched = 0;
                    endOfData = false;
                    fetchLimitReached = false;
                    fetchDone = false;
                    batch = 0;

                case 17:
                    if (fetchDone) {
                        _context5.next = 32;
                        break;
                    }

                    _context5.next = 20;
                    return _effects.call.apply(undefined, [[_steemJs.api, _steemJs.api[call_name]]].concat((0, _toConsumableArray3.default)(args)));

                case 20:
                    data = _context5.sent;


                    endOfData = data.length < _constants2.default.FETCH_DATA_BATCH_SIZE;

                    batch++;
                    fetchLimitReached = batch >= _constants2.default.MAX_BATCHES;

                    // next arg. Note 'by_replies' does not use same structure.
                    lastValue = data.length > 0 ? data[data.length - 1] : null;

                    if (lastValue && order !== 'by_replies') {
                        args[0].start_author = lastValue.author;
                        args[0].start_permlink = lastValue.permlink;
                    }

                    // Still return all data but only count ones matching the filter.
                    // Rely on UI to actually hide the posts.
                    fetched += postFilter ? data.filter(postFilter).length : data.length;

                    fetchDone = endOfData || fetchLimitReached || fetched >= _constants2.default.FETCH_DATA_BATCH_SIZE;

                    _context5.next = 30;
                    return (0, _effects.put)(globalActions.receiveData({
                        data: data,
                        order: order,
                        category: category,
                        author: author,
                        firstPermlink: firstPermlink,
                        accountname: accountname,
                        fetching: !fetchDone,
                        endOfData: endOfData
                    }));

                case 30:
                    _context5.next = 17;
                    break;

                case 32:
                    _context5.next = 39;
                    break;

                case 34:
                    _context5.prev = 34;
                    _context5.t0 = _context5['catch'](10);

                    console.error('~~ Saga fetchData error ~~>', call_name, args, _context5.t0);
                    _context5.next = 39;
                    return (0, _effects.put)(appActions.steemApiError(_context5.t0.message));

                case 39:
                    _context5.next = 41;
                    return (0, _effects.put)(appActions.fetchDataEnd());

                case 41:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _marked5, this, [[10, 34]]);
}

// export function* watchMetaRequests() {
//     yield* takeLatest('global/REQUEST_META', fetchMeta);
// }
function fetchMeta(_ref) {
    var _ref$payload = _ref.payload,
        id = _ref$payload.id,
        link = _ref$payload.link;

    var metaArray, title, metaTags, meta, i, _metaTags$i, name, content;

    return _regenerator2.default.wrap(function fetchMeta$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    _context6.prev = 0;
                    _context6.next = 3;
                    return (0, _effects.call)(function () {
                        return new _promise2.default(function (resolve, reject) {
                            function reqListener() {
                                var resp = JSON.parse(this.responseText);
                                if (resp.error) {
                                    reject(resp.error);
                                    return;
                                }
                                resolve(resp);
                            }
                            var oReq = new XMLHttpRequest();
                            oReq.addEventListener('load', reqListener);
                            oReq.open('GET', '/http_metadata/' + link);
                            oReq.send();
                        });
                    });

                case 3:
                    metaArray = _context6.sent;
                    title = metaArray.title, metaTags = metaArray.metaTags;
                    meta = { title: title };

                    for (i = 0; i < metaTags.length; i++) {
                        _metaTags$i = (0, _slicedToArray3.default)(metaTags[i], 2), name = _metaTags$i[0], content = _metaTags$i[1];

                        meta[name] = content;
                    }
                    // http://postimg.org/image/kbefrpbe9/
                    meta = {
                        link: link,
                        card: meta['twitter:card'],
                        site: meta['twitter:site'], // @username tribbute
                        title: meta['twitter:title'],
                        description: meta['twitter:description'],
                        image: meta['twitter:image'],
                        alt: meta['twitter:alt']
                    };
                    if (!meta.image) {
                        meta.image = meta['twitter:image:src'];
                    }
                    _context6.next = 11;
                    return (0, _effects.put)(globalActions.receiveMeta({ id: id, meta: meta }));

                case 11:
                    _context6.next = 17;
                    break;

                case 13:
                    _context6.prev = 13;
                    _context6.t0 = _context6['catch'](0);
                    _context6.next = 17;
                    return (0, _effects.put)(globalActions.receiveMeta({ id: id, meta: { error: _context6.t0 } }));

                case 17:
                case 'end':
                    return _context6.stop();
            }
        }
    }, _marked6, this, [[0, 13]]);
}

/**
    @arg {string} id unique key for result global['fetchJson_' + id]
    @arg {string} url
    @arg {object} body (for JSON.stringify)
*/
function fetchJson(_ref2) {
    var _ref2$payload = _ref2.payload,
        id = _ref2$payload.id,
        url = _ref2$payload.url,
        body = _ref2$payload.body,
        successCallback = _ref2$payload.successCallback,
        _ref2$payload$skipLoa = _ref2$payload.skipLoading,
        skipLoading = _ref2$payload$skipLoa === undefined ? false : _ref2$payload$skipLoa;
    var payload, result;
    return _regenerator2.default.wrap(function fetchJson$(_context7) {
        while (1) {
            switch (_context7.prev = _context7.next) {
                case 0:
                    _context7.prev = 0;
                    payload = {
                        method: body ? 'POST' : 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: body ? (0, _stringify2.default)(body) : undefined
                    };
                    _context7.next = 4;
                    return skipLoading ? fetch(url, payload) : (0, _effects.call)(fetch, url, payload);

                case 4:
                    result = _context7.sent;
                    _context7.next = 7;
                    return result.json();

                case 7:
                    result = _context7.sent;

                    if (successCallback) result = successCallback(result);
                    _context7.next = 11;
                    return (0, _effects.put)(globalActions.fetchJsonResult({ id: id, result: result }));

                case 11:
                    _context7.next = 18;
                    break;

                case 13:
                    _context7.prev = 13;
                    _context7.t0 = _context7['catch'](0);

                    console.error('fetchJson', _context7.t0);
                    _context7.next = 18;
                    return (0, _effects.put)(globalActions.fetchJsonResult({ id: id, error: _context7.t0 }));

                case 18:
                case 'end':
                    return _context7.stop();
            }
        }
    }, _marked7, this, [[0, 13]]);
}

// Action creators
var actions = exports.actions = {
    requestData: function requestData(payload) {
        return {
            type: REQUEST_DATA,
            payload: payload
        };
    },

    getContent: function getContent(payload) {
        return {
            type: GET_CONTENT,
            payload: payload
        };
    },

    fetchState: function fetchState(payload) {
        return {
            type: FETCH_STATE,
            payload: payload
        };
    }
};