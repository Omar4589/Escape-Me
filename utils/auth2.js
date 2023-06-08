// Middleware to authenticate if a user is an admin
const withAuthAdmin = (req, res, next) => {
  // Check if the user is an admin
  if (!req.session.isAdmin) {
    // If not, redirect to login
    res.redirect('/login');
  } else {
    // Otherwise, proceed with the request
    next();
  }
};

module.exports = withAuthAdmin;
