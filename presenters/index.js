var distill = require('distill');

module.exports = function (item) {
  return distill(item)
    .field('id', '_id')
    .field('title')
    .field('body')
    .bottle();
}
