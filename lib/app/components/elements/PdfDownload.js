'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _qrious = require('qrious');

var _qrious2 = _interopRequireDefault(_qrious);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function image2canvas(image, bgcolor) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width * 32;
    canvas.height = image.height * 32;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0.0, 0.0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas;
}

var PdfDownload = function (_Component) {
    (0, _inherits3.default)(PdfDownload, _Component);

    function PdfDownload(props) {
        (0, _classCallCheck3.default)(this, PdfDownload);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PdfDownload.__proto__ || (0, _getPrototypeOf2.default)(PdfDownload)).call(this, props));

        _this.downloadPdf = _this.downloadPdf.bind(_this);
        _this.state = { loaded: false };
        return _this;
    }

    // Generate a list of public and private keys from a master password


    (0, _createClass3.default)(PdfDownload, [{
        key: 'generateKeys',
        value: function generateKeys(name, password) {
            return ['active', 'owner', 'posting', 'memo'].reduce(function (accum, kind, i) {
                var rawKey = _ecc.PrivateKey.fromSeed('' + name + kind + password);
                accum[kind + 'Private'] = rawKey.toString();
                accum[kind + 'Public'] = rawKey.toPublicKey().toString();
                return accum;
            }, { master: password });
        }
    }, {
        key: 'downloadPdf',
        value: function downloadPdf() {
            var keys = this.generateKeys(this.props.name, this.props.password);
            var filename = this.props.name + '_worth_keys.pdf';
            this.renderPdf(keys, filename).save(filename);
        }

        // Generate the canvas, which will be generated into a PDF

    }, {
        key: 'componentDidMount',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                // Load jsPDF. It does not work with webpack, so it must be loaded here.
                                // On the plus side, it is only loaded when the warning page is shown.
                                this.setState({ loaded: false });
                                _context.next = 3;
                                return new _promise2.default(function (res, rej) {
                                    var s = document.createElement('script');
                                    s.type = 'text/javascript';
                                    s.src = 'https://staticfiles.steemit.com/jspdf.min.js';
                                    document.body.appendChild(s);
                                    s.addEventListener('load', res);
                                });

                            case 3:
                                _context.next = 5;
                                return new _promise2.default(function (res, rej) {
                                    var s = document.createElement('script');
                                    s.type = 'text/javascript';
                                    s.src = 'https://staticfiles.steemit.com/Roboto-Regular-normal.js';
                                    document.body.appendChild(s);
                                    s.addEventListener('load', res);
                                });

                            case 5:
                                _context.next = 7;
                                return new _promise2.default(function (res, rej) {
                                    var s = document.createElement('script');
                                    s.type = 'text/javascript';
                                    s.src = 'https://staticfiles.steemit.com/Roboto-Bold-normal.js';
                                    document.body.appendChild(s);
                                    s.addEventListener('load', res);
                                });

                            case 7:
                                _context.next = 9;
                                return new _promise2.default(function (res, rej) {
                                    var s = document.createElement('script');
                                    s.type = 'text/javascript';
                                    s.src = 'https://staticfiles.steemit.com/RobotoMono-Regular-normal.js';
                                    document.body.appendChild(s);
                                    s.addEventListener('load', res);
                                });

                            case 9:
                                this.setState({ loaded: true });

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function componentDidMount() {
                return _ref.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'pdf-download' },
                _react2.default.createElement('img', {
                    src: '/images/pdflogo.svg',
                    style: { display: 'none' },
                    className: 'pdf-logo'
                }),
                this.state.loaded && _react2.default.createElement(
                    'button',
                    {
                        style: { display: 'block' },
                        onClick: function onClick(e) {
                            _this2.downloadPdf();
                            e.preventDefault();
                        }
                    },
                    this.props.label
                )
            );
        }
    }, {
        key: 'renderText',
        value: function renderText(ctx, text, _ref2) {
            var scale = _ref2.scale,
                x = _ref2.x,
                y = _ref2.y,
                lineHeight = _ref2.lineHeight,
                maxWidth = _ref2.maxWidth,
                color = _ref2.color,
                fontSize = _ref2.fontSize,
                font = _ref2.font;

            var textLines = ctx.setFont(font).setFontSize(fontSize * scale).setTextColor(color).splitTextToSize(text, maxWidth);
            ctx.text(textLines, x, y + fontSize);
            return textLines.length * fontSize * lineHeight;
        }
    }, {
        key: 'drawFilledRect',
        value: function drawFilledRect(ctx, x, y, w, h, _ref3) {
            var color = _ref3.color;

            ctx.setDrawColor(0);
            ctx.setFillColor(color);
            ctx.rect(x, y, w, h, 'F');
        }
    }, {
        key: 'drawStrokedRect',
        value: function drawStrokedRect(ctx, x, y, w, h, _ref4) {
            var color = _ref4.color,
                lineWidth = _ref4.lineWidth;

            ctx.setLineWidth(lineWidth);
            ctx.setDrawColor(color);
            ctx.rect(x, y, w, h);
        }
    }, {
        key: 'drawImageFromCanvas',
        value: function drawImageFromCanvas(ctx, selector, x, y, w, h, bgcolor) {
            var canvas = image2canvas(document.querySelector(selector), bgcolor); // svg -> jpg
            ctx.addImage(canvas, 'JPEG', x, y, w, h);
        }
    }, {
        key: 'drawQr',
        value: function drawQr(ctx, data, x, y, size, bgcolor) {
            var canvas = document.createElement('canvas');
            var qr = new _qrious2.default({
                element: canvas,
                size: 250,
                value: data,
                background: bgcolor
            });
            ctx.addImage(canvas, 'PNG', x, y, size, size);
        }
    }, {
        key: 'renderPdf',
        value: function renderPdf(keys, filename) {
            var widthInches = this.props.widthInches,
                //8.5,
            lineHeight = 1.2,
                margin = 0.3,
                maxLineWidth = widthInches - margin * 2.0,
                fontSize = 24,
                scale = 72,
                //ptsPerInch
            oneLineHeight = fontSize * lineHeight / scale,
                qrSize = 1.1;

            var ctx = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                lineHeight: lineHeight,
                format: 'letter'
            }).setProperties({ title: filename });

            var offset = 0.0,
                sectionStart = 0,
                sectionHeight = 0;

            // HEADER

            sectionHeight = 1.29;
            this.drawFilledRect(ctx, 0.0, 0.0, widthInches, sectionHeight, {
                color: '#1f0fd1'
            });

            this.drawImageFromCanvas(ctx, '.pdf-logo', widthInches - margin - 1.9, 0.36, 0.98 * 1.8, 0.3 * 1.8, '#1F0FD1');

            offset += 0.265;
            offset += this.renderText(ctx, 'Wortheum keys for @' + this.props.name, {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: 1.0,
                maxWidth: maxLineWidth,
                color: 'white',
                fontSize: 0.36,
                font: 'Roboto-Bold'
            });

            /*
            offset += 0.1;
            offset += this.renderText(
                ctx,
                'Your recovery account partner: Wortheumwallet.com',
                {
                    scale,
                    x: margin,
                    y: offset,
                    lineHeight: 1.0,
                    maxWidth: maxLineWidth,
                    color: 'white',
                    fontSize: 0.18,
                    font: 'Roboto-Bold',
                }
            );
            */

            offset += 0.15;
            offset += this.renderText(ctx, 'Generated at ' + new Date().toISOString().replace(/\.\d{3}/, '') + ' by wortheum.news', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: 1.0,
                maxWidth: maxLineWidth,
                color: 'white',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset = sectionStart + sectionHeight;

            // BODY
            /*
            offset += 0.2;
            offset += this.renderText(
                ctx,
                'Wortheum.news is powered by Wortheum blockchain and uses its hierarchical key ' +
                    'system to keep you and your tokens safe. Print this out and ' +
                    'keep it somewhere safe. When in doubt, use your Private ' +
                    'Posting Key as your password, not your Master Password which ' +
                    'is only intended to be used to change your private keys. You ' +
                    'can also view these anytime at: https://worthdb.com/' +
                    this.props.name,
                {
                    scale,
                    x: margin,
                    y: offset,
                    lineHeight: lineHeight,
                    maxWidth: maxLineWidth,
                    color: 'black',
                    fontSize: 0.14,
                    font: 'Roboto-Regular',
                }
            );
            */
            // PRIVATE KEYS INTRO

            offset += 0.2;
            offset += this.renderText(ctx, 'Your Private Keys', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.18,
                font: 'Roboto-Bold'
            });

            offset += 0.1;
            offset += this.renderText(ctx, 'Instead of password based authentication, blockchain accounts ' + 'have a set of public and private key pairs that are used for ' + 'authentication as well as the encryption and decryption of ' + 'data. Do not share this file with anyone.', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Regular'
            });
            offset += 0.2;

            // POSTING KEY

            sectionStart = offset;
            sectionHeight = qrSize + 0.15 * 2;
            this.drawFilledRect(ctx, 0.0, offset, widthInches, sectionHeight, {
                color: 'f4f4f4'
            });

            offset += 0.15;
            this.drawQr(ctx, 'steem://import/wif/' + keys.postingPrivate + '/account/' + this.props.name, margin, offset, qrSize, '#f4f4f4');

            offset += 0.1;
            offset += this.renderText(ctx, 'Private Posting Key', {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, 'Used to log in to apps such as Wortheum.news and perform ' + 'actions such as posting news/articles, commenting, and voting.', {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth - (qrSize + 0.1),
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Regular'
            });

            offset += 0.075;
            offset += this.renderText(ctx, keys.postingPrivate, {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: sectionStart + sectionHeight - 0.6,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });
            offset += 0.2;
            offset = sectionStart + sectionHeight;

            // MEMO KEY

            sectionStart = offset;
            sectionHeight = qrSize + 0.15 * 2;
            //this.drawFilledRect(ctx, 0.0, offset, widthInches, sectionHeight, {color: '#f4f4f4'});

            offset += 0.15;
            this.drawQr(ctx, 'steem://import/wif/' + keys.memoPrivate + '/account/' + this.props.name, margin, offset, qrSize, '#ffffff');

            offset += 0.1;

            offset += this.renderText(ctx, 'Private Memo Key', {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, 'Used to decrypt private transfer memos.', {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth - (qrSize + 0.1),
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Regular'
            });

            offset += 0.075;
            offset += this.renderText(ctx, keys.memoPrivate, {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: sectionStart + sectionHeight - 0.6,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });

            offset += 0.1;
            offset = sectionStart + sectionHeight;

            // ACTIVE KEY

            sectionStart = offset;
            sectionHeight = qrSize + 0.15 * 2;
            this.drawFilledRect(ctx, 0.0, offset, widthInches, sectionHeight, {
                color: '#f4f4f4'
            });

            offset += 0.15;
            this.drawQr(ctx, 'steem://import/wif/' + keys.activePrivate + '/account/' + this.props.name, margin, offset, qrSize, '#f4f4f4');

            offset += 0.1;

            offset += this.renderText(ctx, 'Private Active Key', {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, 'Used for monetary and wallet related actions, such as ' + 'transferring tokens or powering WORTH up and down.', {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth - (qrSize + 0.1),
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Regular'
            });

            offset += 0.075;
            offset += this.renderText(ctx, keys.activePrivate, {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: sectionStart + sectionHeight - 0.6,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });
            offset += 0.2;

            offset = sectionStart + sectionHeight;

            // OWNER KEY

            sectionStart = offset;
            sectionHeight = qrSize + 0.15 * 2;
            //this.drawFilledRect(ctx, 0.0, offset, widthInches, sectionHeight, {color: '#f4f4f4'});

            offset += 0.15;
            this.drawQr(ctx, 'steem://import/wif/' + keys.ownerPrivate + '/account/' + this.props.name, margin, offset, qrSize, '#ffffff');

            offset += 0.1;

            offset += this.renderText(ctx, 'Private Owner Key', {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth - qrSize - 0.1,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, 'This key is used to reset all your other keys. It is ' + 'recommended to keep it offline at all times. If your ' + 'account is compromised, use this key to recover it ' + 'within 30 days at https://wortheumwallet.com.', {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth - (qrSize + 0.1),
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Regular'
            });

            offset += 0.075;
            offset += this.renderText(ctx, keys.ownerPrivate, {
                scale: scale,
                x: margin + qrSize + 0.1,
                y: sectionStart + sectionHeight - 0.6,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth - qrSize - 0.1,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });

            offset = sectionStart + sectionHeight;

            // MASTER PASSWORD

            sectionHeight = 1;
            sectionStart = offset;
            this.drawFilledRect(ctx, 0.0, offset, widthInches, sectionHeight, {
                color: '#f4f4f4'
            });

            offset += 0.2;
            offset += this.renderText(ctx, ['Master Password'].join(''), {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, 'The seed password used to generate this document. ' + 'Do not share this key.', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Regular'
            });

            offset += 0.075;
            offset += this.renderText(ctx, keys.master, {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });

            offset = sectionStart + sectionHeight;

            // PUBLIC KEYS INTRO

            sectionStart = offset;
            sectionHeight = 1.0;
            //this.drawFilledRect(ctx, 0.0, offset, widthInches, sectionHeight, {color: '#f4f4f4'});

            offset += 0.1;
            offset += this.renderText(ctx, 'Your Public Keys', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.18,
                font: 'Roboto-Bold'
            });

            offset += 0.1;
            offset += this.renderText(ctx, 'Public keys are associated with usernames and are used to ' + 'encrypt and verify messages. Your public keys are not required ' + 'for login. You can view these anytime at: https://worthdb.com/@' + this.props.name, {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.15,
                font: 'Roboto-Regular'
            });

            offset = sectionStart + sectionHeight;

            // PUBLIC KEYS

            this.renderText(ctx, 'Posting Public', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, keys.postingPublic, {
                scale: scale,
                x: 1.25,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });

            this.renderText(ctx, 'Memo Public', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, keys.memoPublic, {
                scale: scale,
                x: 1.25,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });

            this.renderText(ctx, 'Active Public', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, keys.activePublic, {
                scale: scale,
                x: 1.25,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });

            this.renderText(ctx, 'Owner Public', {
                scale: scale,
                x: margin,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'Roboto-Bold'
            });

            offset += this.renderText(ctx, keys.ownerPublic, {
                scale: scale,
                x: 1.25,
                y: offset,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: 'black',
                fontSize: 0.14,
                font: 'RobotoMono-Regular'
            });

            this.renderText(ctx, 'v0.1', {
                scale: scale,
                x: maxLineWidth - 0.2,
                y: offset - 0.2,
                lineHeight: lineHeight,
                maxWidth: maxLineWidth,
                color: '#bbbbbb',
                fontSize: 0.14,
                font: 'Roboto-Regular'
            });

            return ctx;
        }
    }]);
    return PdfDownload;
}(_react.Component);

exports.default = PdfDownload;