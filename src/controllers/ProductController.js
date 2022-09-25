import productService from "../services/productService";

const GetAllProducts = async (req, res) => {
  let data = await productService.getAllProducts(req.body);
  return res.status(200).json(data);
};
const CreateProduct = async (req, res) => {
  const { body, file } = req;
  if (!body || !file) return res.status(400).json("error");
  let data = await productService.createProduct(body, file);
  return res.status(200).json({ data });
};
module.exports = { GetAllProducts, CreateProduct };
