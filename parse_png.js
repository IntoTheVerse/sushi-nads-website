const fs = require('fs');

function parsePNG(buffer) {
    // Very basic PNG parse assuming chunks without unpacking compressed data
    console.log('PNG size:', buffer.readUInt32BE(16), 'x', buffer.readUInt32BE(20));
}

const b = fs.readFileSync('public/img/confine.png');
parsePNG(b);
