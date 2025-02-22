import User from "../models/user";
import Product from "../models/Product";

exports.getHomepage = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ reviewCount: -1 }).limit(5);
    const topUserIds = topUsers.map(user => user._id);

    const { pincode } = req.query;
    let nearestUsers = [];
    let nearestUserIds = [];

    if (pincode) {
      nearestUsers = await User.find({ pincode }).limit(10);
      nearestUserIds = nearestUsers.map(user => user._id);
    }
    const topUserProducts = await Product.find({
      owner: { $in: topUserIds }
    }).select('_id name image description category location');

    const nearestUserProducts = await Product.find({
      owner: { $in: nearestUserIds }
    }).select('_id name image description category location');

    res.json({
      topUserProducts,
      nearestUserProducts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};