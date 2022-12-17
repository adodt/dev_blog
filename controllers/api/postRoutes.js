const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route
router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const newPost = await Post.create({
            title: req.body.title,
            post_content: req.body.content,
            user_id: req.session.user_id,
        });
        console.log("New blog post: ", newPost);

        res.json(newPost);
    } catch (err) {
        console.log("Failure to post.", err);
        res.status(500).json(err);
    }
});

//UPDATE POST route
router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updatePost) {
            res.status(200).json(updatePost);
        } else {
            res.status(404).json({ message: "Could not find post with this ID." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
)

//DELETE POST
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const deletePost = Post.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (deletePost) {
            res.status(200).json(deletePost)
        } else {
            res.status(404).json({message: 'No post found'})
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

    module.exports = router;