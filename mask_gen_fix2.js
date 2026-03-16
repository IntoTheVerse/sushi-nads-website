const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/img/confine.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    for (let y = 0; y < this.height; y++) {
        let inMask = true; // We start assuming we are inside the mask area from the left edge
        
        for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;
            let a = this.data[idx + 3];

            // In the confine.png, the glowing border acts as the right edge.
            // When we encounter non-transparent pixels, it means we hit the border.
            // After hitting the border, the rest of the row should be transparent.
            
            if (inMask && a > 10) {
                inMask = false; // We hit the border, exit the mask area
            }

            if (inMask) {
                // Inside mask area: fully opaque
                this.data[idx] = 0;
                this.data[idx+1] = 0;
                this.data[idx+2] = 0;
                this.data[idx+3] = 255; 
            } else {
                // Outside mask area: fully transparent
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
