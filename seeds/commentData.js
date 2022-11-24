const { Comment } = require("../models");

const commentData = [
    {
    commentContent: "10/10 blogging",
    user_id: 2,
    post_id: 1,
    },
    {
        commentContent: "noice",
        user_id: 1,
        post_id: 2,

},
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;