const authenticate = (req, res, next) => {
    // TODO: Add a comment describing the functionality of this if statement
    //redirectly to login if user is not logged in
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = authenticate;
  