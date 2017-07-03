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
      new Rook(8, 8, 'white')
    );

    for (let i = 1; i <= 8; i += 1) {
      this.chessPieces.push(
        new Pawn(i, 2, 'black'),
        new Pawn(i, 7, 'white')
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
    this.validMoves.forEach((move, index, object) => {
      this.chessPieces.forEach((figure) => {
        if ((figure.x === move.x) && (figure.y === move.y)) {
          object.splice(index, 1);
        }
      });
    });
    console.table(this.validMoves)
  }

  gameLoop() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

}

const game = new Game();
game.init();

// game.gameLoop();

