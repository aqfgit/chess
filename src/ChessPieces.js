export class ChessPiece {
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

export class Pawn extends ChessPiece {
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

export class King extends ChessPiece {
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

export class Quenn extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'queen';
    this.buildElement();
  }

  calculatePossibleMoves(chessPiecies) {
    const moves = [];
    /* What's going on with the lock and all this mess?

      A figure can move up to 7 fields hence the 7 iterations of the for loop.
      In chess, all figures(except knight)can't jump over other figures.Hence the forEach loop,which iterater over chesspiecies passed from the Game class later on;
      When we find figure,that has the same coordinates that we want to add to our possible moves,we should stop pushing next moves,becasue we don't want a figure to be able to jump over other figures.
      Therefore,when a condition is met,a particular lock* flag is enabled which stops pushing invalid moves to the array in next itterations.
    */
    let lockWest = false;
    let lockEast = false;
    let lockNorth = false;
    let lockSouth = false;
    let lockWestNorth = false;
    let lockEastNorth = false;
    let lockWestSouth = false;
    let lockEastSouth = false;
    for (let i = 1; i <= 7; i += 1) {
      chessPiecies.forEach((piece) => {
        if (lockSouth === false) {
          if ((piece.x === this.x) && (piece.y === this.y + i)) {
            lockSouth = true;
          }
          moves.push({
            x: this.x,
            y: this.y + i,
          });
        }

        if (lockNorth === false) {
          if ((piece.x === this.x) && (piece.y === this.y - i)) {
            lockNorth = true;
          }
          moves.push({
            x: this.x,
            y: this.y - i,
          });
        }

        if (lockEast === false) {
          if ((piece.x === this.x + i) && (piece.y === this.y)) {
            lockEast = true;
          }
          moves.push({
            x: this.x + i,
            y: this.y,
          });
        }

        if (lockWest === false) {
          if ((piece.x === this.x - i) && (piece.y === this.y)) {
            lockWest = true;
          }
          moves.push({
            x: this.x - i,
            y: this.y,
          });
        }

        if (lockWestNorth === false) {
          if ((piece.x === this.x - i) && (piece.y === this.y - i)) {
            lockWestNorth = true;
          }
          moves.push({
            x: this.x - i,
            y: this.y - i,
          });
        }

        if (lockEastSouth === false) {
          if ((piece.x === this.x + i) && (piece.y === this.y + i)) {
            lockEastSouth = true;
          }
          moves.push({
            x: this.x + i,
            y: this.y + i,
          });
        }

        if (lockWestSouth === false) {
          if ((piece.x === this.x - i) && (piece.y === this.y + i)) {
            lockWestSouth = true;
          }
          moves.push({
            x: this.x - i,
            y: this.y + i,
          });
        }

        if (lockEastNorth === false) {
          if ((piece.x === this.x + i) && (piece.y === this.y - i)) {
            lockEastNorth = true;
          }
          moves.push({
            x: this.x + i,
            y: this.y - i,
          });
        }
      });
    }

    this.possibleMoves.push(...moves);
  }
}

export class Rook extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'rook';
    this.buildElement();
  }

  calculatePossibleMoves(chessPiecies) {
    const moves = [];
    let lockWest = false;
    let lockEast = false;
    let lockNorth = false;
    let lockSouth = false;
    for (let i = 1; i <= 7; i += 1) {
      chessPiecies.forEach((piece) => {
        if (lockSouth === false) {
          if ((piece.x === this.x) && (piece.y === this.y + i)) {
            lockSouth = true;
          }
          moves.push({
            x: this.x,
            y: this.y + i,
          });
        }

        if (lockNorth === false) {
          if ((piece.x === this.x) && (piece.y === this.y - i)) {
            lockNorth = true;
          }
          moves.push({
            x: this.x,
            y: this.y - i,
          });
        }

        if (lockEast === false) {
          if ((piece.x === this.x + i) && (piece.y === this.y)) {
            lockEast = true;
          }
          moves.push({
            x: this.x + i,
            y: this.y,
          });
        }

        if (lockWest === false) {
          if ((piece.x === this.x - i) && (piece.y === this.y)) {
            lockWest = true;
          }
          moves.push({
            x: this.x - i,
            y: this.y,
          });
        }
      });
    }

    this.possibleMoves.push(...moves);
  }
}

export class Bishop extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'bishop';
    this.buildElement();
  }

  calculatePossibleMoves(chessPiecies) {
    const moves = [];
    let lockWestNorth = false;
    let lockEastNorth = false;
    let lockWestSouth = false;
    let lockEastSouth = false;
    for (let i = 1; i <= 7; i += 1) {
      chessPiecies.forEach((piece) => {
        if (lockWestNorth === false) {
          if ((piece.x === this.x - i) && (piece.y === this.y - i)) {
            lockWestNorth = true;
          }
          moves.push({
            x: this.x - i,
            y: this.y - i,
          });
        }

        if (lockEastSouth === false) {
          if ((piece.x === this.x + i) && (piece.y === this.y + i)) {
            lockEastSouth = true;
          }
          moves.push({
            x: this.x + i,
            y: this.y + i,
          });
        }

        if (lockWestSouth === false) {
          if ((piece.x === this.x - i) && (piece.y === this.y + i)) {
            lockWestSouth = true;
          }
          moves.push({
            x: this.x - i,
            y: this.y + i,
          });
        }

        if (lockEastNorth === false) {
          if ((piece.x === this.x + i) && (piece.y === this.y - i)) {
            lockEastNorth = true;
          }
          moves.push({
            x: this.x + i,
            y: this.y - i,
          });
        }
      });
    }

    this.possibleMoves.push(...moves);
  }
}

export class Knight extends ChessPiece {
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
