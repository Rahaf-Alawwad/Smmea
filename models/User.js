const mongoose = require('mongoose')

const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({

    name : {type : String , required : true},
    emailAddress : {type : String , required : true},
    type  : {type : String , required : true}, 
    age : {type : Date } ,
    gender:String, 
    level :{type : String} ,
    password:{type:String},
    image:String,
    scedule:[{
        time:Date,
        section:String,
        grade:String
    }]

})

userSchema.methods.verifyPassword= function(password){
  
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('user' , userSchema)

module.exports = User

