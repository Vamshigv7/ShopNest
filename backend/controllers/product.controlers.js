const Products = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductsById = async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    if (products) {
      res.json(products);
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock
    } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.unsigned_upload(
        req.file.path,
        "shopnest_uploads"
      );

      imageUrl = result.secure_url;
    }

    const product = new Products({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      imageUrl,
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Product not created",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const products = await Products.findById(req.params.id);

    if (products) {
      products.name = name || products.name;
      products.description = description || products.description;
      products.price = price || products.price;
      products.category = category || products.category;
      products.stock = stock || products.stock;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        products.imageUrl = result.secure_url;
      }
      const updateProduct = await products.save();
      res.status(201).json(updateProduct);
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    if (products) {
      await products.deleteOne();
      res.json({ message: "Product removed." });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    res.satus(404).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
