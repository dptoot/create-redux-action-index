const log = require('./log');
const writeIndex = require('./writeIndex');

module.exports = function(dirs, options) {
    dirs.forEach(dir => writeIndex(dir, options));
}