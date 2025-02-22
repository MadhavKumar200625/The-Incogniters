import User from "../models/User.js";
import Product from "../models/Product.js";

const getUserProducts = async (req, res) => {
  try {
    const { phoneNumber } = req.query;

    if (!phoneNumber) {
      return res.status(400).json({message: "Phone number is required" });
    }

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProducts = await Product.find({ owner: user._id })
      .select("_id name image description category location");

    res.status(200).json(
      userProducts
    );

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getUserProducts };