//Module to store and handle social post data model

//data structure to store posts
const posts = [];
let nextPostID = 0;

function addNewPost(user, message) {
  let fullPost = {
    postID: nextPostID++,
    user: user,
    message: message,
    image: "public/IMG_2540.jpg", //placeholder image url
    caption: "woooooow",
    time: Date.now(),
  };
  //console.log(fullPost)
  posts.unshift(fullPost);
}

function retrievePosts(numberToRetrieve) {
  return posts.slice(0, numberToRetrieve);
}

function findByID(suppliedPostID) {
  return posts.find((post) => post.postID == suppliedPostID);
}

module.exports = { addNewPost, retrievePosts, findByID };
