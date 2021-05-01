const router = require("express").Router();

const bcrypt = require("bcrypt");

//rand to encrypt the password
const salt =10; 

//import passport configurations
let passport = require("../helper/ppConfig")

const User=require("../models/User")

//GET signup to get the data 
router.get("/signup", (req,res)=>{
    res.render("sign", {
        title:"سمّع- تسجيل جديد"
    });;
})

//POST signup to save the data 
router.post("/signup", (req,res)=>{
    console.log(req.body);
    let user = new User(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);
    user.password=hash;
    user.save()
    .then(()=>{
        res.redirect("/signin")
    })
    .catch((err)=>{
        console.log(err);
        res.redirect("/signin")
    })
})

//GET login to get the data 
router.get("/signin", (req,res)=>{
    res.render("sign", {
        title:"سمّع- تسجيل الدخول"
    });
})

//POST login to redirect the user 
router.post('/signin', 
  passport.authenticate('local', { 
   successRedirect:"/",
   failureRedirect: '/signin' }),
);





router.get("/signout", (req, res) => {
    req.logout();
    res.redirect("/signin");
  });

router.get("/about", (req,res)=>{
    res.render("about", {
        title:"سمّع- من نحن "
    });
})


router.get("/profile", (req,res)=>{
    res.render("profile", {
        title:"سمّع- الملف الشخصي "
    });
})

router.get("/contact", (req,res)=>{
    res.render("contact", {
        title:"سمّع- تواصل معنا "
    });;
})


router.get("/home", (req,res)=>{
    res.render("home", {
        title:"سمّع- الصفحة الرئيسية "
    });
})
module.exports = router