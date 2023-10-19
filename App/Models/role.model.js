module.exports = (sequelize, Sequelize) => {
    
    const Role = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    });

    return Role
};