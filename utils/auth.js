const withAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
    // If not, redirect to login
    res.redirect('/login');
  } else {
    // If they're an admin, redirect to admin home
    if (req.session.isAdmin) {
      res.redirect('/admin/home');
    } else {
      // Otherwise, proceed with the request
      next();
    }
  }
};

module.exports = withAuth;
