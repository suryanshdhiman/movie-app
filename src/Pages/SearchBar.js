
import React from "react";


const SearchBar = ({ searchTerm, setSearchTerm }) => {
return (

  <div >
<input 
style={{height:'40px',width:'300px',fontSize:"20px",borderRadius:"10px"}}
    type="text"
    placeholder="Search for movies........"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-bar"
  />
  </div>
  
);
};

export default SearchBar;
