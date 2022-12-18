const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require("../utils/auth");

// collect posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
              ]
            });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", { 
            posts, 
            loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});


// collect single post

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },

            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
if (postData) {
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("post-by-id", {post, loggedIn: req.session.loggedIn});
} else {
    res.status(404).end();
}
} catch (err) {
    res.status(500).json(err);
}
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/profile");
      return;
    }
  
    res.render("login");
  });

router.get('/',  (req, res) => {res.render('homepage', {})});
  
module.exports = router;