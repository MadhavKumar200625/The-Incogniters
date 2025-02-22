import User from "../models/User.js";
import Product from "../models/Product.js";

const getHomepage = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ reviewCount: -1 }).limit(3);
    const topUserIds = topUsers.map(user => user._id);

    const { phoneNumber } = req.query;
    let nearestUsers = [];
    let nearestUserIds = [];
    let pincode = null;

    if (phoneNumber) {
      const user = await User.findOne({ phoneNumber });
      if (user) {
        pincode = String(user.pincode);
      }
    }

    if (pincode) {
      nearestUsers = await User.find({ pincode }).limit(3);
      nearestUserIds = nearestUsers.map(user => user._id);
    }

    const formatProducts = (products) =>
      products.map((product) => ({
        ...product.toObject(),
        tradeOptions: product.tradeOptions.length > 0 
          ? product.tradeOptions.join(", ") 
          : "No trade options available",
      }));

    const topUserProducts = formatProducts(
      await Product.find({ owner: { $in: topUserIds } })
        .select('_id name image description tradeOptions location')
    );

    const nearestUserProducts = formatProducts(
      await Product.find({ owner: { $in: nearestUserIds } })
        .select('_id name image description tradeOptions location')
    );

    res.json({ topUserProducts, nearestUserProducts });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { getHomepage };