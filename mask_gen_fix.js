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
                // Determine if we've hit the glowing border or the solid black line
                // the confine.png has transparency mostly, and a glowing border on the right
                if (a > 10) { 
                    hitBorder = true;
                    // It's the border, make it transparent so animation doesn't bleed through the border glow
                    this.data[idx] = 0;
                    this.data[idx+1] = 0;
                    this.data[idx+2] = 0;
                    this.data[idx+3] = 0; 
                } else {
                    // Inside the left panel (before hitting the right border)
                    // Make it fully opaque (to act as the mask's visible area)
                    this.data[idx] = 0;   // R
                    this.data[idx+1] = 0; // G
                    this.data[idx+2] = 0; // B
                    this.data[idx+3] = 255; // A
                }
            } else {
                // We passed the border, this is the right panel area
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
