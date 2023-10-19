const dataBase = require('../Models')
const config = require('../Config/auth.config')
const User = dataBase.User
const Role = dataBase.role 

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Options = dataBase.Sequelize.Op

exports.signUp = (requets, response) => {

    // Save User to Database

    User.create({
        userName: request.body.userName,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10)
    })
    .then(user => {
        if (request.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Options.op] : request.body.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles)
                .then(() => {
                    response.send('User was registered Successfully..!!')
                })
            })
        } else {
            user.setRoles([1])
                .then(() => {
                    response.send('User was registered Successfully..!!')
            })
        }
    })
    .catch(error) {
        response.status(500).send({ message: error.message})
    }
    
};