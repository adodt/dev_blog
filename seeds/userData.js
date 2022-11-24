const { User } = require("../models");

const userData = [
    {
        username: "Alli",
        password: "password1",
    },
    {
        username: "Rob",
        password: "password2"
    },
];

const seedUser = () => User.bulkCreate(userdata, {
    individualHooks: true,
});

module.exports = seedUser;