document.addEventListener('DOMContentLoaded', () => {
  console.log('LOADED');

let allMovies = []
const showList = document.getElementById('show-list')
const movieList = document.getElementById('list')
const showPanel = document.getElementById('show-panel')
const searchBar = document.getElementById('movie-search-input')
const hideBox = document.querySelector('#hide')
const createButton = document.getElementById('create-button')
const movieForm = document.getElementById("movie-form")
const listPanel = document.getElementById('list-panel')
const selector = document.getElementById('genre')
// movieForm.style.display = "none"

function getAllMovies(){
  fetch('http://localhost:3000/api/v1/movies')
  .then(response => response.json())
  .then((data) => {
    console.table(data)
    return data.forEach(function(movie){
      const newMovie = new Movie(movie)
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
  showList.innerHTML = foundMovie.renderMovieDetails()
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
}
})

movieForm.addEventListener("submit", function(event){
  event.preventDefault()
  addMovie()
})

function addMovie(){
  const newTitle = document.getElementById('movie-name-input')
  const newTrailer = document.getElementById('movie-trailer-input')
  const newInfo = document.getElementById('movie-info-input')
  const newStarring = document.getElementById('movie-starring-input')
  const newRating = document.getElementById('movie-rating-input')
  const newGenre = document.getElementById('genre')
  let index = selector.selectedIndex
  let selectedValue = selector.options[index].value

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
      genre: selectedValue
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
// function refresh(){
//   return document.location.reload(true)
// }
getAllMovies()
})
