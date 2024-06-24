import mongoose from "mongoose";
import Comment, { commentSchema } from "./comment.js";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: { type: String, required: true, unique: true},
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  publish_date: { type: Date, required: true },
  publisher: { type: String, required: true },
  pages: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
