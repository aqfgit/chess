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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var boardWrap = document.getElementById('boardWrap');
var foo = document.getElementById('foo');
var fooX = 1;
var fooY = 1;
var rowLength = 8;
var isTileLight = true;
var tiles = [];
var x = 1;
var y = 1;
var distanceUnit = 100;
var selected = false;
var possibleMoves = [];

for (var i = 1; i <= 64; i++) {
  var tile = document.createElement('div');
  x += 1;
  if ((i - 1) % rowLength === 0) {
    x = 1;
    y = i === 1 ? 1 : y + 1;
  } else {
    isTileLight = !isTileLight;
  }
  tile.classList += 'tile';
  if (isTileLight) {
    tile.style.backgroundColor = 'white';
  } else {
    tile.style.backgroundColor = 'black';
  }
  tile.innerHTML = i;
  boardWrap.appendChild(tile);
  tiles.push({
    domEl: tile,
    x: x,
    y: y
  });
}

var canMove = function canMove() {
  possibleMoves = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _tile = _step.value;

      if (_tile.x === fooX && _tile.y === fooY) {
        var _possibleMoves;

        var moves = [{
          x: _tile.x + 2,
          y: _tile.y + 1
        }, {
          x: _tile.x + 2,
          y: _tile.y - 1
        }, {
          x: _tile.x + 1,
          y: _tile.y + 2
        }, {
          x: _tile.x + 1,
          y: _tile.y - 2
        }, {
          x: _tile.x - 1,
          y: _tile.y - 2
        }, {
          x: _tile.x - 2,
          y: _tile.y - 1
        }, {
          x: _tile.x - 1,
          y: _tile.y + 2
        }, {
          x: _tile.x - 2,
          y: _tile.y + 1
        }];

        (_possibleMoves = possibleMoves).push.apply(_possibleMoves, moves);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

function doMove(x, y) {
  var toSubstractX = distanceUnit;
  var toSubstractY = distanceUnit;
  var toMultiplyX = x;
  var toMultiplyY = y;
  if (x === 1) {
    toMultiplyX = 0;
    toSubstractX = 0;
  }
  if (y === 1) {
    toMultiplyY = 0;
    toSubstractY = 0;
  }
  foo.style.top = distanceUnit * toMultiplyY - toSubstractY + 'px';
  foo.style.left = distanceUnit * toMultiplyX - toSubstractX + 'px';
  fooX = x;
  fooY = y;
  canMove();
}

canMove();

foo.addEventListener('click', function () {
  selected = true;
});

boardWrap.addEventListener('click', function (event) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = tiles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _tile2 = _step2.value;

      if (_tile2.domEl === event.target && selected === true) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = possibleMoves[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var move = _step3.value;

            if (move.x === _tile2.x && move.y === _tile2.y) {
              doMove(_tile2.x, _tile2.y);
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        selected = false;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map