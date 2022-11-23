const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

router.post('/', withAuth, async (req, res) => {
    try {
const newComment = await Comment.create({
    commentContent: req.body.commentContent,
    post_id: req.body.post_id,
    user_is: req.session.user_id,
})
res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE COMMENT

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: "Could not find comment with this ID" })
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;