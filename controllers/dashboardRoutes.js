const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models/');


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


        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.redirect("/");
    };
});

// new post route
router.get('/new', (req, res) => {
    res.render("new-blog")
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });
            res.render("edit-blog", { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect("login")
    }
});

//edit post route
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });
            res.render('edit-blog', { post, loggedIn: req.session.loggedIn });
        } else {
            res.status(400).end()
        }
    } catch (err) {
        res.redirect('login')
    }
});

module.exports = router;