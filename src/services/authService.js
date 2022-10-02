import db from "../models/index";
import bcrypt from "bcrypt";
require("dotenv").config();
import jwtHelper from "../helpers/jwt.helper";
const saltRounds = 10;
let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "10m";
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "hungdt";
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      let hash = await bcrypt.hashSync(password, salt);

      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};
const Login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(email, password);
      let data = {};
      let isExist = await db.Customer.findOne({ where: { email: email } });
      if (isExist) {
        let user = await db.Customer.findOne({
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            data.Success = true;
            data.message = "Đăng nhập thành công";
            let { password, id_facebook, createdAt, updatedAt, ...rest } = user;
            data.data = rest;

            const userFakeData = {
              _id: user.id,
              name: user.Name,
              email: user.email,
              RoleId: user.RoleId,
            };
            console.log(accessTokenSecret);
            console.log(process.env.ACCESS_TOKEN_SECRET);
            const accessToken = await jwtHelper.generateToken(
              userFakeData,
              accessTokenSecret,
              accessTokenLife
            );
            const refreshToken = await jwtHelper.generateToken(
              userFakeData,
              refreshTokenSecret,
              refreshTokenLife
            );
            data.data.accessToken = accessToken;
            data.data.refreshToken = refreshToken;
          } else {
            data.Success = false;
            data.message = "Wrong password";
          }
        } else {
          data.Success = false;
          data.message = "User not found";
        }
      } else {
        data.error = false;
        data.message =
          "Your Email isn't exist in your system. Please try other email!";
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const Register = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.Customer.findOne({ where: { email: user.email } });
      if (check) {
        resolve({
          code: 1,
          message: "Email already exists",
        });
      } else {
        let hashPassword = await hashUserPassword(user.password);
        await db.Customer.create({
          email: user.email,
          password: hashPassword,
          firstName: user.firstName,
          lastName: user.lastName,
        });
        resolve({ code: 0, message: "success" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const LoginFacebook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Customer.findOne({
        where: { id_facebook: data.id_fb },
      });

      if (user) {
        const userFakeData = {
          _id: user.id,
          name: user.firstName,
          email: user.email,
        };

        const accessToken = await jwtHelper.generateToken(
          userFakeData,
          accessTokenSecret,
          accessTokenLife
        );
        const refreshToken = await jwtHelper.generateToken(
          userFakeData,
          refreshTokenSecret,
          refreshTokenLife
        );
        resolve({
          code: 0,
          message: "Login Ok",
          data: {
            accessToken,
            refreshToken,
          },
        });
      } else {
        await db.Customer.create({
          id_facebook: data.id_fb,
          avatar: data.avatar,
          firstName: data.name,
          email: data.email,
          password: "empty",
        });
        user = await db.Customer.findOne({
          where: { id_facebook: data.id_fb },
        });
        const userFakeData = {
          _id: user.id,
          name: user.firstName,
          email: user.email,
        };
        const accessToken = await jwtHelper.generateToken(
          userFakeData,
          accessTokenSecret,
          accessTokenLife
        );
        const refreshToken = await jwtHelper.generateToken(
          userFakeData,
          refreshTokenSecret,
          refreshTokenLife
        );
        resolve({
          code: 0,
          message: "Login Ok",
          data: {
            accessToken,
            refreshToken,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { Register, Login, LoginFacebook };
