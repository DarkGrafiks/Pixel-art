class PixelArtCanvas {
  constructor(config) {
    this.container = document.getElementById('canvas');
    this.gridLineDefaultSize = 8;
    this.pixelDefaultSize = 30;
    this.gridLineSize = this.gridLineDefaultSize;
    this.pixelSize = this.pixelDefaultSize;
    this.nbPixelColors = 4;

    this.selectedColor;
  }

  init() {
    // Pixels grid generation
    this.generateGrid();
    
    // Grid size configuration 
    // And color change on pixels click
    this.generateConfigForm();

    // Select colors interface generation
    this.generateColorsSelector();
  }

  /**
   * Grid generation UI
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
      pixel.dataset.pixelColor = 1; // Add data attribute to change pixel color
      pixel.style = `width: ${this.pixelSize}px; height: ${this.pixelSize}px`;

      // Attach event onclick to change color
      pixel.addEventListener('click', (e) => {

        if(this.selectedColor) {
          e.target.dataset.pixelColor = this.selectedColor;
        }else{
          const currentColor = Number(e.target.dataset.pixelColor);
  
          // If current color is latest of pixelColors, reset to 1, else increment.
          e.target.dataset.pixelColor = (currentColor >= this.nbPixelColors) ? 1 : Number(e.target.dataset.pixelColor) + 1;
        }

      });

      this.container.append(pixel);
    }
  }

  /**
   * Configuration user form UI
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

  /**
   * Generator colors selector UI
   */
  generateColorsSelector() {
    const configContainer = document.createElement('ul');
    configContainer.className = 'color_selector_container';

    for(let i=0; i<this.nbPixelColors; i++) {
      const colorSelector = document.createElement('li');
      const itemClass = 'color_selector_item';
      colorSelector.className = itemClass;
      colorSelector.dataset.selectedColor = i+1;

      // Attach event 
      colorSelector.addEventListener('click', (e) => {
        const selectedclass = 'item--selected';
        
        // Remove selected class on all other item
        document.querySelectorAll(`.${itemClass}`).forEach(item => {
          item.classList.remove(selectedclass);
        });
        
        // Add target value dataset to selectedColor property, and selected class on item only if dataset value !== actual selected color
        if(e.target.dataset.selectedColor !== this.selectedColor) {
          this.selectedColor = e.target.dataset.selectedColor;
          e.target.classList.add(selectedclass);
        }else {
          this.selectedColor = null;
          e.target.classList.remove(selectedclass);
        }
      });

      configContainer.appendChild(colorSelector);
    }

    this.container.append(configContainer);
  }

}

const myPixelArt = new PixelArtCanvas();

window.addEventListener("DOMContentLoaded", () => myPixelArt.init());