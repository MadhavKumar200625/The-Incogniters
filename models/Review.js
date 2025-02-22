import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  },
});

reviewSchema.post('save', async function () {
  const Review = this.constructor;
  const reviews = await Review.find({ reviewed: this.reviewed });

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = parseFloat((sum / reviews.length).toFixed(1));

  await mongoose.model('User').findByIdAndUpdate(this.reviewed, { averageRating });
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;