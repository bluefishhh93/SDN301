// {
//     "name": "Peter Pan",
//     "image": "images/alberto.png",
//     "designation": "Chief Epicurious Officer",
//     "abbr": "CEO",
//     "featured": "false",
//     "description": "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
//   },

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const leaderSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        abbr: {
            type: String,
            required: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: true,
        },
    },
)

const Leader = mongoose.model("Leader", leaderSchema);
export default Leader;