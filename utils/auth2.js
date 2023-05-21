const withAuthAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuthAdmin;
