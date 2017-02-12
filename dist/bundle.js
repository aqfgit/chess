/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.boardWrap = document.getElementById('boardWrap');
    this.rowLength = 8;
    this.isTileLight = true;
    this.tiles = [];
    this.x = 1;
    this.y = 1;
  }

  _createClass(Board, [{
    key: 'render',
    value: function render() {
      for (var i = 1; i <= 64; i += 1) {
        var tile = document.createElement('div');
        this.x += 1;
        if ((i - 1) % this.rowLength === 0) {
          this.x = 1;
          this.y = i === 1 ? 1 : this.y + 1;
        } else {
          this.isTileLight = !this.isTileLight;
        }
        tile.classList += 'tile';
        if (this.isTileLight) {
          tile.style.backgroundColor = 'white';
        } else {
          tile.style.backgroundColor = 'black';
        }
        tile.innerHTML = i;
        this.boardWrap.appendChild(tile);
        this.tiles.push({
          domEl: tile,
          x: this.x,
          y: this.y
        });
      }
    }
  }, {
    key: 'assignTilesPositions',
    value: function assignTilesPositions() {
      for (var i = 1; i <= 64; i += 1) {
        this.x += 1;
        if ((i - 1) % this.rowLength === 0) {
          this.x = 1;
          this.y = i === 1 ? 1 : this.y + 1;
        } else {
          this.isTileLight = !this.isTileLight;
        }
        var tile = document.createElement('div');
        tile.classList += 'tile';
        if (this.isTileLight) {
          tile.style.backgroundColor = 'white';
        } else {
          tile.style.backgroundColor = 'black';
        }
        tile.innerHTML = i;
        this.boardWrap.appendChild(tile);
        this.tiles.push({
          domEl: tile,
          x: this.x,
          y: this.y
        });
      }
    }
  }, {
    key: 'getTiles',
    value: function getTiles() {
      return this.tiles;
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Board = __webpack_require__(0);

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _Board2.default();
board.render();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map