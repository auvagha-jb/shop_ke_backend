const fetch = require('node-fetch');
const base_url = "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=";
const image_url = "http://image.tmdb.org/t/p/w500/";
let settings = { method: "GET" };


class MovieUtil {
    getPoster = async (filmTitle) => {

        let poster = null ;
        filmTitle = this.removeYearFromMovieTitle(filmTitle);
        console.log(filmTitle);
        const url = base_url + filmTitle;

        try {
            if (filmTitle != '') {

                let response = await fetch(url, settings);
                let json = await response.json();

                poster = json.total_results > 0 ? json.results[0] : null;
                poster['poster_url'] = image_url + json.results[0].poster_path;
                poster['status'] = json.total_results > 0;
            }

            console.log(poster);
            
        } catch (error) {

            console.error(error);
        }
        return poster;
    }

    removeYearFromMovieTitle = (movieTitle) => {
        let bracket = '(';
        let splitTitle = movieTitle.split(bracket);
        let cleanedMovieTitle = splitTitle[0].trim();//Get rid of preceding and trailing whitespaces
        console.log({ cleanedMovieTitle });
        return cleanedMovieTitle;
    }
}

module.exports = MovieUtil;