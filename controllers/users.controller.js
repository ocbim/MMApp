const usersCtrl = {};
const Users = require("../models/users.model");
const passport = require("passport");

//  Controlador de renderizado SignUp
usersCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};
//  Controlador POST  SignUp
usersCtrl.signUp = async (req, res) => {
  const errors = [];
  const { email, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    errors.push({ text: "Las Passwords no son iguales" });
  }
  if (password.length < 8) {
    errors.push({ text: "La contraseña tiene que ser mayor de 8 caracteres" });
  }
  if (await Users.exists({ email: `${email}` })) {
    console.log(await Users.exists({ email: `${email}` }));
    errors.push({ text: `El ${email} ya esta Registrado.` });
  }
  if (errors.length > 0) {
    res.render("users/signup", { email, password, confirmPassword, errors });
  } else {
    const nuevoUsuario = new Users({ email, password });
    await nuevoUsuario.save();
    req.flash("success_msg", "Registro Exitoso");
    res.redirect("/users/signin");
  }
};

//  Controlador de renderizado SignIn
usersCtrl.renderSignInForm = (req, res) => {
  res.render("users/signin");
};
//  Controlador POST signIn
usersCtrl.signIn = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/ordenes",
  failureFlash: true
});

//  Controlador de Logout

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Haz Cerrado Seccion");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;
