var routes = require('./controllers');

module.exports = function (app) {
  app.route('/')
    .get(routes.dashboard.render);

  app.route('/templates/:path/:name')
    .get(routes.templates.render);

  app.route('/api/posts')
    .get(routes.posts.load)
    .get(routes.posts.index)
    .post(routes.posts.create);

  app.route('/api/posts/:post_id')
    .all(routes.posts.load)
    .get(routes.posts.show)
    .put(routes.posts.update)
    .delete(routes.posts.destroy);

  app.route('*')
    .get(routes.dashboard.render);
}
