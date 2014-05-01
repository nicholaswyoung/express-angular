var routes = require('./controllers');

module.exports = function (app) {
  app.route('/')
    .get(routes.dashboard.render);

  app.route('/templates/*')
    .get(routes.templates.render);

  app.route('/posts')
    .get(routes.posts.load)
    .get(routes.posts.index)
    .post(routes.posts.create);

  app.route('/posts/:post_id')
    .all(routes.posts.load)
    .get(routes.posts.show)
    .put(routes.posts.update)
    .delete(routes.posts.destroy);
}
