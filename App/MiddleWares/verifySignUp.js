const dataBase = require('../Models')
const roles = dataBase.ROLES
const User = dataBase.user

checkUsernameAndEmail = (request, response, next) => {

    // Username 

    User.findOne({
        where : {
            userName: request.body.userName
        }
    }).then(user => {
        if (user) {
            response.status(400)
            .send({ messsage : 'Failed!. Username already in Use..!!'
          });
          return 
        }

        //Email 

        User.findOne({
            where : { 
                email: request.body.email
            }
        })
        .then(user => {
            if(user) {
                response.status(400)
                    .send({ messsage : 'Failed!. Email already in Use..!!'
                });
            return 
            }

            next()
        });
    });
};

checkRoles = (request, response, next) => {
    if (request.body.roles) {
        for (let index = 0; index < request.body.roles.length; index++) {
            if (!roles.includes(request.body.roles[index])) {
                response.status(400)
                .send({ message: "Failed! Role does not exist = " + request.body.roles[index]})

                return
            } 
        }
    }

    next()
};

const verifySignUp = {
    checkUsernameAndEmail: checkUsernameAndEmail,
    checkRoles: checkRoles
};
  
module.exports = verifySignUp;