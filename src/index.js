document.addEventListener('DOMContentLoaded', () => {
  console.log('LOADED');


const showList = document.getElementById('show-list')
const movieList = document.getElementById('list')
const showPanel = document.getElementById('show-panel')
const commentList = document.getElementById('comment-list')
const searchBar = document.getElementById('movie-search-input')
const hideBox = document.querySelector('#hide')
const createButton = document.getElementById('create-button')
const movieForm = document.getElementById("movie-form")
const listPanel = document.getElementById('list-panel')
const selector = document.getElementById('genre')
const editTitle = document.getElementById('edit-name-input')
const editTrailer = document.getElementById('edit-trailer-input')
const editInfo = document.getElementById('edit-info-input')
const editStarring = document.getElementById('edit-starring-input')
const editRating = document.getElementById('edit-rating-input')
const editForm = document.getElementById("edit-form")
// const editGenre = document.getElementById('genre')
// let index = selector.selectedIndex
// let selectedValue = selector.options[index].value
// movieForm.style.display = "none"

function getAllMovies(){
  fetch('http://localhost:3000/api/v1/movies')
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    console.log(data[2].comments[0].comment)
    return data.forEach(function(movie){
      const newMovie = new Movie(movie)
      console.log(newMovie)
      movieList.innerHTML += newMovie.renderSingleMovie()
    })
    // allMovies = data
    //
    // showAllMovies(data)
  })
}




// function showAllMovies(movies){
//     movies.forEach(function(movie){
//     movieList.innerHTML += `
//                                 <div>
//                                 <h1 data-id=${movie.id} data-name=${movie.title}>${movie.title}</h1>
//                                 </div>`
//                             })
// }

// showList.addEventListener("click", function(event){
//     const foundMovie = allMovies.find(function(movie){
//       return movie.id === parseInt(event.target.dataset.id)
//     })
//     console.log(foundMovie)
//     showAllMovies(foundMovie){
//       foundMovie.forEach(function(movie){
//       showList.innerHTML += `
//                                   <div>
//                                   <h1 data-id=${foundMovie.id} data-name=${foundMovie.title}>${foundMovie.title}</h1>
//                                   </div>`
//                               })
//     }
//     })

movieList.addEventListener('click', function(event){
  let clickMovieId = parseInt(event.target.dataset.id)
  let foundMovie = Movie.findMovie(clickMovieId)
  console.log(foundMovie)
  const user = foundMovie.comments.forEach(function(user){
    // console.log(user.user_id)
    if(user.user_id === user.id){
      console.log(user.id)
    }
  })
  commentList.innerHTML = ""
  foundMovie.comments.forEach(function(comment){
    commentList.innerHTML += `<div>
      <li>"${comment.comment}"</li>
    </div>`
  })

  // foundMovie.user.forEach(function(user){
  //   commentList.innerHTML += `<div>
  //     <li>"${user.username}"</li>
  //   </div>`
  // })
  showList.innerHTML = foundMovie.renderMovieDetails()
  // let foundComment = Comment.findComment(clickMovieId)
  // console.log(foundComment)
})

searchBar.addEventListener('input', function(event){
  const filteredMovie = Movie.all.filter(function(movie){
    return movie.title.toUpperCase().includes(event.target.value.toUpperCase())
  })
  movieList.innerHTML = ""

  filteredMovie.forEach(function(movie){
    movieList.innerHTML += movie.renderSingleMovie()
  })
})

hideBox.addEventListener('change', function(event){
  if(hideBox.checked){
    movieList.style.display = "none"
  } else {
    movieList.style.display = "block"
  }
})

listPanel.addEventListener("click", function(event){
  if(event.target.className === "create" || event.target.dataset.action === "create"){
  document.body.className = 'is-blurred'
  document.querySelector('#overlay-content').style.visibility = "visible"
}
})

showPanel.addEventListener("click", function(event){
  if(event.target.className === "delete" || event.target.dataset.action === "delete"){
    let clickMovieId = parseInt(event.target.dataset.id)

    event.target.parentNode.parentNode.remove()
    fetch(`http://localhost:3000/api/v1/movies/${clickMovieId}`, {
      method: "DELETE"
    })
    refresh()
} else if(event.target.className === "edit" || event.target.dataset.action === "edit"){
  document.body.className = "is-blurred"
  document.querySelector("#overlay").style.visibility = "visible"

  let clickMovieId = parseInt(event.target.dataset.id)
  const foundMovie = Movie.findMovie(clickMovieId)
  editTitle.value = foundMovie.title
  editInfo.value = foundMovie.info
  editStarring.value = foundMovie.starring
  editRating.value = foundMovie.rating
  editTrailer.value = foundMovie.trailer
  editForm.dataset.id = foundMovie.id
}
})

movieForm.addEventListener("submit", function(event){
  event.preventDefault()
  addMovie()
  refresh()
})

function addMovie(){
  const newTitle = document.getElementById('movie-name-input')
  const newTrailer = document.getElementById('movie-trailer-input')
  const newInfo = document.getElementById('movie-info-input')
  const newStarring = document.getElementById('movie-starring-input')
  const newRating = document.getElementById('movie-rating-input')
  const newGenre = document.getElementById('genre')

  fetch('http://localhost:3000/api/v1/movies', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      title: newTitle.value,
      trailer: newTrailer.value,
      info: newInfo.value,
      starring: newStarring.value,
      rating: newRating.value,
      genre: newGenre.value,
      likes: 0
    })
    })
    .then(response => response.json())
    .then((data) => {
      new Movie(data)
      const createdMovie = Movie.findMovie(data.id)
      showList.innerHTML += createdMovie.renderMovieDetails()
      movieForm.reset()
    })
}


function displayComments(){
  fetch("http://localhost:3000/api/v1/comments")
  .then(function(response){
    console.log(response)
    return response.json()
  })
  .then((dataComment) => {
    console.table(dataComment)
    dataComment.forEach(function(comment){
      const newComment = new Comment(movie)
      commentList.innerHTML += `<div>
                                <h1>${comment.movie.title}</h1>
                                <h1>${comment.user.username}</h1>
                                <h1>${comment.comment}</h1>
                                </div>`
      // const newComment = new Comment(comment)
      // commentList.innerHTML += newComment.renderSingleComment()
    })
  })

}

function refresh(){
  return document.location.reload(true)
}

displayComments()
getAllMovies()

})
