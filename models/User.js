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
    phoneVerified: {
      type: Boolean,
      default: false
    },
    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{12}$/, 'Invalid Aadhaar number']
    },
    aadhaarVerified: {
      type: Boolean,
      default: false
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, 'Invalid pincode']
    },
    averageRating: {
      type: Number,
      default: 0
    },
  });
  
  const User = mongoose.model('User', userSchema);
  export default User;