exports.render = function (req, res, next) {
  res.render(req.param('0'), function (err, html) {
    if (err) return next(err);
    if (!html) return res.send(404);
    res.send(html);
  });
}
