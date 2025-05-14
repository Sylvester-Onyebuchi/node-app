import {Post, User} from "../models/model.js";


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
        const posts = await Post.find().populate("postedBy", "_id firstName");
        res.status(200).json({message: "Success", posts})
    }catch(err) {
        res.status(500).json({error: err})
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // const user = await  User.findById(post.postedBy)

        if (!post.postedBy.equals(req.id)) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });

        }
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Post deleted successfully" });


    } catch (err) {
        res.status(500).json({ error: err.message || "Internal server error" });
    }
};
export const updatePost = async (req, res) => {
    const {title, content} = req.body;
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }


        if (!post.postedBy.equals(req.id)) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own posts" });

        }
        const updatedPost ={
            title,
            content,
        }
        await  Post.findByIdAndUpdate(req.params.id, updatedPost)
        return res.status(200).json({ message: "Post updated successfully" });


    } catch (err) {
        res.status(500).json({ error: err.message || "Internal server error" });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json({post: post});
    }catch(err) {
        res.status(500).json({ error: err.message || "Internal server error" });
    }
}
