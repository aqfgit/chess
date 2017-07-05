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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor() {
    this.boardWrap = document.getElementById('boardWrap');
    this.rowLength = 8;
    this.isTileLight = true;
    this.tiles = [];
    this.x = 1;
    this.y = 1;
  }

  render() {
    for (let i = 1; i <= 64; i += 1) {
      const tile = document.createElement('div');
      this.x += 1;
      if ((i - 1) % this.rowLength === 0) {
        this.x = 1;
        this.y = i === 1 ? 1 : this.y + 1;
      } else {
        this.isTileLight = !this.isTileLight;
      }
      tile.classList += 'board__tile';
      if (this.isTileLight) {
        tile.classList += ' board__tile--light';
      } else {
        tile.classList += ' board__tile--dark';
      }
      this.boardWrap.appendChild(tile);
      this.tiles.push({
        domEl: tile,
        x: this.x,
        y: this.y,
      });
    }
  }

  getTiles() {
    return this.tiles;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ChessPiece {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.isSelected = false;
    this.color = color;
    this.distanceUnit = 100;
    this.possibleMoves = [];
    this.element = document.createElement('div');
    this.image = 'image';
  }

  move(xDest, yDest) {
    let toSubstractX = this.distanceUnit;
    let toSubstractY = this.distanceUnit;
    let toMultiplyX = xDest;
    let toMultiplyY = yDest;
    if (xDest === 1) {
      toMultiplyX = 0;
      toSubstractX = 0;
    }
    if (yDest === 1) {
      toMultiplyY = 0;
      toSubstractY = 0;
    }
    this.element.style.top = `${(this.distanceUnit * toMultiplyY) - toSubstractY}px`;
    this.element.style.left = `${(this.distanceUnit * toMultiplyX) - toSubstractX}px`;
    this.x = xDest;
    this.y = yDest;
  }

  buildElement() {
    this.element.classList += ' board__chesspiece';
    this.element.style.backgroundImage = `url(./static/img/${this.image}_${this.color}.png)`;
    document.getElementById('boardWrap').appendChild(this.element);
    this.move(this.x, this.y);
    this.initListeners();
  }

  getElement() {
    return this.element;
  }

  getPossibleMoves() {
    return this.possibleMoves;
  }

  setPossibleMoves(posMoves) {
    this.possibleMoves = posMoves;
  }

  initListeners() {
    this.element.addEventListener('click', () => {
      this.isSelected = true;    
    });
  }
}
/* unused harmony export ChessPiece */


class Pawn extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'pawn';
    this.buildElement();
  }

  calculatePossibleMoves() {
    switch (this.color) {
      case 'white': {
        const moves = [
          {
            x: this.x,
            y: this.y - 1,
          },
        ];
        this.possibleMoves.push(...moves);
        break;
      }
      case 'black': {
        const moves = [
          {
            x: this.x,
            y: this.y + 1,
          },
        ];
        this.possibleMoves.push(...moves);
        break;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["f"] = Pawn;


class King extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'king';
    this.buildElement();
  }

  calculatePossibleMoves() {
    const moves = [{
      x: this.x,
      y: this.y + 1,
    },
    {
      x: this.x,
      y: this.y - 1,
    },
    {
      x: this.x + 1,
      y: this.y,
    },
    {
      x: this.x - 1,
      y: this.y,
    },
    {
      x: this.x - 1,
      y: this.y - 1,
    },
    {
      x: this.x + 1,
      y: this.y + 1,
    },
    {
      x: this.x - 1,
      y: this.y + 1,
    },
    {
      x: this.x + 1,
      y: this.y - 1,
    },
    ];
    this.possibleMoves.push(...moves);
  }
}
/* harmony export (immutable) */ __webpack_exports__["e"] = King;


class Quenn extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'queen';
    this.buildElement();
  }

  calculatePossibleMoves() {
    const moves = [];
    for (let i = 1; i <= 7; i += 1) {
      moves.push({
        x: this.x,
        y: this.y + i,
      });

      moves.push({
        x: this.x,
        y: this.y - i,
      });

      moves.push({
        x: this.x + i,
        y: this.y,
      });

      moves.push({
        x: this.x - i,
        y: this.y,
      });

      moves.push({
        x: this.x - i,
        y: this.y - i,
      });

      moves.push({
        x: this.x + i,
        y: this.y + i,
      });

      moves.push({
        x: this.x - i,
        y: this.y + i,
      });

      moves.push({
        x: this.x + i,
        y: this.y - i,
      });
    }

    this.possibleMoves.push(...moves);
  }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = Quenn;


class Rook extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'rook';
    this.buildElement();
  }

  calculatePossibleMoves() {
    const moves = [];
    for (let i = 1; i <= 7; i += 1) {
      moves.push({
        x: this.x,
        y: this.y + i,
      });

      moves.push({
        x: this.x,
        y: this.y - i,
      });

      moves.push({
        x: this.x + i,
        y: this.y,
      });

      moves.push({
        x: this.x - i,
        y: this.y,
      });
    }

    this.possibleMoves.push(...moves);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rook;


class Bishop extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'bishop';
    this.buildElement();
  }

  calculatePossibleMoves() {
    const moves = [];
    for (let i = 1; i <= 7; i += 1) {
      moves.push({
        x: this.x - i,
        y: this.y - i,
      });

      moves.push({
        x: this.x + i,
        y: this.y + i,
      });

      moves.push({
        x: this.x - i,
        y: this.y + i,
      });

      moves.push({
        x: this.x + i,
        y: this.y - i,
      });
    }

    this.possibleMoves.push(...moves);
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Bishop;


class Knight extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'knight';
    this.buildElement();
  }

  calculatePossibleMoves() {
    const moves = [{
      x: this.x + 2,
      y: this.y + 1,
    },
    {
      x: this.x + 2,
      y: this.y - 1,
    },
    {
      x: this.x + 1,
      y: this.y + 2,
    },
    {
      x: this.x + 1,
      y: this.y - 2,
    },
    {
      x: this.x - 1,
      y: this.y - 2,
    },
    {
      x: this.x - 2,
      y: this.y - 1,
    },
    {
      x: this.x - 1,
      y: this.y + 2,
    },
    {
      x: this.x - 2,
      y: this.y + 1,
    },
    ];
    this.possibleMoves.push(...moves);
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Knight;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChessPieces__ = __webpack_require__(1);



class Game {
  constructor() {
    this.chessPieces = [];
    this.board = new __WEBPACK_IMPORTED_MODULE_0__Board__["a" /* default */]();
    this.selectedChessPiece = null;
    this.validMoves = [];
    this.invalidMoves = [];
  }

  init() {
    this.board.render();
    this.chessPieces.push(
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["a" /* Rook */](1, 1, 'black'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["b" /* Knight */](2, 1, 'black'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["c" /* Bishop */](3, 1, 'black'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["d" /* Quenn */](4, 1, 'black'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["e" /* King */](5, 1, 'black'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["c" /* Bishop */](6, 1, 'black'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["b" /* Knight */](7, 1, 'black'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["a" /* Rook */](8, 1, 'black'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["a" /* Rook */](1, 8, 'white'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["b" /* Knight */](2, 8, 'white'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["c" /* Bishop */](3, 8, 'white'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["d" /* Quenn */](4, 8, 'white'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["e" /* King */](5, 8, 'white'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["c" /* Bishop */](6, 8, 'white'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["b" /* Knight */](7, 8, 'white'),
      new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["a" /* Rook */](8, 8, 'white')
    );

    for (let i = 1; i <= 8; i += 1) {
      this.chessPieces.push(
        new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["f" /* Pawn */](i, 2, 'black'),
        new __WEBPACK_IMPORTED_MODULE_1__ChessPieces__["f" /* Pawn */](i, 7, 'white')
      );
    }

    this.handleControls();
  }

  checkWhichChessPieceIsSelected() {
    this.chessPieces.forEach((figure) => {
      if (figure.isSelected) {
        this.selectedChessPiece = figure;
      }
    });
    console.log(this.selectedChessPiece)
  }

  clearValidMoves() {
    if (this.selectedChessPiece !== null) {
      this.selectedChessPiece.setPossibleMoves([]);
      this.validMoves = [];
    }
  }

  handleControls() {
    this.board.boardWrap.addEventListener('click', (event) => {
      this.clearValidMoves();
      this.checkWhichChessPieceIsSelected();
      this.checkForValidMoves();
      this.board.getTiles().forEach((tile) => {
        if (tile.domEl === event.target && this.selectedChessPiece.isSelected) {
          this.validMoves.forEach((validMove) => {
            if ((validMove.x === tile.x) && (validMove.y === tile.y)) {
              this.selectedChessPiece.move(tile.x, tile.y);
              this.selectedChessPiece.isSelected = false;
            }
          });
          if (this.selectedChessPiece !== null) {
            this.selectedChessPiece.isSelected = false;
          }
        }
      });
    });
    this.clearValidMoves();
  }

  checkForValidMoves() {
    this.selectedChessPiece.calculatePossibleMoves();
    this.validMoves.push(...this.selectedChessPiece.getPossibleMoves());
    const indexesToRemove = [];
    this.validMoves.forEach((move, index, object) => {
      this.chessPieces.forEach((figure) => {
        if ((figure.x === move.x) && (figure.y === move.y)) {
          indexesToRemove.push(index);
        }
      });
    });
    let shift = 0;
    indexesToRemove.forEach((i) => {
      this.validMoves.splice(i - shift, 1);
      shift += 1;
    });
  }

  gameLoop() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

}

const game = new Game();
game.init();



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map