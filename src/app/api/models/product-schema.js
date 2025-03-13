import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Image,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  stoke: {
    type: Number,
    required: true,
  },
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
