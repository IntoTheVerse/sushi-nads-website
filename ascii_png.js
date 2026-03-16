const fs = require('fs');
const zlib = require('zlib');

function renderAscii(filename) {
    const buffer = fs.readFileSync(filename);
    let offset = 8;
    let idatBuffers = [];
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    
    while (offset < buffer.length) {
        const length = buffer.readUInt32BE(offset);
        const type = buffer.toString('ascii', offset + 4, offset + 8);
        if (type === 'IDAT') {
            idatBuffers.push(buffer.subarray(offset + 8, offset + 8 + length));
        }
        offset += length + 12;
    }
    
    const compressed = Buffer.concat(idatBuffers);
    const uncompressed = zlib.inflateSync(compressed);
    
    const cols = 80;
    const rows = 40;
    const stepX = width / cols;
    const stepY = height / rows;
    
    let out = '';
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const px = Math.floor(x * stepX);
            const py = Math.floor(y * stepY);
            const idx = (py * width + px) * 4 + py; // add py for filter byte
            const a = uncompressed[idx + 4]; // wait, +1 for filter, then +3 for alpha (idx + 1 + 3)
            const realIdx = py * (width * 4 + 1) + 1 + px * 4;
            const alpha = uncompressed[realIdx + 3];
            out += alpha > 128 ? '#' : '.';
        }
        out += '\n';
    }
    console.log(out);
}
renderAscii('public/img/confine.png');
