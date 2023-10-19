const JWT = require('jsonwebtoken')
const authConfig = require('../Config/auth.config')
const dataBase = require('../Models')
const User = dataBase.user 

verifyToken = (request, response, next) => {
    let token = request.headers['x-access-token']

    if (!token) {
        response.status(400).send('No Token Provided')
    }

    JWT.verify(token, authConfig.mySecretKey, (error, decoded) => {
        
        if (error) {
            response.status(400).send('UnAuthorized')
        }

        request.userId = decoded.id
        next();
    });
};

isAdmin = (request, response, next) => {
    User.findPk(request.userId)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return
                }
            }

            response.status(403).send({
                message: "Require Admin Role!"
              });
              return;
        });
    });
};

isModerator = (request, response, next) => {
    User.findPk(request.userId)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'moderator') {
                    next();
                    return
                }
            }

            response.status(403).send({
                message: "Require Moderator Role!"
              });
              return;
        });
    });
};

isAdminOrModerator = (request, response, next) => {
    User.findPk(request.userId)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for (let i = 0; i < roles.length; i++) {

                if (roles[i].name === 'admin') {
                    next();
                    return
                }

                if (roles[i].name === 'admin') {
                    next();
                    return
                }
            }

            response.status(403).send({
                message: "Require Admin or Moderator Role!"
              });
              return;
        });
    });
};

const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isAdminOrModerator: isAdminOrModerator
};

module.exports = authJWT