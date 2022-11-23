const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        console.log("New blog post: ",  newPost);

        res.json(newPost);
    } catch (err) {
        console.log("Failure to post.", err);
        res.status(500).json(err);
    }
});

