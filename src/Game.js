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
  }

  init() {
    this.board.render();
    this.chessPieces.push(
      new Rook(1, 1, 'white'),
      new Knight(2, 1, 'white'),
      new Bishop(3, 1, 'white'),
      new Quenn(4, 1, 'white'),
      new King(5, 1, 'white'),
      new Bishop(6, 1, 'white'),
      new Knight(7, 1, 'white'),
      new Rook(8, 1, 'white'),
      new Rook(1, 8, 'black'),
      new Knight(2, 8, 'black'),
      new Bishop(3, 8, 'black'),
      new Quenn(4, 8, 'black'),
      new King(5, 8, 'black'),
      new Bishop(6, 8, 'black'),
      new Knight(7, 8, 'black'),
      new Rook(8, 8, 'black')
    );

    for (let i = 1; i <= 8; i += 1) {
      this.chessPieces.push(
        new Pawn(i, 2, 'white'),
        new Pawn(i, 7, 'black')
      );
    }
  }
}

const game = new Game();
game.init();