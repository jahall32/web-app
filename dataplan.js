
user = {
      "userID": Number,
      "userName": String,
      "password": String,
      "followers": Number,
    }

  meme ={
    "memeID": String,
    "likes": userID,
    "comments": [{ userID, Comment, time}],
  }

    memePost ={
      "userID": String,
      "title": String,
      "image_url": Image,
      "templateId": Number,
      "caption": String,
      "CategoryTags": String,
      "time": Date,
      "timeElapsed": Date,
    }

    categories ={
      "weeklyTopic": String,
      "mostLiked": memePost,
    }



