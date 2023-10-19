const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: 'http://localhost:4000'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000

const dataBase = require('./App/Models')
const Role = dataBase.role 

dataBase.sequelize.sync({ alter : true})
.then(() => {
    console.log('Database Synced..!!')
    roleInitialization()
});

function roleInitialization() {
    
    Role.create({
        id: 1,
        name: 'user' 
    });

    Role.create({
        id: 2,
        name: 'admin' 
    });

    Role.create({
        id: 3,
        name: 'moderator' 
    });

}


app.get('/', (request, response) => {
    res.send({ message: "Hello People..!!"})
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
});