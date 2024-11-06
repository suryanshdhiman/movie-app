import "../Style/home.css";
import avengerImg from "../img/avenger.jpg"

const HOME = ({ searchTerm, filteredMovies, isInWatchlist, removeFromWatchlist, addToWatchlist }) => {
  return (
    <div className="banner">
      <img src={avengerImg} alt="Banner" className="banner__image" />

      <div className="movies">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              {isInWatchlist(movie.id) ? (
                <button
                  onClick={() => removeFromWatchlist(movie)} 
                  className="watchlist-button"
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  onClick={() => addToWatchlist(movie)}
                  className="watchlist-button"
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          ))
        ) : searchTerm.length >= 3 ? (
          <p>No movies found.</p>
        ) : (
          <p>Enter at least 3 characters to search.</p>
        )}
      </div>
    </div>
  );
};

export default HOME;
