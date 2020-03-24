const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/users.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      const user = await Users.findOne({ email: email });

      //  Coincidencias del Email de usuario
      if (!user) {
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        //  Coincidencia de Password de usuario
        const coinciden = await user.compararPassword(password);
        if (coinciden) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrecta" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(null, user);
  });
});
