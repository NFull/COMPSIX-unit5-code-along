const express = require('express');
const app = express();
const port = 3000;

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
      // Sends back the movies as JSON as the 
response to the request
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