class PixelArtCanvas {
  constructor(config) {
    this.container = document.getElementById('canvas');
    this.gridLineSize = 16;
    this.pixelSize = 30;
    this.pixelColorBase = 1;
  }

  init() {
    // Pixels grid generation
    this.generateGrid();
    
    // Grid dimensions personnalisation 

    // Color change on pixels click

    // Select colors interface generation

    // Interaction between select colors interface with click on pixel
    
    
  }

  /**
   * Grid generation
   */
  generateGrid() {
    const gridSize = this.gridLineSize*this.gridLineSize;
    
    // Add width dimension to contains good pixels number by line
    this.container.style.width = (this.pixelSize*this.gridLineSize)+'px';

    // Pixels construction
    for(let i=0; i<gridSize; i++) {
      const pixel = document.createElement('div');
      
      pixel.className = 'pixel';      
      pixel.dataset.pixelColor = this.pixelColorBase; // Add data attribute to change pixel color
      pixel.style = `width: ${this.pixelSize}px; height: ${this.pixelSize}px`;

      this.container.append(pixel);
    }

  }
}

const myPixelArt = new PixelArtCanvas();

window.addEventListener("DOMContentLoaded", () => myPixelArt.init());