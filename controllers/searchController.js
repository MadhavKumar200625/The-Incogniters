import fuse from (fuse.js)
import Product from "../models/Product";

exports.getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const products = await Product.find();

    const options = {
      keys: [
        { name: 'name', weight: 0.7 }, 
        { name: 'category', weight: 0.3 }, 
      ],
      threshold: 0.3, 
    };

    const fuse = new Fuse(products, options);
    const result = fuse.search(search).map(item => item.item); 

    res.json({ success: true, products: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};