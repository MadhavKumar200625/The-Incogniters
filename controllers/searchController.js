import Fuse from "fuse.js";
import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    // Fetch all products from the database
    const products = await Product.find();

    // Convert tradeOptions array into a string
    const formattedProducts = products.map((product) => ({
      ...product._doc,
      tradeOptions: product.tradeOptions.join(", "), // Convert array to string
    }));

    // If no search term is provided, return all products
    if (!search) {
      return res.status(200).json({ products: formattedProducts });
    }

    // Fuzzy search configuration
    const options = {
      keys: ["name", "category"], // Directly reference keys
      threshold: 0.3, // Matching sensitivity
      includeScore: true, // Helps filter results better
    };

    const fuse = new Fuse(formattedProducts, options);
    const result = fuse.search(search).map((item) => item.item); // Extract only matched products

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getProducts };