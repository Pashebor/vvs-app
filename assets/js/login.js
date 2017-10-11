(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertPopup = function () {
    function AlertPopup(title, message) {
        _classCallCheck(this, AlertPopup);

        this.title = title;
        this.message = message;
    }

    _createClass(AlertPopup, [{
        key: 'closePopup',
        value: function closePopup() {
            var _this = this;

            var popup = document.querySelector('.js-popup');
            popup.addEventListener('click', function () {
                _this.style = 'opacity: 0';
                window.location.reload();
            });
        }
    }, {
        key: 'popup',
        value: function popup() {
            var overlay = document.createElement('div'),
                window = document.createElement('div'),
                closeBtn = document.createElement('p'),
                modalBody = document.createElement('div'),
                btnOk = document.createElement('button');

            btnOk.className += 'btn btn-submit';
            btnOk.innerText = 'OK';
            modalBody.innerHTML = '<h2 class="popup__title">' + this.title + '</h2><p class="popup__message">' + this.message + '</p>';
            overlay.className += 'popup-overlay js-popup';
            window.className += 'popup';
            closeBtn.className += 'popup__close js-close-popup';
            window.appendChild(closeBtn);
            window.appendChild(modalBody);
            window.appendChild(btnOk);
            overlay.appendChild(window);

            return overlay;
        }
    }, {
        key: 'showPopup',
        value: function showPopup() {
            var body = document.querySelector('body');
            body.appendChild(this.popup());
            this.closePopup();
        }
    }]);

    return AlertPopup;
}();

exports.default = AlertPopup;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
    function Form(formParams) {
        _classCallCheck(this, Form);

        this.form = document.querySelector('.' + formParams.name);
    }

    _createClass(Form, [{
        key: 'formSubmit',
        value: function formSubmit() {
            var fields = {};
            var inputs = this.form.querySelectorAll('input');
            for (var i = 0; i < inputs.length - 1; i += 1) {
                switch (inputs[i].getAttribute('type')) {
                    case 'hidden':
                        fields.typeUser = inputs[i].value;
                        break;
                    default:
                        fields[inputs[i].getAttribute('name')] = inputs[i].value;
                }
            }
            this.fields = fields;
            return this.fields;
        }
    }]);

    return Form;
}();

exports.default = Form;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Form2 = require('./Form');

var _Form3 = _interopRequireDefault(_Form2);

var _AlertPopup = require('./AlertPopup');

var _AlertPopup2 = _interopRequireDefault(_AlertPopup);

var _ajax = require('./utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Form) {
    _inherits(Login, _Form);

    function Login(params) {
        _classCallCheck(this, Login);

        return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, params));
    }

    _createClass(Login, [{
        key: 'loginUser',
        value: function loginUser() {
            var _this2 = this;

            this.form.addEventListener('submit', function (event) {
                event.preventDefault();
                (0, _ajax.checkUser)('./utils/login_ajax.php', _this2.formSubmit()).then(function (json) {
                    var popup = new _AlertPopup2.default('Сообщение', json.response);
                    popup.showPopup();
                }).catch(function (err) {
                    return console.log('error');
                });
            });
        }
    }]);

    return Login;
}(_Form3.default);

exports.default = Login;

},{"./AlertPopup":1,"./Form":2,"./utils/ajax.js":5}],4:[function(require,module,exports){
'use strict';

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _AlertPopup = require('./AlertPopup');

var _AlertPopup2 = _interopRequireDefault(_AlertPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = new _Login2.default({ name: 'js-auth' });
user.loginUser();

},{"./AlertPopup":1,"./Form":2,"./Login":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ajaxJson = exports.ajaxJson = function ajaxJson(url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return fetch(url, {
        method: method,
        credentials: 'same-origin',
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: 'loginData=' + JSON.stringify(params)
    }).then(function (response) {
        return response.json();
    });
};

var checkUser = exports.checkUser = function checkUser(url, data) {
    return ajaxJson(url, 'POST', data);
};

},{}]},{},[4]);
