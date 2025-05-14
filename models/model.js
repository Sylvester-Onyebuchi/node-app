import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    password: String,
    verificationToken: String,
    verificationTokenExpires: Date,

}, { timestamps: true });

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema)
export const Post = mongoose.model("Post", PostSchema)