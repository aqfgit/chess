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
    this.element.style.backgroundImage = `url(./static/img/${this.image}.png)`;
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

}

export class King extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'king';
    this.buildElement();
  }
}

export class Quenn extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'queen';
    this.buildElement();
  }
}

export class Rook extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'rook';
    this.buildElement();
  }
}

export class Bishop extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'bishop';
    this.buildElement();
  }
}

export class Knight extends ChessPiece {
  constructor(x, y, color) {
    super(x, y, color);
    this.image = 'knight';
    this.buildElement();
  }

  calculatePossibleMoves(tile) {
    const moves = [{
      x: tile.x + 2,
      y: tile.y + 1,
    },
    {
      x: tile.x + 2,
      y: tile.y - 1,
    },
    {
      x: tile.x + 1,
      y: tile.y + 2,
    },
    {
      x: tile.x + 1,
      y: tile.y - 2,
    },
    {
      x: tile.x - 1,
      y: tile.y - 2,
    },
    {
      x: tile.x - 2,
      y: tile.y - 1,
    },
    {
      x: tile.x - 1,
      y: tile.y + 2,
    },
    {
      x: tile.x - 2,
      y: tile.y + 1,
    },
    ];
    this.possibleMoves.push(...moves);
  }
}