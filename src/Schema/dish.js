import mongoose from "mongoose";
import mongooseCurrency from "mongoose-currency";
import Comment, { commentSchema } from "./comment.js";

// mongoose.plugin(mongooseCurrency.loadType(mongoose));

// const Currency = mongoose.Types.Currency;
mongooseCurrency.loadType(mongoose);

const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema], // Assuming Comment is a Mongoose model
  },
  {
    timestamps: true,
  }
);

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
