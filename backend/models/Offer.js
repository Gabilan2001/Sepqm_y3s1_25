// // models/Offer.js
// import mongoose from 'mongoose';

// const offerSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     discount: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 100,
//     },
//     validUntil: {
//       type: Date,
//       required: true,
//     },
//     imageUrl: {
//       type: String,
//       required: true,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// const Offer = mongoose.model('Offer', offerSchema);

// export default Offer;
import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;