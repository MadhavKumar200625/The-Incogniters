import Product from "../models/Product.js";

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, image, description, category, owner, tradeOptions, location } = req.body;
    
    if (!name || !image || !description || !category || !owner || !location) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      image,
      description,
      category,
      owner,
      tradeOptions,
      location
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

// View all products
const viewAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

export { addProduct, viewAllProducts };