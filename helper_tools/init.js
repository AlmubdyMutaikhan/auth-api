const User = require('../model/User.model')
const password = require('../helper_tools/password')
const session = require('express-session')
const MongoDBStore = require("connect-mongodb-session")(session)

const userInitialization = async (obj) => { 
    const hashed_password = await password.hashPassword(obj.password)       
    const user = new User({
        name : obj.name,
        email : obj.email,
        password : hashed_password,
        status : obj.status
    })
    
    return user
}

const initSessionParams = () => {
    
    // init DB session store object
    const store = new MongoDBStore({
            uri: process.env.DB_CONNECTION,
            collection: "sessions",
    });

    // catch errors while creating that object
    store.on('error', (err)=>{console.log(err)})

    const obj = {
        secret : process.env.SESSION_SECRET_SIGN_KEY,
        resave : false,
        saveUninitialized : true,
        store : store
    }
    return obj
}

module.exports = { userInitialization, initSessionParams }