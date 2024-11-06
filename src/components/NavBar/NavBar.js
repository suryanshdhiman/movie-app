
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import SearchBar from "../../Pages/SearchBar";
import "../NavBar/NavBar.css"

const NavBar = ({searchTerm,setSearchTerm}) => {


  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/home">Movies</Link>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


      <ul className="navbar__links">
        <li className="navbar__link">
          <Link to="/Watchlist">
            <FontAwesomeIcon icon={faBookmark} className="watchlist-icon" />
          </Link>
        </li>
       
      </ul>

    </nav>
  );
};

export default NavBar;
