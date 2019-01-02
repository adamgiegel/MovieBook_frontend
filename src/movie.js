class Movie{
  constructor(movieObj){
    this.id = movieObj.id
    this.title = movieObj.title
    this.trailer = movieObj.trailer
    this.starring = movieObj.starring
    this.info = movieObj.info
    this.selectedValue = movieObj.selectedValue
    this.rating = movieObj.rating
    Movie.all.push(this)
  }
  renderSingleMovie(){
    return `<div>
    <li data-id=${this.id}>${this.title}</li>
    </div>`
  }
  static findMovie(id){
    return this.all.find(function(movie){
      return movie.id === id
    })
  }
  renderMovieDetails(id){
    return `<div class="movie-card" data-id="${this.id}">
       <img data-action="press" class="toggle-picture" src="${this.trailer}">
       <h1 class="title-text">Title: ${this.title}</h1>
       <h2 class="starring-text">Starring: ${this.starring}</h2>
       <h2 class="info-text">Movie Info: ${this.info}</h2>
       <h2 class="genre-text">Genre: ${this.selectedValue}</h2>
       <h2 class="rating-text">Rating: ${this.rating}</h2>
       <br>
       <button class="edit" data-id="${this.id}" data-action="edit">Edit</button>
       <button class="delete" data-id="${this.id}" data-action="delete">Delete</button>
       <div>`
  }


}

Movie.all = []
