document.addEventListener('DOMContentLoaded', () => {
  alert('LOADED');

let allMovies = []
const movieContainer = document.getElementById('movie-container')

function getAllMovies(){
  fetch('http://localhost:3000/api/v1/movies')
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    allMovies = data

    showAllMovies(data)
  })
}



function showAllMovies(movies){
    movies.forEach(function(movie){
    movieContainer.innerHTML += `
                                <div>
                                <h1 data-name="name">${movie.title}</h1>
                                </div>`
                                })

}

movieContainer.addEventListener("click", function(event){
  if(event.target.dataset.name === "name"){
    event.target.find(function(movie){
      
    })
  }
})


getAllMovies()
})
