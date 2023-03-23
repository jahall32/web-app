const express=require('express')
const app = express()
app.listen(3000, ()=> console.log('listening at port 3000'))

//serve unspecified static pages from our public dir
app.use(express.static('public'))
//make express middleware for json available
app.use(express.json())

//allows us to process post info in urls
app.use(express.urlencoded({extended: false}));

const path = require('path');

//importing our own node module
//const users=require('./users.js')

//consts to hold expiry times in ms
const threeMins = 1000 * 60 * 3;
const oneHour = 1000 * 60 * 60;

//use the sessions module and the cookie parser module
const sessions = require('express-session');
const cookieParser = require("cookie-parser");

//make cookie parser middleware available
app.use(cookieParser());

//load sessions middleware, with some config
app.use(sessions({
    secret: "a secret that only i know",
    saveUninitialized:true,
    cookie: { maxAge: threeMins },
    resave: false 
}));


//data structure to store posts
const posts=[]
let nextPostID=0


//controller for handling a user post
app.post('/newpost', (request, response)=>{
    console.log(request.body)
    let userData=request.body
    
    console.log(userData)
    let fullPost={
        postID: nextPostID++,
        //user: request.session.userid,
        message: request.body.message,
        time: Date.now()
    }
    console.log(fullPost)
    posts.unshift(fullPost)
    response.redirect('/postsuccess.html')
})

app.get('/getposts', (request, response)=>{
    const qtyPosts = request.query.qty;
    console.log('send me '+qtyPosts+' posts please')
    response.json({
        posts:posts.slice(0,qtyPosts)
    })
})