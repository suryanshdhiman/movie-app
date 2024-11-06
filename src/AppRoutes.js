import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/Home";
import Watchlist from "./Pages/Watchlist";
import ConfirmModal from "./Pages/ConfirmModal";
import SearchBar from "./Pages/SearchBar";
import Pagination from "./components/pagination/Pagination";
import axios from "axios";


const AppRoutes = () => {
  // State for movies, watchlist, search term, and current page
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 14;

  // Fetch movies and load watchlist on component mount or page change
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=a3bd558eebc9a07da6064f6a5709cf41&language=en-US&page=${currentPage}`
        );
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const loadWatchlist = () => {
      const savedWatchlist = localStorage.getItem("watchlist");
      if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    };

    fetchMovies();
    loadWatchlist();
  }, [currentPage]);

  // Update watchlist based on add or remove action
  const updateWatchlist = (movie, action) => {
    let updatedWatchlist;
    if (action === "add") {
      if (!watchlist.some((m) => m.id === movie.id)) {
        updatedWatchlist = [...watchlist, movie];
      } else {
        console.log("Movie already in watchlist:", movie);
        return;
      }
    } else {
      updatedWatchlist = watchlist.filter((m) => m.id !== movie.id);
      console.log("Removed from watchlist:", movie);
    }
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  // Filter movies based on search term
  const filteredMovies = searchTerm.length >= 3
    ? movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : movies;

  // Calculate the current movies to display for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfLastMovie - moviesPerPage, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  // Reset current page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <Router>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Home
                searchTerm={searchTerm}
                filteredMovies={currentMovies}
                isInWatchlist={(id) => watchlist.some((m) => m.id === id)}
                addToWatchlist={(movie) => updateWatchlist(movie, "add")}
                removeFromWatchlist={(movie) => updateWatchlist(movie, "remove")}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </>
          }
        />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/watchlist" element={<Watchlist searchTerm={searchTerm} watchlist={watchlist} setWatchlist={setWatchlist} />} />
        
        <Route path="/confirm-modal" element={<ConfirmModal />} />
     
        <Route path="/search-bar" element={<SearchBar />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
