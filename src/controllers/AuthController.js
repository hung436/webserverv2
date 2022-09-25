const { validationResult } = require("express-validator");
import authService from "../services/authService";
var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
//Login
const Login = (req, res) => {
  console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return res.status(200).json({ code: 0, message: "ok" });
};

//Register
const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = await authService.Register(req.body);

  return res.status(200).json(data);
};

const LoginFacebook = async (req, res) => {
  let data = await authService.LoginFacebook(req.body);

  return res.status(200).json(data);
};
module.exports = { Login, Register, LoginFacebook };
