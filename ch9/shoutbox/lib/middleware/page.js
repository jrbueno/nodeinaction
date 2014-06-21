module.exports = function (fn, perpage) {
  perpage = perpage || 10;
  return function (req, res, next) {
    //Catches potential issues with /josesfsfsf which is NaN
    var pg = req.param('page') || '1';
    if(Number.isNaN(parseInt(pg,10))) {
      res.render('404');
    } else {
      var page = Math.max(pg,1) - 1;
      fn(function (err, total) {
        if (err) return next(err);

        req.page = res.locals.page = {
          number: page,
          perpage: perpage,
          from: page * perpage,
          to: page * perpage + perpage - 1,
          total: total,
          count: Math.ceil(total/perpage)
        };
        next();
      });
    }
  };
};
