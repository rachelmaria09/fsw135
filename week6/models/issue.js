const mongoose = require("mongoose")
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    upvotes: {
        type: Number,
        default: 0 
    },
    downvotes: {
        type: Number,
        default: 0 
    },
    voters: {
        type: Array,
        default: [] 
    },
    comments: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Issue", issueSchema)