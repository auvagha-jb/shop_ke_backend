const Table = require('./table')
const MovieUtil = require('../utils/movie_util.js')

class Movies extends Table {

    constructor() {
        super('Movies');
        // this.createTable();
    }

    /**
     * Fetch movies from the database
     * @param {int} limit the movie results to limit  
     */
    getFirstNumMovies(limit = 25) {
        if (limit < 1 || limit == 100) {
            limit = 25;
        }

        let sql = ` SELECT * FROM movies ORDER BY Movie_Id`;
        return super.query({ sql });
    }

    async getPoster(movieTitle) {
        const posterUtil = new MovieUtil();
        return posterUtil.getPoster(movieTitle);
    }

    getByGenre(genre) {
        let sql = `SELECT * FROM movies WHERE genres LIKE '%${genre}%' LIMIT 25`;
        return super.query({ sql });
    }
}

module.exports = Movies;