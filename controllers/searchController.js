import Fuse from "fuse.js";
import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    const products = await Product.find();

    const formattedProducts = products.map((product) => ({
      ...product._doc,
      tradeOptions: product.tradeOptions.join(", "), // Convert array to string
    }));

    if (!search) {
      return res.status(200).json({ products: formattedProducts });
    }

    const options = {
      keys: ["name", "category"],
      threshold: 0.3, 
      includeScore: true, 
    };

    const fuse = new Fuse(formattedProducts, options);
    const result = fuse.search(search).map((item) => item.item); 

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getProducts };