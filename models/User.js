import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, 'Invalid phone number']
    },
    pincode: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0
    },
  });
  
  const User = mongoose.model('User', userSchema);
  export default User;