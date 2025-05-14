import {Post} from "../models/model.js";


export const addPost = async (req, res) => {
    const {title, content} = req.body;
    try {
        const post = new Post({
            title,
            content,
            postedBy:req.id
        })
        await post.save();
        res.status(200).json({message: "Post added successfully"})
    }catch(err) {
        res.status(500).json({error: err})
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("postedBy", "firstName");
        res.status(200).json({message: "Success", posts})
    }catch(err) {
        res.status(500).json({error: err})
    }
}