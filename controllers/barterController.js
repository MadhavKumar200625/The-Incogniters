import Barter from "../models/Barter.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Initialize Barter
const initializeBarter = async (req, res) => {
  try {
    const { requesterProductId, requestedProductId } = req.body;

    if (!requesterProductId || !requestedProductId) {
      return res.status(400).json({ message: "Product IDs are required." });
    }

    // Fetch owner details
    const requesterProduct = await Product.findById(requesterProductId);
    const requestedProduct = await Product.findById(requestedProductId);

    if (!requesterProduct || !requestedProduct) {
      return res.status(404).json({ message: "One or both products not found." });
    }

    // Creating barter request
    const barterRequest = new Barter({
      seller: requestedProduct.owner, // The owner of the requested product (who will approve/reject)
      sellerProduct: requestedProductId,
      buyer: requesterProduct.owner, // The requester
      willingToExchange: requesterProductId,
      status: "Pending",
      message: "" // Initially empty
    });

    await barterRequest.save();
    res.status(201).json({ message: "Barter request sent successfully", barterRequest });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Update Barter Status
const updateBarterStatus = async (req, res) => {
  try {
    const { barterId, status, message } = req.body;

    if (!barterId || !status || !message) {
      return res.status(400).json({ message: "Barter ID, status, and message are required." });
    }

    // Validating status
    if (!["Accepted", "Declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const barterRequest = await Barter.findById(barterId);

    if (!barterRequest) {
      return res.status(404).json({ message: "Barter request not found." });
    }

    // Only the seller (owner of requested product) can update status
    barterRequest.status = status;
    barterRequest.message = message; // Adding reason for acceptance/decline

    await barterRequest.save();
    res.status(200).json({ message: `Barter request ${status.toLowerCase()} successfully`, barterRequest });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { initializeBarter, updateBarterStatus };