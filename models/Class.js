const mongoose = require('mongoose')


const classSchema = mongoose.Schema({

    name:String,
    teacher : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User'
    },
    students : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User'
    }],
    time : {type : Date},
    type  : {type : String }, 
    description : {type : String } , 
    
})

const Class = mongoose.model('class' , classSchema)

module.exports = Class

