const authenticate = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    } else {
      next();
    }
  };
  
  module.exports = authenticate;
  