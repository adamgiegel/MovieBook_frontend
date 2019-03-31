## MovieBook

This Javascript web app to find movie information about your favorite movie. .

## Contents
- Installation
- Structure

MovieBook was built using javascript and DOM manipulation through the index.html file.  The backend was built using a custom API and the data was held in Postgres(See the MovieBook backend).

## Installation
To get started with MovieBook, fork this repository and clone it to your hard drive. Run open index.html for the front end and Rails s for the backend.

## Structure
The top-level folder of MovieBook includes a db.json file, and index.css where the css is held, a index.html where the page is loaded on to the DOM, and a src folder.

The src folder includes 3 files, a comment.js file, index.js file, and movie.js file. 

## Src Folder contents
MovieBook is composed of 4 main files:

## Comment.js
The comment.js file is a class that shows comments for each movie from an individual user.  It also holds a function to find a particular comment.

## Index.js 
The index.js file holds most of the functionality of the app.  It fetches data from the backend, has event listeners for comments, the search bar,listPanel, movie trailer, and POST a new movie to the backend.

## Movie.js
This movie.js file is responsible for rendering movie information once it is clicked and 

## Index.html
The index.html file holds all of the form information for the search form, new form, and edit form.

## Future Development
- Some ideas for features to add in the future: 
- To be able to gain movie information from an external API.
- For users to be able to share comments with each other and be able to like a movie.
- A discussion forum for talking about movies.

## Built With:
- Javascript
- Ruby on Rails
