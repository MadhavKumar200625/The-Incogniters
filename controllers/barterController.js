import Barter from "../models/Barter.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const initializeBarter = async (req, res) => {
  try {
    console.log("Request Body:", req.query);

    const { sellerProductId, willingToExchange, buyerPhone } = req.query;

    if (!sellerProductId || !buyerPhone) {
      return res.status(400).json({ message: "Seller product and buyer phone number are required." });
    }

    const requestedProduct = await Product.findById({_id:sellerProductId});

    if (!requestedProduct) {
      return res.status(404).json({ message: "Requested product not found." });
    }

    const buyer = await User.findOne({ phoneNumber: buyerPhone });

    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found." });
    }

    const barterRequest = new Barter({
      seller: requestedProduct.owner, 
      sellerProduct: requestedProduct._id, 
      buyer: buyer._id, 
      willingToExchange,
      status: "Pending",
      message: ""
    });

    await barterRequest.save();
    res.status(201).json({ success: true, message: "Barter request successfully created." });
  } catch (error) {
    console.error("Error Initializing Barter:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
const updateBarterStatus = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { barterId, status, message } = req.body;

    if (!barterId || !status) {
      return res.status(400).json({ message: "Barter ID and status are required." });
    }

    if (!["Accepted", "Declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const barterRequest = await Barter.findById(barterId);
    if (!barterRequest) {
      return res.status(404).json({ message: "Barter request not found." });
    }

    barterRequest.status = status;
    barterRequest.message = message || "";
    await barterRequest.save();
    
    res.status(200).json(barterRequest);
  } catch (error) {
    console.error("Error Updating Barter Status:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllBarterRequests = async (req, res) => {
  try {
    const barters = await Barter.find({ status: { $ne: "Accepted" } }).populate("sellerProduct");

    res.status(200).json(barters);
  } catch (error) {
    console.error("Error Fetching Barter Requests:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export { initializeBarter, updateBarterStatus, getAllBarterRequests };