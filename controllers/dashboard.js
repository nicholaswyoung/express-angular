exports.render = function (req, res, next) {
  if (!req.accepts('html')) return next();
  res.render('dashboard/index');
}
