const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/img/confine.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    for (let y = 0; y < this.height; y++) {
        let hitBorder = false;
        // From left to right
        for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;
            let a = this.data[idx + 3]; // alpha
            
            if (!hitBorder) {
                if (a > 10) { 
                    hitBorder = true;
                    // It's the border, leave its alpha or make it opaque
                    this.data[idx+3] = 255; 
                } else {
                    // Inside the left panel (before hitting the border)
                    // We want this to be fully opaque (black)
                    this.data[idx] = 0;   // R
                    this.data[idx+1] = 0; // G
                    this.data[idx+2] = 0; // B
                    this.data[idx+3] = 255; // A
                }
            } else {
                // We passed the border, this is the right panel
                // We want this to be fully transparent
                this.data[idx] = 0;
                this.data[idx+1] = 0;
                this.data[idx+2] = 0;
                this.data[idx+3] = 0;
            }
        }
    }

    this.pack().pipe(fs.createWriteStream('public/img/mask.png')).on('finish', () => {
        console.log('Mask generated successfully!');
    });
  });
