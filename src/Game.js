import Board from './Board';
import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Quenn,
  King
}
from './ChessPieces';

const board = new Board();
board.render();

const rook1 = new Rook(1, 1, 'white');
const knight1 = new Knight(2, 1, 'white');
const bishop1 = new Bishop(3, 1, 'white');
const queen = new Quenn(4, 1, 'white');
const king = new King(5, 1, 'white');
const bishop2 = new Bishop(6, 1, 'white');
const knight2 = new Knight(7, 1, 'white');
const rook2 = new Rook(8, 1, 'white');

const pawn1 = new Pawn(1, 2, 'white');
const pawn2 = new Pawn(2, 2, 'white');
const pawn3 = new Pawn(3, 2, 'white');
const pawn4 = new Pawn(4, 2, 'white');
const pawn5 = new Pawn(5, 2, 'white');
const pawn6 = new Pawn(6, 2, 'white');
const pawn7 = new Pawn(7, 2, 'white');
const pawn8 = new Pawn(8, 2, 'white');

king.move(5,5)