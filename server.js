const express = require('express');
const app = express();
const port = 3000;

const movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994, genre: "Drama" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola", year: 1972, genre: "Crime" },
  { id: 3, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, genre: "Crime" },
  { id: 4, title: "The Dark Knight", director: "Christopher Nolan", year: 2008, genre: "Action" }
];

// Middleware to parse JSON requests
app.use(express.json());

// Sample movie data not shown

// Start the server
app.listen(port, () => {
    console.log(`Movie API server running at http://localhost:${port}`);
});

// Root endpoint - API homepage
app.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to the Movie API", 
        endpoints: { 
            "GET /movies": "Get all movies", 
            "GET /movies/:id": "Get a specific movie by ID" 
        } 
    }); 
});

// GET /movies - Return all movies
app.get('/movies', (req, res) => {
      // Sends back the movies as JSON as the response to the request
      res.json(movies);
});

// GET /movies/:id - Return a specific movie by ID
app.get('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);
  
	// Retunr movie if it is found
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ error: 'Movie not found' });
    }
});

// POST /movies - Create a new movie
app.post('/movies', (req, res) => {
    // Extract data from request body
    const { title, director, year, genre } = req.body;
  
  	// Create new movie with generated ID
    const newMovie = {
        id: movies.length + 1,
        title,
        director,
        year,
        genre
    };
  
    // Add to movies array
    movies.push(newMovie);
  
    // Return the created movie with 201 status
    res.status(201).json(newMovie);
});

// PUT /movies/:id - Update an existing movie
app.put('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const { title, director, year, genre } = req.body;
  
    // Find the movie to update
    const movieIndex = movies.findIndex(m => m.id === movieId);
  
    if (movieIndex === -1) {
          return res.status(404).json({ error: 'Movie not found' });
    }
  
    // Update the movie
    movies[movieIndex] = {
        id: movieId,
        title,
        director,
        year,
        genre
    };
  
    // Return the updated movie
    res.json(movies[movieIndex]);
});