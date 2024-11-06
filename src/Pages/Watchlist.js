import React, { useState, useEffect } from "react";
import "../Style/Watch.css";
import ConfirmModal from "./ConfirmModal";

const Watchlist = ({ searchTerm,watchlist, setWatchlist }) => {
  const [showModal, setShowModal] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState(null);


  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, [setWatchlist]);

  const confirmRemove = (movieId) => {
    setMovieToRemove(movieId);
    setShowModal(true);
  };

  const removeFromWatchlist = () => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieToRemove);
    setWatchlist(updatedWatchlist);

    
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setShowModal(false);
  };

  const cancelRemove = () => {
    setShowModal(false);
    setMovieToRemove(null);
  };

    const filteredWatchlist =
    searchTerm.length >= 3
      ? watchlist.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : watchlist;

  return (
    <div className="watchlist-section">
      <h2>Your Watchlist</h2>
      {filteredWatchlist.length > 0 ? (
        <div className="movies">
          {filteredWatchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              <button
                onClick={() => confirmRemove(movie.id)}
                className="remove-watchlist-button"
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your watchlist is empty or no matches found.</p>
      )}

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to remove this movie?"
          onConfirm={removeFromWatchlist}
          onCancel={cancelRemove}
        />
      )}
    </div>
  );
};

export default Watchlist;
