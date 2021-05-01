require('dotenv').config();

const express = require("express");
var methodOverride = require('method-override')
const app = express();
const PORT = process.env.PORT || 4000;

const expresslayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

mongoose.connect(
    process.env.mongoDBURL,
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    () => {
      console.log("Mongodb connected seccessfully!!!");
    }
  );

app.set("view engine", "ejs");
app.use(expresslayouts);
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended:false}))
app.use(express.static("public"));
let session = require("express-session")
let passport = require('./helper/ppConfig');
const { Cookie } = require('express-session')

//before mounting of routes use the session
app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:true,
    resave:true,
    cookie:{maxAge:86400}
}))


//initialize passport 
app.use(passport.initialize());
app.use(passport.session());


//share info 
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    //avoid getting stuck
    next();
})


app.use(require('./routes/user'));


app.get('/' , (req ,res ) => {

  if (req.user) {
    res.redirect('/about')
  }else {
    res.redirect('/signup')    
  }
  
  })

  app.listen(PORT, () => {
    console.log(`Running on PORT  ${PORT}`);
  });
