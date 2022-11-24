const { Post } = require("../models");

const postData = [
    {
        title: "Apples",
        content: "Coding every day keeps the bugs at bay.",
        user_id: 1,
    },
    {
        title: "Keep codin",
        content: "plant a little seed, watch it grow...",
        user_id: 2,
    },
];

const seedPost = () => Post.bulkCreate(postdata);
module.exports = seedPost;