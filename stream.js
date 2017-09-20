//Задание #1
const crypto = require('crypto');
const fs = require("fs");

const hash = crypto.createHash('sha256');

const input = fs.createReadStream("data.txt");
const output = fs.createWriteStream("hash.txt");
input.pipe(hash).pipe(output);
input.pipe(hash).pipe(process.stdout);

//Задание #2
const  {Transform} = require('stream');

const output2 = fs.createWriteStream("hexHash.txt");
class HexTransform extends Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunk, encoding, callback) {
    let hexChunk = chunk.toString('hex');
    this.push(hexChunk);
    callback();
   }
}


const hexTransformStream = new HexTransform();

input.pipe(hash)
    .pipe(hexTransformStream)
    .pipe(output2);