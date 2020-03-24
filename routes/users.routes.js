const { Router } = require("express");
const router = Router();

//  Controladores importados
const {
  signIn,
  signUp,
  renderSignInForm,
  renderSignUpForm,
  logout
} = require("../controllers/users.controller");

/* GET users listing. */
router.get("/users/signin", renderSignInForm);
router.get("/users/signup", renderSignUpForm);

/** POST users listing */
router.post("/users/signin", signIn);

router.post("/users/signup", signUp);

router.get("/users/logout", logout);

module.exports = router;
