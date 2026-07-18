class Exm_array {
//constructor(), method,property,accessor
  constructor(grid) {
    this.grid = grid;
  }
  static processGrid(grid) {
    for (let i= 0; i< grid.length; i++) {
      for (let j= 0; j<grid[i].length; j++) {
        console.log(`row ${i}, column ${j}`, grid[i][j]);
      }
    }
  }
 
}

export {Exm_array};