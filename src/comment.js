class Comment{
  constructor(commentObj){
    this.comment = commentObj.comment
    this.movie_id = commentObj.movie_id
    this.user_id = commentObj.user_id
    Comment.all.push(this)
  }
  renderSingleComment(){
    return `<div>
            <h1>${comment.movie.title}</h1>
            <h1>${comment.user.username}</h1>
            <h1>${comment.comment}</h1>
            </div>`
  }

  static findComment(id){
    return this.all.find(function(comment){
      return comment.movie_id === id
    })
  }
}
Comment.all =[]
