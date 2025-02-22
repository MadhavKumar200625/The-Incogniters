import mongoose from 'mongoose';

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
        type: String,
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
        required: false,
        trim: true
    },
});

const Barter = mongoose.model('Barter', barterSchema);
export default Barter;