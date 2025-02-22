import Product from "../models/Product.js";

const getProductDetails = async (req, res) => {
  try {
    const { _id } = req.query;

    if (!_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({  message: "Internal Server Error" });
  }
};

export { getProductDetails };