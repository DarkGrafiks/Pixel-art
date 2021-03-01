class PixelArtCanvas {
  constructor(config) {
    this.container = document.getElementById('canvas');
    this.gridLineDefaultSize = 8;
    this.pixelDefaultSize = 30;
    this.gridLineSize = this.gridLineDefaultSize;
    this.pixelSize = this.pixelDefaultSize;
    this.pixelColorBase = 1;
  }

  init() {
    // Pixels grid generation
    this.generateGrid();
    
    // Grid size configuration 
    this.generateConfigForm();

    // Color change on pixels click

    // Select colors interface generation

    // Interaction between select colors interface with click on pixel
    
    
  }

  /**
   * Grid generation
   */
  generateGrid() {
    const gridSize = this.gridLineSize*this.gridLineSize;

    // Grid reset
    this.container.innerHTML = '';

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

  /**
   * Configuration user form
   */
  generateConfigForm() {
    const form = document.createElement('form');
    const gridLineSizeForm = document.createElement('input');
    const pixelSizeForm = document.createElement('input');
    const button = document.createElement('button');
    
    // Form HTML params
    form.className = 'configuration';
    
    // Input Grid line size HTML params
    gridLineSizeForm.type = 'number';
    gridLineSizeForm.name = 'grid-line-size';
    gridLineSizeForm.min = 1;
    gridLineSizeForm.max = 30;
    gridLineSizeForm.className = 'configuration_input';
    gridLineSizeForm.placeholder = 'Grid size (8 by default)';

    // Input pixel size HTML params
    pixelSizeForm.type = 'number';
    pixelSizeForm.name = 'pixel-size';
    pixelSizeForm.min = 10;
    pixelSizeForm.max = 90;
    pixelSizeForm.className = 'configuration_input';
    pixelSizeForm.placeholder = 'Pixels size (30 by default)';
    
    // Submit button HTML params
    button.type = 'submit';
    button.className = 'configuration_button';
    button.textContent = 'Generate';

    form.append(gridLineSizeForm);
    form.append(pixelSizeForm);
    form.append(button);

    // Attach submit event
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // If no values in input => set defaultValues
      this.pixelSize = pixelSizeForm.value ?  pixelSizeForm.value : this.pixelDefaultSize;
      this.gridLineSize = gridLineSizeForm.value ? gridLineSizeForm.value : this.gridLineDefaultSize;

      this.generateGrid();
    });

    document.body.prepend(form);
  }
  
}

const myPixelArt = new PixelArtCanvas();

window.addEventListener("DOMContentLoaded", () => myPixelArt.init());