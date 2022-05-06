'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transactionWatches = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.broadcastOperation = broadcastOperation;
exports.preBroadcast_comment = preBroadcast_comment;
exports.createPermlink = createPermlink;
exports.createPatch = createPatch;

var _effects = require('redux-saga/effects');

var _immutable = require('immutable');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _speakingurl = require('speakingurl');

var _speakingurl2 = _interopRequireDefault(_speakingurl);

var _bs = require('bs58');

var _bs2 = _interopRequireDefault(_bs);

var _secureRandom = require('secure-random');

var _secureRandom2 = _interopRequireDefault(_secureRandom);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _steemJs = require('@steemit/steem-js');

var _SagaShared = require('app/redux/SagaShared');

var _AuthSaga = require('app/redux/AuthSaga');

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _client_config = require('app/client_config');

var _ServerApiClient = require('app/utils/ServerApiClient');

var _SteemKeychain = require('app/utils/SteemKeychain');

var _diffMatchPatch = require('diff-match-patch');

var _diffMatchPatch2 = _interopRequireDefault(_diffMatchPatch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(preBroadcast_vote),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(broadcastOperation),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(broadcastPayload),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(accepted_comment),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(accepted_custom_json),
    _marked6 = /*#__PURE__*/_regenerator2.default.mark(accepted_delete_comment),
    _marked7 = /*#__PURE__*/_regenerator2.default.mark(accepted_vote),
    _marked8 = /*#__PURE__*/_regenerator2.default.mark(preBroadcast_comment),
    _marked9 = /*#__PURE__*/_regenerator2.default.mark(createPermlink),
    _marked10 = /*#__PURE__*/_regenerator2.default.mark(error_custom_json),
    _marked11 = /*#__PURE__*/_regenerator2.default.mark(error_vote);

var transactionWatches = exports.transactionWatches = [(0, _effects.takeEvery)(transactionActions.BROADCAST_OPERATION, broadcastOperation)];

var hook = {
    preBroadcast_comment: preBroadcast_comment,
    preBroadcast_vote: preBroadcast_vote,
    error_vote: error_vote,
    error_custom_json: error_custom_json,
    accepted_comment: accepted_comment,
    accepted_custom_json: accepted_custom_json,
    accepted_delete_comment: accepted_delete_comment,
    accepted_vote: accepted_vote
};

var toStringUtf8 = function toStringUtf8(o) {
    return o ? Buffer.isBuffer(o) ? o.toString('utf-8') : o.toString() : o;
};

function preBroadcast_vote(_ref) {
    var operation = _ref.operation,
        username = _ref.username;
    var voter, author, permlink, weight;
    return _regenerator2.default.wrap(function preBroadcast_vote$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!operation.voter) operation.voter = username;
                    voter = operation.voter, author = operation.author, permlink = operation.permlink, weight = operation.weight;
                    // give immediate feedback

                    _context.next = 4;
                    return (0, _effects.put)(globalActions.set({
                        key: 'transaction_vote_active_' + author + '_' + permlink,
                        value: true
                    }));

                case 4:
                    _context.next = 6;
                    return (0, _effects.put)(globalActions.voted({ username: voter, author: author, permlink: permlink, weight: weight }));

                case 6:
                    return _context.abrupt('return', operation);

                case 7:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

/** Keys, username, and password are not needed for the initial call.  This will check the login and may trigger an action to prompt for the password / key. */
function broadcastOperation(_ref2) {
    var _ref2$payload = _ref2.payload,
        type = _ref2$payload.type,
        operation = _ref2$payload.operation,
        confirm = _ref2$payload.confirm,
        warning = _ref2$payload.warning,
        keys = _ref2$payload.keys,
        username = _ref2$payload.username,
        password = _ref2$payload.password,
        useKeychain = _ref2$payload.useKeychain,
        successCallback = _ref2$payload.successCallback,
        errorCallback = _ref2$payload.errorCallback,
        allowPostUnsafe = _ref2$payload.allowPostUnsafe;

    var operationParam, conf, payload, _confirm, _warning, checkbox, signingKey, eventType, page;

    return _regenerator2.default.wrap(function broadcastOperation$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    operationParam = {
                        type: type,
                        operation: operation,
                        keys: keys,
                        username: username,
                        password: password,
                        useKeychain: useKeychain,
                        successCallback: successCallback,
                        errorCallback: errorCallback,
                        allowPostUnsafe: allowPostUnsafe
                    };

                    console.log('broadcastOperation', operationParam);

                    conf = typeof confirm === 'function' ? confirm() : confirm;

                    if (!conf) {
                        _context2.next = 7;
                        break;
                    }

                    _context2.next = 6;
                    return (0, _effects.put)(transactionActions.confirmOperation({
                        confirm: confirm,
                        warning: warning,
                        operation: operationParam,
                        errorCallback: errorCallback
                    }));

                case 6:
                    return _context2.abrupt('return');

                case 7:
                    payload = {
                        operations: [[type, operation]],
                        keys: keys,
                        username: username,
                        successCallback: successCallback,
                        errorCallback: errorCallback
                    };

                    if (!(!allowPostUnsafe && hasPrivateKeys(payload))) {
                        _context2.next = 16;
                        break;
                    }

                    _confirm = (0, _counterpart2.default)('g.post_key_warning.confirm');
                    _warning = (0, _counterpart2.default)('g.post_key_warning.warning');
                    checkbox = (0, _counterpart2.default)('g.post_key_warning.checkbox');

                    operationParam.allowPostUnsafe = true;
                    _context2.next = 15;
                    return (0, _effects.put)(transactionActions.confirmOperation({
                        confirm: _confirm,
                        warning: _warning,
                        checkbox: checkbox,
                        operation: operationParam,
                        errorCallback: errorCallback
                    }));

                case 15:
                    return _context2.abrupt('return');

                case 16:
                    _context2.prev = 16;

                    if ((0, _SteemKeychain.isLoggedInWithKeychain)()) {
                        _context2.next = 31;
                        break;
                    }

                    if (!(!keys || keys.length === 0)) {
                        _context2.next = 31;
                        break;
                    }

                    payload.keys = [];
                    // user may already be logged in, or just enterend a signing passowrd or wif
                    _context2.next = 22;
                    return (0, _effects.call)(_AuthSaga.findSigningKey, {
                        opType: type,
                        username: username,
                        password: password
                    });

                case 22:
                    signingKey = _context2.sent;

                    if (!signingKey) {
                        _context2.next = 27;
                        break;
                    }

                    payload.keys.push(signingKey);
                    _context2.next = 31;
                    break;

                case 27:
                    if (password) {
                        _context2.next = 31;
                        break;
                    }

                    _context2.next = 30;
                    return (0, _effects.put)(userActions.showLogin({
                        operation: {
                            type: type,
                            operation: operation,
                            username: username,
                            successCallback: successCallback,
                            errorCallback: errorCallback,
                            saveLogin: true
                        }
                    }));

                case 30:
                    return _context2.abrupt('return');

                case 31:
                    _context2.next = 33;
                    return (0, _effects.call)(broadcastPayload, { payload: payload });

                case 33:
                    eventType = type.replace(/^([a-z])/, function (g) {
                        return g.toUpperCase();
                    }).replace(/_([a-z])/g, function (g) {
                        return g[1].toUpperCase();
                    });

                    if (eventType === 'Comment' && !operation.parent_author) eventType = 'Post';
                    page = eventType === 'Vote' ? '@' + operation.author + '/' + operation.permlink : '';

                    (0, _ServerApiClient.serverApiRecordEvent)(eventType, page);
                    _context2.next = 43;
                    break;

                case 39:
                    _context2.prev = 39;
                    _context2.t0 = _context2['catch'](16);

                    console.error('TransactionSage', _context2.t0);
                    if (errorCallback) errorCallback(_context2.t0.toString());

                case 43:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this, [[16, 39]]);
}

function hasPrivateKeys(payload) {
    var blob = (0, _stringify2.default)(payload.operations);
    var m = void 0,
        re = /P?(5[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50})/g;
    while (true) {
        m = re.exec(blob);
        if (m) {
            try {
                _ecc.PrivateKey.fromWif(m[1]); // performs the base58check
                return true;
            } catch (e) {}
        } else {
            break;
        }
    }
    return false;
}

function broadcastPayload(_ref3) {
    var _ref3$payload = _ref3.payload,
        operations = _ref3$payload.operations,
        keys = _ref3$payload.keys,
        username = _ref3$payload.username,
        successCallback = _ref3$payload.successCallback,
        errorCallback = _ref3$payload.errorCallback;

    var needsActiveAuth, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, type, newOps, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, operation, op, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _o, broadcastedEvent, currentUser, currentUsername, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _step5$value, config, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _step6$value;

    return _regenerator2.default.wrap(function broadcastPayload$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    needsActiveAuth = false;

                    // console.log('broadcastPayload')

                    if (!$STM_Config.read_only_mode) {
                        _context3.next = 3;
                        break;
                    }

                    return _context3.abrupt('return');

                case 3:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context3.prev = 6;
                    _iterator = (0, _getIterator3.default)(operations);

                case 8:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context3.next = 16;
                        break;
                    }

                    _step$value = (0, _slicedToArray3.default)(_step.value, 1), type = _step$value[0];
                    _context3.next = 12;
                    return (0, _effects.put)(transactionActions.remove({ key: ['TransactionError', type] }));

                case 12:
                    if (!_AuthSaga.postingOps.has(type)) {
                        needsActiveAuth = true;
                    }

                case 13:
                    _iteratorNormalCompletion = true;
                    _context3.next = 8;
                    break;

                case 16:
                    _context3.next = 22;
                    break;

                case 18:
                    _context3.prev = 18;
                    _context3.t0 = _context3['catch'](6);
                    _didIteratorError = true;
                    _iteratorError = _context3.t0;

                case 22:
                    _context3.prev = 22;
                    _context3.prev = 23;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 25:
                    _context3.prev = 25;

                    if (!_didIteratorError) {
                        _context3.next = 28;
                        break;
                    }

                    throw _iteratorError;

                case 28:
                    return _context3.finish(25);

                case 29:
                    return _context3.finish(22);

                case 30:
                    newOps = [];
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context3.prev = 34;
                    _iterator2 = (0, _getIterator3.default)(operations);

                case 36:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context3.next = 71;
                        break;
                    }

                    _step2$value = (0, _slicedToArray3.default)(_step2.value, 2), type = _step2$value[0], operation = _step2$value[1];

                    if (!hook['preBroadcast_' + type]) {
                        _context3.next = 67;
                        break;
                    }

                    _context3.next = 41;
                    return (0, _effects.call)(hook['preBroadcast_' + type], {
                        operation: operation,
                        username: username
                    });

                case 41:
                    op = _context3.sent;

                    if (!Array.isArray(op)) {
                        _context3.next = 64;
                        break;
                    }

                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context3.prev = 46;
                    for (_iterator3 = (0, _getIterator3.default)(op); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        _o = _step3.value;
                        newOps.push(_o);
                    }_context3.next = 54;
                    break;

                case 50:
                    _context3.prev = 50;
                    _context3.t1 = _context3['catch'](46);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context3.t1;

                case 54:
                    _context3.prev = 54;
                    _context3.prev = 55;

                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }

                case 57:
                    _context3.prev = 57;

                    if (!_didIteratorError3) {
                        _context3.next = 60;
                        break;
                    }

                    throw _iteratorError3;

                case 60:
                    return _context3.finish(57);

                case 61:
                    return _context3.finish(54);

                case 62:
                    _context3.next = 65;
                    break;

                case 64:
                    newOps.push([type, op]);

                case 65:
                    _context3.next = 68;
                    break;

                case 67:
                    newOps.push([type, operation]);

                case 68:
                    _iteratorNormalCompletion2 = true;
                    _context3.next = 36;
                    break;

                case 71:
                    _context3.next = 77;
                    break;

                case 73:
                    _context3.prev = 73;
                    _context3.t2 = _context3['catch'](34);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context3.t2;

                case 77:
                    _context3.prev = 77;
                    _context3.prev = 78;

                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }

                case 80:
                    _context3.prev = 80;

                    if (!_didIteratorError2) {
                        _context3.next = 83;
                        break;
                    }

                    throw _iteratorError2;

                case 83:
                    return _context3.finish(80);

                case 84:
                    return _context3.finish(77);

                case 85:
                    operations = newOps;

                    // status: broadcasting
                    broadcastedEvent = function broadcastedEvent() {
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = (0, _getIterator3.default)(operations), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2),
                                    type = _step4$value[0],
                                    operation = _step4$value[1];

                                if (hook['broadcasted_' + type]) {
                                    try {
                                        hook['broadcasted_' + type]({ operation: operation });
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    };

                    // get username


                    _context3.next = 89;
                    return (0, _effects.select)(function (state) {
                        return state.user.get('current');
                    });

                case 89:
                    currentUser = _context3.sent;
                    currentUsername = currentUser && currentUser.get('username');

                    username = username || currentUsername;

                    _context3.prev = 92;
                    _context3.next = 95;
                    return new _promise2.default(function (resolve, reject) {
                        // Bump transaction (for live UI testing).. Put 0 in now (no effect),
                        // to enable browser's autocomplete and help prevent typos.
                        var env = process.env;
                        var bump = env.BROWSER ? parseInt(localStorage.getItem('bump') || 0) : 0;
                        if (env.BROWSER && bump === 1) {
                            // for testing
                            console.log('TransactionSaga bump(no broadcast) and reject', (0, _stringify2.default)(operations, null, 2));
                            setTimeout(function () {
                                reject(new Error('Testing, fake error'));
                            }, 2000);
                        } else if (env.BROWSER && bump === 2) {
                            // also for testing
                            console.log('TransactionSaga bump(no broadcast) and resolve', (0, _stringify2.default)(operations, null, 2));
                            setTimeout(function () {
                                resolve();
                                broadcastedEvent();
                            }, 2000);
                        } else {
                            if (!(0, _SteemKeychain.isLoggedInWithKeychain)()) {
                                _steemJs.broadcast.send({ extensions: [], operations: operations }, keys, function (err) {
                                    if (err) {
                                        console.error(err);
                                        reject(err);
                                    } else {
                                        broadcastedEvent();
                                        resolve();
                                    }
                                });
                            } else {
                                var authType = needsActiveAuth ? 'active' : 'posting';
                                window.steem_keychain.requestBroadcast(username, operations, authType, function (response) {
                                    if (!response.success) {
                                        reject(response.message);
                                    } else {
                                        broadcastedEvent();
                                        resolve();
                                    }
                                });
                            }
                        }
                    });

                case 95:
                    // status: accepted
                    _iteratorNormalCompletion5 = true;
                    _didIteratorError5 = false;
                    _iteratorError5 = undefined;
                    _context3.prev = 98;
                    _iterator5 = (0, _getIterator3.default)(operations);

                case 100:
                    if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                        _context3.next = 118;
                        break;
                    }

                    _step5$value = (0, _slicedToArray3.default)(_step5.value, 2), type = _step5$value[0], operation = _step5$value[1];

                    if (!hook['accepted_' + type]) {
                        _context3.next = 111;
                        break;
                    }

                    _context3.prev = 103;
                    _context3.next = 106;
                    return (0, _effects.call)(hook['accepted_' + type], { operation: operation });

                case 106:
                    _context3.next = 111;
                    break;

                case 108:
                    _context3.prev = 108;
                    _context3.t3 = _context3['catch'](103);

                    console.error(_context3.t3);

                case 111:
                    config = operation.__config;

                    if (!(config && config.successMessage)) {
                        _context3.next = 115;
                        break;
                    }

                    _context3.next = 115;
                    return (0, _effects.put)(appActions.addNotification({
                        key: 'trx_' + Date.now(),
                        message: config.successMessage,
                        dismissAfter: 5000
                    }));

                case 115:
                    _iteratorNormalCompletion5 = true;
                    _context3.next = 100;
                    break;

                case 118:
                    _context3.next = 124;
                    break;

                case 120:
                    _context3.prev = 120;
                    _context3.t4 = _context3['catch'](98);
                    _didIteratorError5 = true;
                    _iteratorError5 = _context3.t4;

                case 124:
                    _context3.prev = 124;
                    _context3.prev = 125;

                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }

                case 127:
                    _context3.prev = 127;

                    if (!_didIteratorError5) {
                        _context3.next = 130;
                        break;
                    }

                    throw _iteratorError5;

                case 130:
                    return _context3.finish(127);

                case 131:
                    return _context3.finish(124);

                case 132:
                    if (successCallback) try {
                        successCallback();
                    } catch (error) {
                        console.error(error);
                    }
                    _context3.next = 173;
                    break;

                case 135:
                    _context3.prev = 135;
                    _context3.t5 = _context3['catch'](92);

                    console.error('TransactionSaga\tbroadcastPayload', _context3.t5);
                    // status: error
                    _context3.next = 140;
                    return (0, _effects.put)(transactionActions.error({ operations: operations, error: _context3.t5, errorCallback: errorCallback }));

                case 140:
                    _iteratorNormalCompletion6 = true;
                    _didIteratorError6 = false;
                    _iteratorError6 = undefined;
                    _context3.prev = 143;
                    _iterator6 = (0, _getIterator3.default)(operations);

                case 145:
                    if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                        _context3.next = 159;
                        break;
                    }

                    _step6$value = (0, _slicedToArray3.default)(_step6.value, 2), type = _step6$value[0], operation = _step6$value[1];

                    if (!hook['error_' + type]) {
                        _context3.next = 156;
                        break;
                    }

                    _context3.prev = 148;
                    _context3.next = 151;
                    return (0, _effects.call)(hook['error_' + type], { operation: operation });

                case 151:
                    _context3.next = 156;
                    break;

                case 153:
                    _context3.prev = 153;
                    _context3.t6 = _context3['catch'](148);

                    console.error(_context3.t6);

                case 156:
                    _iteratorNormalCompletion6 = true;
                    _context3.next = 145;
                    break;

                case 159:
                    _context3.next = 165;
                    break;

                case 161:
                    _context3.prev = 161;
                    _context3.t7 = _context3['catch'](143);
                    _didIteratorError6 = true;
                    _iteratorError6 = _context3.t7;

                case 165:
                    _context3.prev = 165;
                    _context3.prev = 166;

                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }

                case 168:
                    _context3.prev = 168;

                    if (!_didIteratorError6) {
                        _context3.next = 171;
                        break;
                    }

                    throw _iteratorError6;

                case 171:
                    return _context3.finish(168);

                case 172:
                    return _context3.finish(165);

                case 173:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked3, this, [[6, 18, 22, 30], [23,, 25, 29], [34, 73, 77, 85], [46, 50, 54, 62], [55,, 57, 61], [78,, 80, 84], [92, 135], [98, 120, 124, 132], [103, 108], [125,, 127, 131], [143, 161, 165, 173], [148, 153], [166,, 168, 172]]);
}

function accepted_comment(_ref4) {
    var operation = _ref4.operation;
    var author, permlink;
    return _regenerator2.default.wrap(function accepted_comment$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    author = operation.author, permlink = operation.permlink;
                    // update again with new $$ amount from the steemd node

                    _context4.next = 3;
                    return (0, _effects.call)(_SagaShared.getContent, { author: author, permlink: permlink });

                case 3:
                    _context4.next = 5;
                    return (0, _effects.put)(globalActions.linkReply(operation));

                case 5:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked4, this);
}

function updateFollowState(action, following, state) {
    if (action == null) {
        state = state.update('blog_result', (0, _immutable.Set)(), function (r) {
            return r.delete(following);
        });
        state = state.update('ignore_result', (0, _immutable.Set)(), function (r) {
            return r.delete(following);
        });
    } else if (action === 'blog') {
        state = state.update('blog_result', (0, _immutable.Set)(), function (r) {
            return r.add(following);
        });
        state = state.update('ignore_result', (0, _immutable.Set)(), function (r) {
            return r.delete(following);
        });
    } else if (action === 'ignore') {
        state = state.update('ignore_result', (0, _immutable.Set)(), function (r) {
            return r.add(following);
        });
        state = state.update('blog_result', (0, _immutable.Set)(), function (r) {
            return r.delete(following);
        });
    }
    state = state.set('blog_count', state.get('blog_result', (0, _immutable.Set)()).size);
    state = state.set('ignore_count', state.get('ignore_result', (0, _immutable.Set)()).size);
    return state;
}

function accepted_custom_json(_ref5) {
    var operation = _ref5.operation;

    var json, _json$, follower, following, _json$$what, action;

    return _regenerator2.default.wrap(function accepted_custom_json$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    json = JSON.parse(operation.json);

                    if (!(operation.id === 'follow')) {
                        _context5.next = 13;
                        break;
                    }

                    console.log(operation);
                    _context5.prev = 3;

                    if (!(json[0] === 'follow')) {
                        _context5.next = 8;
                        break;
                    }

                    _json$ = json[1], follower = _json$.follower, following = _json$.following, _json$$what = (0, _slicedToArray3.default)(_json$.what, 1), action = _json$$what[0];
                    _context5.next = 8;
                    return (0, _effects.put)(globalActions.update({
                        key: ['follow', 'getFollowingAsync', follower],
                        notSet: (0, _immutable.Map)(),
                        updater: function updater(m) {
                            return updateFollowState(action, following, m);
                        }
                    }));

                case 8:
                    _context5.next = 13;
                    break;

                case 10:
                    _context5.prev = 10;
                    _context5.t0 = _context5['catch'](3);

                    console.error('TransactionSaga unrecognized follow custom_json format', operation.json);

                case 13:
                    return _context5.abrupt('return', operation);

                case 14:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _marked5, this, [[3, 10]]);
}

function accepted_delete_comment(_ref6) {
    var operation = _ref6.operation;
    return _regenerator2.default.wrap(function accepted_delete_comment$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    _context6.next = 2;
                    return (0, _effects.put)(globalActions.deleteContent(operation));

                case 2:
                case 'end':
                    return _context6.stop();
            }
        }
    }, _marked6, this);
}

function accepted_vote(_ref7) {
    var _ref7$operation = _ref7.operation,
        author = _ref7$operation.author,
        permlink = _ref7$operation.permlink,
        weight = _ref7$operation.weight;
    return _regenerator2.default.wrap(function accepted_vote$(_context7) {
        while (1) {
            switch (_context7.prev = _context7.next) {
                case 0:
                    console.log('Vote accepted, weight', weight, 'on', author + '/' + permlink, 'weight');
                    // update again with new $$ amount from the steemd node
                    _context7.next = 3;
                    return (0, _effects.put)(globalActions.remove({
                        key: 'transaction_vote_active_' + author + '_' + permlink
                    }));

                case 3:
                    _context7.next = 5;
                    return (0, _effects.call)(_SagaShared.getContent, { author: author, permlink: permlink });

                case 5:
                case 'end':
                    return _context7.stop();
            }
        }
    }, _marked7, this);
}

function preBroadcast_comment(_ref8) {
    var operation = _ref8.operation,
        username = _ref8.username;

    var permlink, author, _operation$__config, originalBody, comment_options, _operation$parent_aut, parent_author, _operation$parent_per, parent_permlink, title, body, body2, patch, md, json_metadata, op, comment_op, _comment_options$max_, max_accepted_payout, _comment_options$perc, percent_steem_dollars, _comment_options$allo, allow_votes, _comment_options$allo2, allow_curation_rewards;

    return _regenerator2.default.wrap(function preBroadcast_comment$(_context8) {
        while (1) {
            switch (_context8.prev = _context8.next) {
                case 0:
                    if (!operation.author) operation.author = username;
                    permlink = operation.permlink;
                    author = operation.author, _operation$__config = operation.__config, originalBody = _operation$__config.originalBody, comment_options = _operation$__config.comment_options;
                    _operation$parent_aut = operation.parent_author, parent_author = _operation$parent_aut === undefined ? '' : _operation$parent_aut, _operation$parent_per = operation.parent_permlink, parent_permlink = _operation$parent_per === undefined ? operation.category : _operation$parent_per;
                    title = operation.title;
                    body = operation.body;


                    body = body.trim();

                    // TODO Slightly smaller blockchain comments: if body === json_metadata.steem.link && Object.keys(steem).length > 1 remove steem.link ..This requires an adjust of get_state and the API refresh of the comment to put the steem.link back if Object.keys(steem).length >= 1

                    body2 = void 0;

                    if (originalBody) {
                        patch = createPatch(originalBody, body);
                        // Putting body into buffer will expand Unicode characters into their true length

                        if (patch && patch.length < new Buffer(body, 'utf-8').length) body2 = patch;
                    }
                    if (!body2) body2 = body;

                    if (permlink) {
                        _context8.next = 14;
                        break;
                    }

                    _context8.next = 13;
                    return createPermlink(title, author);

                case 13:
                    permlink = _context8.sent;

                case 14:
                    md = operation.json_metadata;
                    json_metadata = typeof md === 'string' ? md : (0, _stringify2.default)(md);
                    op = (0, _extends3.default)({}, operation, {
                        permlink: permlink.toLowerCase(),
                        parent_author: parent_author,
                        parent_permlink: parent_permlink,
                        json_metadata: json_metadata,
                        title: (operation.title || '').trim(),
                        body: body2
                    });
                    comment_op = [['comment', op]];

                    // comment_options must come directly after comment

                    if (comment_options) {
                        _comment_options$max_ = comment_options.max_accepted_payout, max_accepted_payout = _comment_options$max_ === undefined ? ['1000000.000', _client_config.DEBT_TICKER].join(' ') : _comment_options$max_, _comment_options$perc = comment_options.percent_steem_dollars, percent_steem_dollars = _comment_options$perc === undefined ? 10000 : _comment_options$perc, _comment_options$allo = comment_options.allow_votes, allow_votes = _comment_options$allo === undefined ? true : _comment_options$allo, _comment_options$allo2 = comment_options.allow_curation_rewards, allow_curation_rewards = _comment_options$allo2 === undefined ? true : _comment_options$allo2;

                        comment_op.push(['comment_options', {
                            author: author,
                            permlink: permlink,
                            max_accepted_payout: max_accepted_payout,
                            percent_steem_dollars: percent_steem_dollars,
                            allow_votes: allow_votes,
                            allow_curation_rewards: allow_curation_rewards,
                            extensions: comment_options.extensions ? comment_options.extensions : []
                        }]);
                    }

                    return _context8.abrupt('return', comment_op);

                case 20:
                case 'end':
                    return _context8.stop();
            }
        }
    }, _marked8, this);
}

function createPermlink(title, author) {
    var permlink, s, slugState, noise;
    return _regenerator2.default.wrap(function createPermlink$(_context9) {
        while (1) {
            switch (_context9.prev = _context9.next) {
                case 0:
                    permlink = void 0;

                    if (!(title && title.trim() !== '')) {
                        _context9.next = 12;
                        break;
                    }

                    s = slug(title);

                    if (s === '') {
                        s = _bs2.default.encode(_secureRandom2.default.randomBuffer(4));
                    }
                    // only letters numbers and dashes shall survive
                    s = s.toLowerCase().replace(/[^a-z0-9-]+/g, '');

                    // ensure the permlink is unique
                    _context9.next = 7;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getContentAsync], author, s);

                case 7:
                    slugState = _context9.sent;

                    if (slugState.body !== '') {
                        noise = _bs2.default.encode(_secureRandom2.default.randomBuffer(4)).toLowerCase();

                        permlink = noise + '-' + s;
                    } else {
                        permlink = s;
                    }

                    // ensure permlink conforms to STEEMIT_MAX_PERMLINK_LENGTH
                    if (permlink.length > 255) {
                        permlink = permlink.substring(0, 255);
                    }
                    _context9.next = 13;
                    break;

                case 12:
                    permlink = Math.floor(Date.now() / 1000).toString(36);

                case 13:
                    return _context9.abrupt('return', permlink);

                case 14:
                case 'end':
                    return _context9.stop();
            }
        }
    }, _marked9, this);
}

var dmp = new _diffMatchPatch2.default();

function createPatch(text1, text2) {
    if (!text1 && text1 === '') return undefined;
    var patches = dmp.patch_make(text1, text2);
    var patch = dmp.patch_toText(patches);
    return patch;
}

function error_custom_json(_ref9) {
    var _ref9$operation = _ref9.operation,
        id = _ref9$operation.id,
        required_posting_auths = _ref9$operation.required_posting_auths;
    var follower;
    return _regenerator2.default.wrap(function error_custom_json$(_context10) {
        while (1) {
            switch (_context10.prev = _context10.next) {
                case 0:
                    if (!(id === 'follow')) {
                        _context10.next = 4;
                        break;
                    }

                    follower = required_posting_auths[0];
                    _context10.next = 4;
                    return (0, _effects.put)(globalActions.update({
                        key: ['follow', 'getFollowingAsync', follower, 'loading'],
                        updater: function updater() {
                            return null;
                        }
                    }));

                case 4:
                case 'end':
                    return _context10.stop();
            }
        }
    }, _marked10, this);
}

function error_vote(_ref10) {
    var _ref10$operation = _ref10.operation,
        author = _ref10$operation.author,
        permlink = _ref10$operation.permlink;
    return _regenerator2.default.wrap(function error_vote$(_context11) {
        while (1) {
            switch (_context11.prev = _context11.next) {
                case 0:
                    _context11.next = 2;
                    return (0, _effects.put)(globalActions.remove({
                        key: 'transaction_vote_active_' + author + '_' + permlink
                    }));

                case 2:
                    _context11.next = 4;
                    return (0, _effects.call)(_SagaShared.getContent, { author: author, permlink: permlink });

                case 4:
                case 'end':
                    return _context11.stop();
            }
        }
    }, _marked11, this);
}

// function* error_comment({operation}) {
//     // Rollback an immediate UI update (the transaction had an error)
//     yield put(g.actions.deleteContent(operation))
//     const {author, permlink, parent_author, parent_permlink} = operation
//     yield call(getContent, {author, permlink})
//     if (parent_author !== '' && parent_permlink !== '') {
//         yield call(getContent, {parent_author, parent_permlink})
//     }
// }

function slug(text) {
    return (0, _speakingurl2.default)(text.replace(/[<>]/g, ''), { truncate: 128 });
}