const fs = require('fs');
const samples = JSON.parse(fs.readFileSync("./samples/samples.json"))
module.exports.samples = samples