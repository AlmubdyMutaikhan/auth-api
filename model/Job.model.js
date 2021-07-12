const mongoose = require('mongoose')
const Schema = mongoose.Schema


const jobSchema = new Schema({
    id : {
        type : Number,
    },
    job_title : {
        type : String
    },
    
    skills : {
        type : String,
    },
    salary : {
        type : String,
    },
    location : {
        type : String
    },
    date_of_post : {
        type : Date,
        default : Date.now
    },
    posted_by : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

})

const jobModel = mongoose.model('Job', jobSchema)

module.exports = jobModel
