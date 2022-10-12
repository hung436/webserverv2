import categoryService from "../services/categoryService";
const { validationResult } = require("express-validator");
const GetCategory = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  const { currentPage, pageSize } = req.body;
  let data = await categoryService.getCategory(currentPage, pageSize);
  return res.status(200).json(data);
};
const CreateCategory = async (req, res) => {
  const { Name } = req.body;
  //
  let data = await categoryService.createCategory(Name);

  return res.status(200).json({ data });
};
module.exports = { GetCategory, CreateCategory };
