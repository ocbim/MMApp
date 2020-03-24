const helpers = {};

helpers.estaAutenticado = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "No estas Autorizado");
    res.redirect("/users/signin");
  }
};

module.exports = helpers;
