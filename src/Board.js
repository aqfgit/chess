export default class Board {
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
