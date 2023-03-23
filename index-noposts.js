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

const posts=require('./posts.js')

//controller for registering a new user
app.post('/register', (request, response)=>{
    console.log(request.body)
    let userData=request.body
    // console.log(userData.username)
    if(users.findUser(userData.username)){
        console.log('user exists')
        response.json({
            status: 'failed',
            error:'user exists'
        })
    } else {
        users.newUser(userData.username, userData.password)
        response.redirect('/registered.html')
    }
    console.log(users.getUsers())
})



//controller for handling a user post
app.post('/newpost', (request, response)=>{
    console.log(request.body)
    let userData=request.body
    console.log("new post received from "+request.session.userid)
    posts.addNewPost(request.session.userid, userData.message)
    response.redirect('/postsuccess.html')
})

app.get('/getposts', (request, response)=>{
    const qtyPosts = request.query.qty;
    console.log('send me '+qtyPosts+' posts please')
    response.json({
        posts:posts.retrievePosts(qtyPosts)
    })
})

//controller for handling a post being liked
app.post('/like', (request, response)=>{
    //function to deal with a like button being pressed on a post
    likedPostID=request.body.likedPostID
    likedByUser=request.session.userid
    posts.likePost(likedPostID, likedByUser)
    console.log(likedByUser+" liked "+likedPostID)
    let qtyPosts=3
    response.json({
        posts:posts.retrievePosts(qtyPosts)
    })
})