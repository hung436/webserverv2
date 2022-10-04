const { validationResult } = require("express-validator");
import authService from "../services/authService";
var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
//Login
const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  let data = await authService.Login(email, password);
  return res.status(200).json(data);
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
//LoginFacebook
const LoginFacebook = async (req, res) => {
  let data = await authService.LoginFacebook(req.body);

  return res.status(200).json(data);
};
//Refresh Token
const RefreshToken = async (req, res) => {
  let data = await authService.RefreshToken(req.body.refreshToken);
  return res.status(200).json(data);
};
module.exports = { Login, Register, LoginFacebook, RefreshToken };
