var path          = require('path')
,   Mincer        = require('mincer')
,   ConnectMincer = require('connect-mincer');

module.exports = new ConnectMincer({
  mincer: Mincer,
  root: path.join(__dirname, '..'),
  mountPoint: '/assets',
  manifestFile: path.join(__dirname, '..', 'public/assets/manifest.json'),
  paths: [
    'assets/css',
    'assets/js',
    'vendor/assets/css',
    'vendor/assets/js'
  ]
});
