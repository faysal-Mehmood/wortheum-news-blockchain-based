'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _App = require('app/components/App');

var _App2 = _interopRequireDefault(_App);

var _Benchmark = require('app/components/pages/Benchmark');

var _Benchmark2 = _interopRequireDefault(_Benchmark);

var _PostsIndex = require('app/components/pages/PostsIndex');

var _PostsIndex2 = _interopRequireDefault(_PostsIndex);

var _ResolveRoute = require('./ResolveRoute');

var _ResolveRoute2 = _interopRequireDefault(_ResolveRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = function (d, c) {
    return c(require);
};

exports.default = {
    path: '/',
    component: _App2.default,
    getChildRoutes: function getChildRoutes(nextState, cb) {
        var route = (0, _ResolveRoute2.default)(nextState.location.pathname);
        if (route.page === 'About') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/About')]);
            //});
        } else if (route.page === 'Welcome') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/Welcome')]);
            //});
        } else if (route.page === 'Faq') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/Faq')]);
            //});
        } else if (route.page === 'Login') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/Login')]);
            //});
        } else if (route.page === 'Privacy') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/Privacy')]);
            //});
        } else if (route.page === 'Support') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/Support')]);
            //});
        } else if (route.page === 'XSSTest' && process.env.NODE_ENV === 'development') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/XSS')]);
            //});
        } else if (route.page === 'Benchmark') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/Benchmark')]);
            //});
        } else if (route.page === 'Tags') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/TagsIndex')]);
            //});
        } else if (route.page === 'Tos') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/Tos')]);
            //});
        } else if (route.page === 'ChangePassword') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/ChangePasswordPage')]);
            //});
        } else if (route.page === 'RecoverAccountStep1') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/RecoverAccountStep1')]);
            //});
        } else if (route.page === 'Witnesses') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/Witnesses')]);
            //});
        } else if (route.page === 'SubmitPost') {
            if (process.env.BROWSER) {
                // require.ensure([], (require) => {
                cb(null, [require('app/components/pages/SubmitPost')]);
                // });
            } else {
                cb(null, [require('app/components/pages/SubmitPostServerRender')]);
            }
        } else if (route.page === 'UserProfile') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/UserProfile')]);
            //});
        } else if (route.page === 'Market') {
            require.ensure([], function (require) {
                cb(null, [require('app/components/pages/Market')]);
            });
        } else if (route.page === 'Post') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/PostPage')]);
            //});
        } else if (route.page === 'PostNoCategory') {
            cb(null, [require('app/components/pages/PostPageNoCategory')]);
        } else if (route.page === 'PostsIndex') {
            //require.ensure([], (require) => {
            //cb(null, [require('app/components/pages/PostsIndex')]);
            cb(null, [_PostsIndex2.default]);
            //});
        } else {
            //require.ensure([], (require) => {
            cb(process.env.BROWSER ? null : Error(404), [require('app/components/pages/NotFound')]);
            //});
        }
    },

    indexRoute: {
        component: _PostsIndex2.default.component
    }
};