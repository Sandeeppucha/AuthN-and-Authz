const Sequelize = require("sequelize")

const sequelize = new Sequelize("mydb", "root", "Sandeepsai@204", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const dataBase = {};

dataBase.Sequelize = Sequelize;
dataBase.sequelize = sequelize;

const user = require('../Models/user.model')(sequelize, Sequelize)
const role = require('../Models/role.model')(sequelize, Sequelize)

dataBase.role.belongsToMany(dataBase.user, { through: 'user_roles'})
dataBase.user.belongsToMany(dataBase.role, { through: 'user_roles'})

dataBase.ROLES = ['admin', 'user', 'moderator']

module.exports = dataBase;