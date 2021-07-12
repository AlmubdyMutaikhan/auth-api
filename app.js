const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoDBStore = require("connect-mongodb-session")(session)
const mongoose = require('mongoose')
const DB = require('./helper_tools/db')
const init = require('./helper_tools/init')

//set up configs
dotenv.config()
// import Routes
const authRoute = require('./routes/auth.route')
const jobRoute = require('./routes/jobs.route')

// set up middlewares
app.use(cookieParser());
app.use(express.json())
app.use(session(init.initSessionParams()))

// auth route
app.use('/api/user', authRoute)
app.use('/api/jobs', jobRoute)
// connection to the DB
DB.connectToTheDB()
    .then(ok => {
        app.listen(3000, () => {console.log("server is on (port:3000)")})
    })
    .catch(err => {
        console.log(err)
    })


