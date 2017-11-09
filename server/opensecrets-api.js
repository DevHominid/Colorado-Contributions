'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

require('isomorphic-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Config dotenv
_dotenv2.default.config();

// Init es-6 promise
_es6Promise2.default.polyfill();

// Define api call class

var OpenSecretsCall = function () {
  function OpenSecretsCall(method, params, output, apikey) {
    _classCallCheck(this, OpenSecretsCall);

    this.method = method;
    this.params = params;
    this.output = output || 'json';
    this.apikey = apikey || process.env.OPENSECRETS_API_KEY;
    this.baseurl = 'http://www.opensecrets.org/api/';
  }

  // Check output


  _createClass(OpenSecretsCall, [{
    key: 'checkOutput',
    value: function checkOutput() {
      var output = this.output;
      var validVals = ['json', 'xml'];
      if (validVals.indexOf(output) === -1) {
        throw new TypeError('Whoops! Output value is invalid');
      } else {
        return output;
      }
    }

    // Check for api key

  }, {
    key: 'checkApiKey',
    value: function checkApiKey() {
      var apikey = this.apikey;
      if (!apikey) {
        throw new TypeError('Whoops! OpenSecrets API key required');
      } else {
        return apikey;
      }
    }

    // Initiate url

  }, {
    key: 'initUrl',
    value: function initUrl() {
      // Call checkApiKey() and checkOutput()
      var apikey = void 0,
          output = void 0;
      try {
        apikey = this.checkApiKey();
        output = this.checkOutput();
      } catch (e) {
        console.log(e.name + ' : ' + e.message);
      }
      // Build url
      if (apikey) {
        var url = this.baseurl + '?method=' + this.method + '&output=' + this.output + '&apikey=' + this.apikey;
        for (var prop in this.params) {
          url += '&' + prop + '=' + this.params[prop];
        }
        return url;
      }
    }

    // Get the data

  }, {
    key: 'fetchData',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var url, status, json, text, initFetch, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.initUrl();

                // Handle fetch response status

                status = function status(response) {
                  if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                  } else {
                    return Promise.reject(new Error(response.statusText));
                  }
                };

                // Handle fetch response JSON parsing


                json = function json(response) {
                  return response.json();
                };

                // Handle fetch response XML


                text = function text(response) {
                  return response.text();
                };

                // Fetch API


                initFetch = new _es6Promise2.default(function (resolve, reject) {
                  if (typeof url !== 'undefined' && _this.output === 'json') {
                    // JSON
                    fetch(url).then(status).then(json).then(function (data) {
                      console.log('Request succeeded, \n' + data);
                      resolve(data);
                    }).catch(function (err) {
                      console.log('Request failed, \n' + err);
                    });
                  } else if (typeof url !== 'undefined' && _this.output === 'xml') {
                    // XML
                    fetch(url).then(status).then(text).then(function (data) {
                      console.log('Request succeeded, \n' + data);
                      resolve(data);
                    }).catch(function (err) {
                      console.log('Request failed, \n' + err);
                    });
                  } else {
                    reject('fetch prevented');
                  }
                });
                _context.prev = 5;
                _context.next = 8;
                return initFetch;

              case 8:
                result = _context.sent;

                console.log(result);
                return _context.abrupt('return', result);

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](5);

                console.log(_context.t0);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 13]]);
      }));

      function fetchData() {
        return _ref.apply(this, arguments);
      }

      return fetchData;
    }()
  }]);

  return OpenSecretsCall;
}();

// Test api call

// const getLegislators = new OpenSecretsCall('getLegislators', 'NJ');
// getLegislators.fetchData();

exports.default = OpenSecretsCall;
var candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012' });
candSummary.fetchData();