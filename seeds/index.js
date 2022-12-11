const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedComments = require("./commentData");
const seedPost = require("./postData");


const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log("DATABASE SYNCED");

    await seedUser();
    console.log("DATABASE SYNCED");

    await seedComments();
    console.log("DATABASE SYNCED");

    await seedPost();
    console.log("DATABASE SYNCED");

    process.exit(0);
};

seedAll();