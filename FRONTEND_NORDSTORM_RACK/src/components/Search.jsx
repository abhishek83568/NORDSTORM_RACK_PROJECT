import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Box, Input } from '@chakra-ui/react';
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Search = () => {
  //const [search, setSearch] = useState("");
 // const navigate = useNavigate();
  
  const handleSearch = (e) => {
    // setSearch(e.target.value);
    // if (search.trim() !== "") {
    //   navigate(`/search?query=${encodeURIComponent(search)}`);
    // }
  }

  const handleCross = () => {
    setSearch("");
  }

  return (
    <Box className="search-container">
      <Input
        type="text"
        placeholder="Search for a product or brand ..."
        value={search}
        onChange={(e) => handleSearch(e)}
        className="search-input"
      />
      {search && (
        <Box as={ImCross} className="search-icon-cross" onClick={handleCross} />
      )}
      <Box as={FaSearch} className="search-icon" />
    </Box>
  );
};

export default Search;
