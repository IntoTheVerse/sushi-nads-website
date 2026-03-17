const fs = require('fs');
const zlib = require('zlib');

function getPngAlphaStats(filename) {
    const buffer = fs.readFileSync(filename);
    let offset = 8;
    let idatBuffers = [];
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    const bitDepth = buffer[24];
    const colorType = buffer[25];
    
    while (offset < buffer.length) {
        const length = buffer.readUInt32BE(offset);
        const type = buffer.toString('ascii', offset + 4, offset + 8);
        if (type === 'IDAT') {
            idatBuffers.push(buffer.subarray(offset + 8, offset + 8 + length));
        }
        offset += length + 12;
    }
    
    if (colorType === 6) { // RGBA
        const compressed = Buffer.concat(idatBuffers);
        const uncompressed = zlib.inflateSync(compressed);
        let transparentCount = 0;
        let opaqueCount = 0;
        
        let i = 0;
        for (let y = 0; y < height; y++) {
            i++; // skip filter byte
            for (let x = 0; x < width; x++) {
                const a = uncompressed[i + 3];
                if (a === 0) transparentCount++;
                else opaqueCount++;
                i += 4;
            }
        }
        console.log(`Transparent pixels: ${transparentCount}, Opaque: ${opaqueCount}`);
    } else {
        console.log('Not RGBA, colorType:', colorType);
    }
}
getPngAlphaStats('public/img/img-comp/confine.png');
