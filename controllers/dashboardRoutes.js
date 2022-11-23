const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// collect all posts
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });


        const posts = dbPostData.map((post) => post.get({ plain: true }))
        res.render('dashbaord', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.redirect("/");
    };
});

// new post route
router.get('/new', (req, res) => {
    res.render("newPost")
});

router.get("/edit:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });
            res.render("edit-post", { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect("login")
    }
});


module.exports = router;