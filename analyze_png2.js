const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/img/confine.png')
  .pipe(new PNG())
  .on('parsed', function() {
    let opaqueCount = 0;
    let semiTransparentCount = 0;
    let completelyTransparentCount = 0;
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            const alpha = this.data[idx+3];
            if (alpha === 255) opaqueCount++;
            else if (alpha === 0) completelyTransparentCount++;
            else semiTransparentCount++;
        }
    }
    console.log(`Dimensions: ${this.width} x ${this.height}`);
    console.log(`Opaque: ${opaqueCount}`);
    console.log(`Semi-transparent: ${semiTransparentCount}`);
    console.log(`Transparent: ${completelyTransparentCount}`);
  });
