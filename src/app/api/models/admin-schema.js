import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Image,
    required: true,
  },

  user: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
  },

  product: {
    type: [mongoose.Types.ObjectId],
    ref: "Product",
  },
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
