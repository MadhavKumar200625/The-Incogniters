const mongoose = require('mongoose');

const barterSchema = new mongoose.Schema({
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    sellerProduct: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    buyer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
     },
    willingToExchange: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true 
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined'],
        default: 'Pending'
    },

    message: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
});

const Barter = mongoose.model('Barter', barterSchema);
export default Barter;