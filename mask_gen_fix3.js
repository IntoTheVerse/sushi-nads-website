const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/img/img-comp/confine.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    for (let y = 0; y < this.height; y++) {
        let insideMask = true;
        
        for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;
            let a = this.data[idx + 3];

            // Some images have thin transparent lines on the very edges
            // the confine.png has a big boundary in the middle
            
            // let's be more robust: we hit the border when we see consecutive opaque pixels
            if (insideMask && a > 50) {
               let nextPixA = x < this.width - 1 ? this.data[idx + 4 + 3] : 0;
               if (nextPixA > 50) {
                 insideMask = false;
               }
            }

            if (insideMask) {
                // Inside: white and opaque (masks often use alpha, but standard webkit-mask uses alpha channel of image where black = opaque, transparent = transparent. Actually it uses alpha directly so color doesn't matter, but black is fine.
                this.data[idx] = 0;
                this.data[idx+1] = 0;
                this.data[idx+2] = 0;
                this.data[idx+3] = 255; 
            } else {
                // Outside: fully transparent
                this.data[idx] = 0;
                this.data[idx+1] = 0;
                this.data[idx+2] = 0;
                this.data[idx+3] = 0;
            }
        }
    }

    this.pack().pipe(fs.createWriteStream('public/img/img-comp/mask.png')).on('finish', () => {
        console.log('Mask 3 generated successfully!');
    });
  });
