'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = useGeneralApi;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _misc = require('server/utils/misc');

var _coBody = require('co-body');

var _coBody2 = _interopRequireDefault(_coBody);

var _mixpanel = require('mixpanel');

var _mixpanel2 = _interopRequireDefault(_mixpanel);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _steemJs = require('@steemit/steem-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global $STM_Config */
var ACCEPTED_TOS_TAG = 'accepted_tos_20180614';

var mixpanel = _config2.default.get('mixpanel') ? _mixpanel2.default.init(_config2.default.get('mixpanel')) : null;

var _stringval = function _stringval(v) {
    return typeof v === 'string' ? v : (0, _stringify2.default)(v);
};
function logRequest(path, ctx, extra) {
    var d = { ip: (0, _misc.getRemoteIp)(ctx.req) };
    if (ctx.session) {
        if (ctx.session.user) {
            d.user = ctx.session.user;
        }
        if (ctx.session.uid) {
            d.uid = ctx.session.uid;
        }
        if (ctx.session.a) {
            d.account = ctx.session.a;
        }
    }
    if (extra) {
        (0, _keys2.default)(extra).forEach(function (k) {
            var nk = d[k] ? '_' + k : k;
            d[nk] = extra[k];
        });
    }
    var info = (0, _keys2.default)(d).map(function (k) {
        return k + '=' + _stringval(d[k]);
    }).join(' ');
    console.log('-- /' + path + ' --> ' + info);
}

function useGeneralApi(app) {
    var router = (0, _koaRouter2.default)({ prefix: '/api/v1' });
    app.use(router.routes());
    var koaBody = (0, _koaBody2.default)();

    router.post('/login_account', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this = this;

        var params, _ref, csrf, account, signatures, _ref2, _ref3, chainAccount, auth, bufSha, verify, _chainAccount$posting, _chainAccount$posting2, _chainAccount$posting3, posting_pubkey, weight, weight_threshold, remote_ip;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // if (rateLimitReq(this, this.req)) return;
                        params = this.request.body;
                        _ref = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref.csrf, account = _ref.account, signatures = _ref.signatures;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return');

                    case 4:

                        logRequest('login_account', this, { account: account });
                        _context.prev = 5;

                        if (!signatures) {
                            _context.next = 17;
                            break;
                        }

                        if (this.session.login_challenge) {
                            _context.next = 11;
                            break;
                        }

                        console.error('/login_account missing this.session.login_challenge');
                        _context.next = 17;
                        break;

                    case 11:
                        _context.next = 13;
                        return _steemJs.api.getAccountsAsync([account]);

                    case 13:
                        _ref2 = _context.sent;
                        _ref3 = (0, _slicedToArray3.default)(_ref2, 1);
                        chainAccount = _ref3[0];

                        if (!chainAccount) {
                            console.error('/login_account missing blockchain account', account);
                        } else {
                            auth = { posting: false };
                            bufSha = _ecc.hash.sha256((0, _stringify2.default)({ token: this.session.login_challenge }, null, 0));

                            verify = function verify(type, sigHex, pubkey, weight, weight_threshold) {
                                if (!sigHex) return;
                                if (weight !== 1 || weight_threshold !== 1) {
                                    console.error('/login_account login_challenge unsupported ' + type + ' auth configuration: ' + account);
                                } else {
                                    var sig = parseSig(sigHex);
                                    var public_key = _ecc.PublicKey.fromString(pubkey);
                                    var verified = sig.verifyHash(bufSha, public_key);
                                    if (!verified) {
                                        console.error('/login_account verification failed', _this.session.uid, account, pubkey);
                                    }
                                    auth[type] = verified;
                                }
                            };

                            _chainAccount$posting = chainAccount.posting, _chainAccount$posting2 = (0, _slicedToArray3.default)(_chainAccount$posting.key_auths, 1), _chainAccount$posting3 = (0, _slicedToArray3.default)(_chainAccount$posting2[0], 2), posting_pubkey = _chainAccount$posting3[0], weight = _chainAccount$posting3[1], weight_threshold = _chainAccount$posting.weight_threshold;

                            verify('posting', signatures.posting, posting_pubkey, weight, weight_threshold);
                            if (auth.posting) this.session.a = account;
                        }

                    case 17:

                        this.body = (0, _stringify2.default)({
                            status: 'ok'
                        });
                        remote_ip = (0, _misc.getRemoteIp)(this.req);

                        if (mixpanel) {
                            mixpanel.people.set(this.session.uid, {
                                ip: remote_ip,
                                $ip: remote_ip
                            });
                            mixpanel.people.increment(this.session.uid, 'Logins', 1);
                        }
                        _context.next = 27;
                        break;

                    case 22:
                        _context.prev = 22;
                        _context.t0 = _context['catch'](5);

                        console.error('Error in /login_account api call', this.session.uid, _context.t0.message);
                        this.body = (0, _stringify2.default)({
                            error: _context.t0.message
                        });
                        this.status = 500;

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[5, 22]]);
    }));

    router.post('/logout_account', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var params, _ref4, csrf;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        // if (rateLimitReq(this, this.req)) return; - logout maybe immediately followed with login_attempt event
                        params = this.request.body;
                        _ref4 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref4.csrf;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context2.next = 4;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 4:
                        logRequest('logout_account', this);
                        try {
                            this.session.a = null;
                            this.body = (0, _stringify2.default)({ status: 'ok' });
                        } catch (error) {
                            console.error('Error in /logout_account api call', this.session.uid, error);
                            this.body = (0, _stringify2.default)({ error: error.message });
                            this.status = 500;
                        }

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    router.post('/csp_violation', /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var params, csp_report, value;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!(0, _misc.rateLimitReq)(this, this.req)) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 2:
                        params = void 0;
                        _context3.prev = 3;
                        _context3.next = 6;
                        return (0, _coBody2.default)(this);

                    case 6:
                        params = _context3.sent;
                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](3);

                        console.log('-- /csp_violation error -->', _context3.t0);

                    case 12:
                        if (params && params['csp-report']) {
                            csp_report = params['csp-report'];
                            value = csp_report['document-uri'] + ' : ' + csp_report['blocked-uri'];

                            console.log('-- /csp_violation -->', value, '--', this.req.headers['user-agent']);
                        } else {
                            console.log('-- /csp_violation [no csp-report] -->', params, '--', this.req.headers['user-agent']);
                        }
                        this.body = '';

                    case 14:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[3, 9]]);
    }));

    router.post('/setUserPreferences', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var params, _ref5, csrf, payload, json;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        params = this.request.body;
                        _ref5 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref5.csrf, payload = _ref5.payload;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context4.next = 4;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 4:
                        console.log('-- /setUserPreferences -->', this.session.user, this.session.uid, payload);

                        if (this.session.a) {
                            _context4.next = 9;
                            break;
                        }

                        this.body = 'missing logged in account';
                        this.status = 500;
                        return _context4.abrupt('return');

                    case 9:
                        _context4.prev = 9;
                        json = (0, _stringify2.default)(payload);

                        if (!(json.length > 1024)) {
                            _context4.next = 13;
                            break;
                        }

                        throw new Error('the data is too long');

                    case 13:
                        this.session.user_prefs = json;
                        this.body = (0, _stringify2.default)({ status: 'ok' });
                        _context4.next = 22;
                        break;

                    case 17:
                        _context4.prev = 17;
                        _context4.t0 = _context4['catch'](9);

                        console.error('Error in /setUserPreferences api call', this.session.uid, _context4.t0);
                        this.body = (0, _stringify2.default)({ error: _context4.t0.message });
                        this.status = 500;

                    case 22:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[9, 17]]);
    }));

    router.post('/isTosAccepted', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var params, _ref6, csrf, res;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        params = this.request.body;
                        _ref6 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref6.csrf;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context5.next = 4;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 4:

                        this.body = '{}';
                        this.status = 200;

                        if (this.session.a) {
                            _context5.next = 10;
                            break;
                        }

                        this.body = 'missing username';
                        this.status = 500;
                        return _context5.abrupt('return');

                    case 10:
                        _context5.prev = 10;
                        _context5.next = 13;
                        return _steemJs.api.signedCallAsync('conveyor.get_tags_for_user', [this.session.a], _config2.default.get('conveyor_username'), _config2.default.get('conveyor_posting_wif'));

                    case 13:
                        res = _context5.sent;


                        this.body = (0, _stringify2.default)(res.includes(ACCEPTED_TOS_TAG));
                        _context5.next = 22;
                        break;

                    case 17:
                        _context5.prev = 17;
                        _context5.t0 = _context5['catch'](10);

                        console.error('Error in /isTosAccepted api call', this.session.a, _context5.t0);
                        this.body = (0, _stringify2.default)({ error: _context5.t0.message });
                        this.status = 500;

                    case 22:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[10, 17]]);
    }));

    router.post('/acceptTos', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var params, _ref7, csrf;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        params = this.request.body;
                        _ref7 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref7.csrf;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context6.next = 4;
                            break;
                        }

                        return _context6.abrupt('return');

                    case 4:
                        if (this.session.a) {
                            _context6.next = 8;
                            break;
                        }

                        this.body = 'missing logged in account';
                        this.status = 500;
                        return _context6.abrupt('return');

                    case 8:
                        _context6.prev = 8;
                        _context6.next = 11;
                        return _steemJs.api.signedCallAsync('conveyor.assign_tag', {
                            uid: this.session.a,
                            tag: ACCEPTED_TOS_TAG
                        }, _config2.default.get('conveyor_username'), _config2.default.get('conveyor_posting_wif'));

                    case 11:
                        this.body = (0, _stringify2.default)({ status: 'ok' });
                        _context6.next = 19;
                        break;

                    case 14:
                        _context6.prev = 14;
                        _context6.t0 = _context6['catch'](8);

                        console.error('Error in /acceptTos api call', this.session.uid, _context6.t0);
                        this.body = (0, _stringify2.default)({ error: _context6.t0.message });
                        this.status = 500;

                    case 19:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[8, 14]]);
    }));
}

var parseSig = function parseSig(hexSig) {
    try {
        return _ecc.Signature.fromHex(hexSig);
    } catch (e) {
        return null;
    }
};