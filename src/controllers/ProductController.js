import productService from "../services/productService";
const { validationResult } = require("express-validator");
const GetAllProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPage, pageSize } = req.body;
  let data = await productService.getAllProducts(currentPage, pageSize);
  return res.status(200).json(data);
};
const CreateProduct = async (req, res) => {
  const { body, file } = req;
  if (!body || !file) return res.status(400).json("error");
  let data = await productService.createProduct(body, file);
  return res.status(200).json({ data });
};
module.exports = { GetAllProducts, CreateProduct };
