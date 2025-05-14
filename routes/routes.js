import express from 'express'
import {register, logout, login, verifyEmail} from "../controller/userController.js";
import {addPost, deletePost, getAllPosts, getPost, updatePost} from "../controller/postController.js";
import {authenticateUser, verifyToken} from "../auth/generateToken.js";
import {User} from  "../models/model.js"
const router = express.Router()

router.get('/allPosts',verifyToken, getAllPosts)
router.post('/addPost',verifyToken, addPost)
router.post('/login',  login)
router.post('/logout',  logout)
router.delete('/delete/:id',verifyToken, deletePost)
router.put('/update/:id',authenticateUser, updatePost)
router.get('/post/:id', getPost)
router.post('/register', register)
router.post('/verify-email', verifyEmail)


router.get('/user-info', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.id).select('firstName');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ firstName: user.firstName });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/check-auth', verifyToken, (req, res) => {
    res.status(200).json({ authenticated: true, userId: req.userId });
});



export default router;