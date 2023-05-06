const withAuth = (req, res, next) => {
  console.log('Session data:', req.session);
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
