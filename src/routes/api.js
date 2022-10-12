import express from "express";
import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ProductController";
import CategoryController from "../controllers/CategoryController";
import { validate } from "../validation/AuthValidator.odb";
import { isAuth, isAdmin } from "./../middleware/AuthMiddleware";

const multer = require("multer");
const upload = multer();
let router = express.Router();
const initApiRoute = (app) => {
  //Auth
  router.post("/auth/login", validate.validateLogin(), AuthController.Login);
  router.post(
    "/auth/register",
    validate.validateRegisterUser(),
    AuthController.Register
  );
  router.post("/auth/refreshtoken", AuthController.RefreshToken);
  router.post("/auth/facebook", AuthController.LoginFacebook);

  ///===================================Category routes=================================================
  router.get("/category/get", CategoryController.GetCategory);
  router.post("/category/create", CategoryController.CreateCategory);
  // router.put("/category/update", CategoryController.UpdateCategory);
  // router.delete("/category/delete", CategoryController.DeleteCategory);

  //Products routes
  router.get(
    "/admin/products/get-all-product",
    isAdmin,
    validate.GetAllProducts(),
    ProductController.GetAllProducts
  );
  // router.get("/products/:id", AuthController.GetProductById);
  router.post(
    "/admin/products/createproduct",
    upload.single("ProductImage"),
    ProductController.CreateProduct
  );

  return app.use("/api/v1", router);
};
module.exports = initApiRoute;
