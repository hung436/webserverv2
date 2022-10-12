import db from "../models/index";
const getCategory = (currentPage, pageSize) => {
  return new Promise((resolve, reject) => {
    try {
      pageSize = pageSize || 10;

      let listCategory = db.Category.findAndCountAll({
        // include: [db.Size, db.Category],
        raw: true,
        nest: true,

        limit: pageSize * 1,
        offset: currentPage * pageSize,
      });
      resolve(listCategory);
    } catch (error) {
      reject(error);
    }
  });
};
const createCategory = (Name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await db.Category.findAll({ where: { name: Name } });
      if (category.length > 0) {
        const product = await db.Product.create({
          ProductName: Product.ProductName,
          // size: Product.Size,
          CategoryId: Number(Product.CategoryId),
          Description: Product.Description,
          Price: Number(Product.Price),
          Quantity: Number(Product.Quantity),
          Status: Number(Product.Status),
        });
        resolve({
          Success: true,
          message: "success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateProduct = (Product, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Product = await db.Product.findOne({ where: { Id: Product.Id } });
      // await uploadFile(file);
      const product = await db.Product.create({
        ProductName: Product.ProductName,
        // size: Product.Size,
        CategoryId: Number(Product.CategoryId),
        Description: Product.Description,
        Price: Number(Product.Price),
        Quantity: Number(Product.Quantity),
        Status: Number(Product.Status),
      });
      resolve({
        Success: true,
        message: "success",
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProduct = (Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Product = await db.Product.findOne({ where: { Id: Id }, raw: false });

      if (Product) {
        Product.Destroy();
      }
      resolve({
        Success: true,
        message: "success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCategory,
  createCategory,
};
