const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Movie API', () => {
    test('should return all movies', async () => {
        const response = await request(app).get('/movies');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(4); // Assuming 4 movies in your data 
    });

    test('should return movie by ID', async () => {
        const response = await request(app).get('/movies/1');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
    });

    test('should return movie by ID', async () => {
        const response = await request(app).get('/movies/999');
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should create a new movie', async () => {
        const newMovie = {
            title: "Inception",
            director: "Christopher Nolan",
            year: 2010,
            genre: "Sci-Fi"
        };

        const response = await request(app)
            .post('/movies')
            .send(newMovie);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Inception');
    });

    test('should update existing movie', async () => {
        const updatedMovie = {
            title: "The Shawshank Redemption",
            director: "Frank Darabont",
            year: 1994,
            genre: "Drama/Hope"
        };

        const response = await request(app)
            .put('/movies/1')
            .send(updatedMovie);
        
        expect(response.status).toBe(200);
        expect(response.body.genre).toBe('Drama/Hope');
    });

    test('should delete existing movie', async () => {
        const response = await request(app).delete('/movies/1');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });




});