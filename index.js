var path    = require('path')
,   express = require('express')
,   db      = require('mongoose')
,   config  = require('./config')
,   app     = express()
,   Post;

/**
 * Application Setup
 */
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.locals.pretty = true;

/**
 * Setup Models
 */
Post = new db.Schema({
  title: { type: String, required: true },
  body: { type: String }
});

db.model('Post', Post);

/**
 * Middleware and Routes
 */
app.use(require('morgan')());
app.use(require('body-parser')());
app.use(config.assets.assets());
app.use('/assets', config.assets.createServer());
require('./routes')(app);
app.use(require('errorhandler')());

/**
 * Initialize Database Connection and Application Server
 */
db.connection.on('error', function (err) {
  console.error(err);
});

db.connection.on('disconnected', function () {
  db.connect('mongodb://localhost:27017/angular_dev');
});

db.connect('mongodb://localhost:27017/angular_dev', {
  server: { poolSize: 1 }
});

app.listen(9292);
