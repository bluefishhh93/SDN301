import mongoose from "mongoose";

const Schema = mongoose.Schema;

const genreSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    }
)

const Genre = mongoose.model("Genre", genreSchema);
export { Genre as default, genreSchema };