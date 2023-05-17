const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    if (req.session.isAdmin) {
      res.redirect('/admin/home');
    } else {
      next();
    }
  }
};

module.exports = withAuth;
