exports.index = function(req, res) {
  res.render('index');
};

exports.partials = function(req, res) {
  var partial = req.params[0];
  res.render('partials/' + partial);
};
