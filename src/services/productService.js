import db from "../models/index";
import { uploadFile } from "../helpers/uploadfile.helper";
const getAllProducts = (currentPage, pageSize) => {
  return new Promise((resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};
const createProduct = (Product, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      await uploadFile(file);
      console.log("ok");
      resolve({
        code: 0,
        message: "success",
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { getAllProducts, createProduct };
