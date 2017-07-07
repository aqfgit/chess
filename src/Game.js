import Board from './Board';
import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Quenn,
  King,
}
from './ChessPieces';

class Game {
  constructor() {
    this.chessPieces = [];
    this.board = new Board();
    this.selectedChessPiece = null;
    this.validMoves = [];
    this.invalidMoves = [];
    this.turn = 'white';
  }

  init() {
    this.board.render();
    this.chessPieces.push(
      new Rook(1, 1, 'black'),
      new Knight(2, 1, 'black'),
      new Bishop(3, 1, 'black'),
      new Quenn(4, 1, 'black'),
      new King(5, 1, 'black'),
      new Bishop(6, 1, 'black'),
      new Knight(7, 1, 'black'),
      new Rook(8, 1, 'black'),
      new Rook(1, 8, 'white'),
      new Knight(2, 8, 'white'),
      new Bishop(3, 8, 'white'),
      new Quenn(4, 8, 'white'),
      new King(5, 8, 'white'),
      new Bishop(6, 8, 'white'),
      new Knight(7, 8, 'white'),
      new Rook(8, 8, 'white'),
    );

    for (let i = 1; i <= 8; i += 1) {
      this.chessPieces.push(
        new Pawn(i, 2, 'black'),
        new Pawn(i, 7, 'white'),
      );
    }

    this.handleControls();
  }

  checkWhichChessPieceIsSelected() {
    this.chessPieces.forEach((figure) => {
      if (figure.isSelected && (this.selectedChessPiece === null || this.selectedChessPiece.isSelected === false)) { // so you can't select other figure when one is already selected
        this.selectedChessPiece = figure;
      }
    });
    // console.log(this.selectedChessPiece);
  }

  clearValidMoves() {
    if (this.selectedChessPiece !== null) {
      this.selectedChessPiece.setPossibleMoves([]);
      this.validMoves = [];
    }
  }

  beatTheFigure(moveToMake) {
    this.chessPieces.forEach((figure, index, object) => {
      if ((figure.x === moveToMake.x) && (figure.y === moveToMake.y) && (figure !== this.selectedChessPiece) && this.selectedChessPiece !== null) {
        console.log(this.selectedChessPiece)
        figure.dispose();
        object.splice(index, 1);
      }
    });
  }

  setProperTurn() {
    if (this.turn === 'white') {
      this.turn = 'black';
    }
    else if (this.turn === 'black') {
      this.turn = 'white';
    }

    this.chessPieces.forEach((figure) => {
      if (figure.color === this.turn) {
        figure.element.style.pointerEvents = 'auto';
      } else {
        figure.element.style.pointerEvents = 'none';
      }
    });
  }

  // disableOtherFigures() {
  //   this.chessPieces.forEach((figure) => {
  //     if (this.selectedChessPiece !== null) {
  //       if ((this.selectedChessPiece.isSelected === true) && (figure !== this.selectedChessPiece)) {
  //         figure.element.style.pointerEvents = 'none';
  //       } else {
  //         figure.element.style.pointerEvents = 'auto';
  //       }
  //     } else {
  //       console.log('auto')
  //       figure.element.style.pointerEvents = 'auto';
        
  //     }
  //   });
  // }

  handleControls() {
    this.board.boardWrap.addEventListener('click', (event) => {
      this.clearValidMoves();
      this.checkWhichChessPieceIsSelected();
      this.checkForValidMoves();
      if (this.selectedChessPiece === null) {
        return;
      }
      this.board.getTiles().forEach((tile) => {
        if (tile.domEl === event.target && this.selectedChessPiece.isSelected) {
          console.log(this.selectedChessPiece)
          this.validMoves.forEach((validMove) => {
            if ((validMove.x === tile.x) && (validMove.y === tile.y) && this.selectedChessPiece !== null) {
              this.beatTheFigure(validMove);
              this.selectedChessPiece.move(tile.x, tile.y);
              this.selectedChessPiece.isSelected = false;
              this.selectedChessPiece = null;
              this.setProperTurn();
            }
          });
          if (this.selectedChessPiece !== null) {
            this.selectedChessPiece.isSelected = false;
          }
        }
      });
    }, false);
    this.clearValidMoves();
  }

  checkForValidMoves() {
    if (this.selectedChessPiece !== null) {
      this.selectedChessPiece.calculatePossibleMoves(this.chessPieces);
      this.validMoves.push(...this.selectedChessPiece.getPossibleMoves());
      const indexesToRemove = [];
      this.validMoves.forEach((move, index) => {
        this.chessPieces.forEach((figure) => {
          if ((figure.x === move.x) && (figure.y === move.y) && (this.selectedChessPiece.color === figure.color)) {
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
  }

  gameLoop() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

}

const game = new Game();
game.init();
window.setInterval(function() {
  console.log(game.selectedChessPiece)
}, 1000)
