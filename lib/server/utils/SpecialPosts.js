'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.specialPosts = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

/**
 * [async] Get special posts - including notices, featured, and promoted.
 *
 * @returns {object} object of {featured_posts:[], promoted_posts:[], notices:[]}
 */
var specialPosts = exports.specialPosts = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var postData, loadedPostData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, _url$split$1$split, _url$split$1$split2, username, postId, post, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _url, _url$split$1$split3, _url$split$1$split4, _post, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, notice, _notice$permalink$spl, _notice$permalink$spl2, _post2;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.info('Loading special posts');

                        _context.next = 3;
                        return loadSpecialPosts();

                    case 3:
                        postData = _context.sent;

                        console.info('Loading special posts', postData);
                        loadedPostData = {
                            featured_posts: [],
                            promoted_posts: [],
                            notices: []
                        };
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 9;
                        _iterator = (0, _getIterator3.default)(postData.featured_posts);

                    case 11:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 22;
                            break;
                        }

                        url = _step.value;
                        _url$split$1$split = url.split('@')[1].split('/'), _url$split$1$split2 = (0, _slicedToArray3.default)(_url$split$1$split, 2), username = _url$split$1$split2[0], postId = _url$split$1$split2[1];
                        _context.next = 16;
                        return steem.api.getContentAsync(username, postId);

                    case 16:
                        post = _context.sent;

                        post.special = true;
                        loadedPostData.featured_posts.push(post);

                    case 19:
                        _iteratorNormalCompletion = true;
                        _context.next = 11;
                        break;

                    case 22:
                        _context.next = 28;
                        break;

                    case 24:
                        _context.prev = 24;
                        _context.t0 = _context['catch'](9);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 28:
                        _context.prev = 28;
                        _context.prev = 29;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 31:
                        _context.prev = 31;

                        if (!_didIteratorError) {
                            _context.next = 34;
                            break;
                        }

                        throw _iteratorError;

                    case 34:
                        return _context.finish(31);

                    case 35:
                        return _context.finish(28);

                    case 36:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 39;
                        _iterator2 = (0, _getIterator3.default)(postData.promoted_posts);

                    case 41:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context.next = 52;
                            break;
                        }

                        _url = _step2.value;
                        _url$split$1$split3 = _url.split('@')[1].split('/'), _url$split$1$split4 = (0, _slicedToArray3.default)(_url$split$1$split3, 2), username = _url$split$1$split4[0], postId = _url$split$1$split4[1];
                        _context.next = 46;
                        return steem.api.getContentAsync(username, postId);

                    case 46:
                        _post = _context.sent;

                        _post.special = true;
                        loadedPostData.promoted_posts.push(_post);

                    case 49:
                        _iteratorNormalCompletion2 = true;
                        _context.next = 41;
                        break;

                    case 52:
                        _context.next = 58;
                        break;

                    case 54:
                        _context.prev = 54;
                        _context.t1 = _context['catch'](39);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t1;

                    case 58:
                        _context.prev = 58;
                        _context.prev = 59;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 61:
                        _context.prev = 61;

                        if (!_didIteratorError2) {
                            _context.next = 64;
                            break;
                        }

                        throw _iteratorError2;

                    case 64:
                        return _context.finish(61);

                    case 65:
                        return _context.finish(58);

                    case 66:
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context.prev = 69;
                        _iterator3 = (0, _getIterator3.default)(postData.notices);

                    case 71:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context.next = 85;
                            break;
                        }

                        notice = _step3.value;

                        if (!notice.permalink) {
                            _context.next = 81;
                            break;
                        }

                        _notice$permalink$spl = notice.permalink.split('@')[1].split('/'), _notice$permalink$spl2 = (0, _slicedToArray3.default)(_notice$permalink$spl, 2), username = _notice$permalink$spl2[0], postId = _notice$permalink$spl2[1];
                        _context.next = 77;
                        return steem.api.getContentAsync(username, postId);

                    case 77:
                        _post2 = _context.sent;

                        loadedPostData.notices.push((0, _assign2.default)({}, notice, _post2));
                        _context.next = 82;
                        break;

                    case 81:
                        loadedPostData.notices.push(notice);

                    case 82:
                        _iteratorNormalCompletion3 = true;
                        _context.next = 71;
                        break;

                    case 85:
                        _context.next = 91;
                        break;

                    case 87:
                        _context.prev = 87;
                        _context.t2 = _context['catch'](69);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context.t2;

                    case 91:
                        _context.prev = 91;
                        _context.prev = 92;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 94:
                        _context.prev = 94;

                        if (!_didIteratorError3) {
                            _context.next = 97;
                            break;
                        }

                        throw _iteratorError3;

                    case 97:
                        return _context.finish(94);

                    case 98:
                        return _context.finish(91);

                    case 99:

                        console.info('Loaded special posts: featured: ' + loadedPostData.featured_posts.length + ', promoted: ' + loadedPostData.promoted_posts.length + ', notices: ' + loadedPostData.notices.length);

                        return _context.abrupt('return', loadedPostData);

                    case 101:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[9, 24, 28, 36], [29,, 31, 35], [39, 54, 58, 66], [59,, 61, 65], [69, 87, 91, 99], [92,, 94, 98]]);
    }));

    return function specialPosts() {
        return _ref.apply(this, arguments);
    };
}();

var _config = require('config');

var config = _interopRequireWildcard(_config);

var _https = require('https');

var https = _interopRequireWildcard(_https);

var _steemJs = require('@steemit/steem-js');

var steem = _interopRequireWildcard(_steemJs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load special posts - including notices, featured, and promoted.
 *
 * @returns {promise} resolves to object of {featured_posts:[], promoted_posts:[], notices:[]}
 */
function loadSpecialPosts() {
    return new _promise2.default(function (resolve, reject) {
        var emptySpecialPosts = {
            featured_posts: [],
            promoted_posts: [],
            notices: []
        };

        if (!config.special_posts_url) {
            resolve(emptySpecialPosts);
            return;
        }

        var request = https.get(config.special_posts_url, function (resp) {
            var data = '';
            resp.on('data', function (chunk) {
                data += chunk;
            });
            resp.on('end', function () {
                var json = JSON.parse(data);
                console.info('Received special posts payload', json);
                if (json === Object(json)) {
                    resolve(json);
                }
            });
        });

        request.on('error', function (e) {
            console.error('Could not load special posts', e);
            resolve(emptySpecialPosts);
        });
    });
}