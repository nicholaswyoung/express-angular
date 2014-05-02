var Post    = require('mongoose').model('Post')
,   extend  = require('lodash').extend
,   present = require('../presenters');

exports.index = function (req, res) {
  res.json(present(req.posts));
}

exports.show = function (req, res) {
  res.json(present(req.post));
}

exports.create = function (req, res, next) {
  req.post = new Post(req.body);
  req.post.save(function (err) {
    if (err) return next(err);
    res.json(present(req.post));
  });
}

exports.update = function (req, res, next) {
  req.post = extend(req.post, req.body);
  req.post.save(function (err) {
    if (err) return next(err);
    res.json(present(req.post));
  });
}

exports.destroy = function (req, res, next) {
  req.post.remove(function (err) {
    if (err) return next(err);
    res.send(200);
  });
}

exports.load = function (req, res, next) {
  if (req.param('post_id')) {
    Post.findById(req.param('post_id'))
    .exec(function (err, post) {
      if (err) return next(err);
      if (!post) return res.send(404);
      req.post = post;
      next();
    });
  } else {
    Post.find({})
    .exec(function (err, posts) {
      if (err) return next(err);
      req.posts = posts;
      next();
    });
  }
}
