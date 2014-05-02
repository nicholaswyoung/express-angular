exports.render = function (req, res, next) {
  var template = [req.param('path'), req.param('name')].join('/')
  res.render(template, function (err, html) {
    if (err) return next(err);
    if (!html) return res.send(404);
    res.send(html);
  });
}
