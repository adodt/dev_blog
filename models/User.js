const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    async checkPassword(password) {
        try {
            const passwordMatch = await bcrypt.compare(password, this.password);
            return passwordMatch;
         } catch (err) { console.error(err); 
        }
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'user',
}
);

module.exports = User;