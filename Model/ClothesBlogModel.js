import mongoose from "mongoose";

const clothesblogSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    imageList: {
      type: Array,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ClotheBlog = mongoose.model("ClotheBlog", clothesblogSchema);
export default ClotheBlog;
