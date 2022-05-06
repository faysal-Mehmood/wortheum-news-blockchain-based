'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GptUtils = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _DomUtils = require('./DomUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GptUtils = function () {
    function GptUtils() {
        (0, _classCallCheck3.default)(this, GptUtils);
    }

    (0, _createClass3.default)(GptUtils, null, [{
        key: 'ShowGptMobileSize',

        /**
         * Should we show the mobile version of an ad?
         *
         * @returns {boolean}
         */
        value: function ShowGptMobileSize() {
            return (0, _DomUtils.getViewportDimensions)().w <= 768;
        }

        /**
         * Naively append-mobile to a given string representing an ad slot name.
         *
         * @param {string} slotName
         * @returns {string}
         */

    }, {
        key: 'MobilizeSlotName',
        value: function MobilizeSlotName(slotName) {
            var mobileSlotAddendum = '';
            if (this.ShowGptMobileSize()) mobileSlotAddendum = '-mobile';
            return '' + slotName + mobileSlotAddendum;
        }
    }]);
    return GptUtils;
}();

exports.GptUtils = GptUtils;