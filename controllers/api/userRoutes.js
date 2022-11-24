//complete log out route

const router = require("express").Router();
const { User } = require("../../models");

//LOG IN route
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (!user) {
        res.status(400).json({ message: "User is not a match."});
        return;
    }
    const validPassword = user.checkPassword(req.body.password);
    if(!validPassword) {
        res.status(400).json({ message: "User is not a match."});
        return;
    }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user, message: "Welcome to Dev Blog! Log in successful!"});
        });
    } catch (err) {
        res.status(400).json({ message: "User is not a match."})
    }
});


//LOG OUT route
  //TO BE COMPLETED

//SIGN UP route
router.post("/", async (req, res) => {
    try {
        const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
});

req.session.save(() => {
    req.session.user_id = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;

    res.status(200).json(newUser);
});
} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});