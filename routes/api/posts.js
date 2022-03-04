const express = require('express');
const router = express.Router();
//for protected routes
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//import the User model from models folder
const User = require('../../models/User');
const Post = require('../../models/Post');


//@route GET api/posts
//@description Create a post
//@access Private
router.post('/', 
    [auth,
    [check('text', 'Text is required').not().isEmpty()] ],
    async (req, res) => {
    //get valiadtion result
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        //using User model
        const user = await User.findById(req.user.id).select('-password');

        //using post model
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        //save
        const post = await newPost.save();
        //return as json
        res.json(post);
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/posts
//@description get all posts
//@access Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        if(!posts) return res.status(404).json({ msg: "Posts not found" });
        res.json(posts);
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/posts/:id
//@description get posts by id
//@access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ msg: "Post not found" });
        res.json(post);
    } 
    catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId') return res.status(400).json({ msg: "Post not found" });
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/posts/:id
//@description delete single post
//@access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById({ _id: req.params.id });
        if(!post) return res.status(404).json({ msg: "Post does not exist" });

        //check user
        if(post.user.toString() !== req.user.id) return res.status(401).json({ msg: "User not authorized" });

        await post.remove();
        res.json({ msg: "Post Deleted" });
    } 
    catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId') return res.status(400).json({ msg: "Post not found" });
        res.status(500).send('Server Error');
    }
});


module.exports = router;