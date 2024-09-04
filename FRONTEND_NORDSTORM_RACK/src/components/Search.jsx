import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Box } from "@chakra-ui/react";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
    
    if (value.trim() === "") {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  const handleCross = () => {
    setSearch("");
    navigate("/");
  };

  return (
    <Box className="search-container">
      <input
        type="text"
        placeholder="Search for a product or brand ..."
        value={search}
        onChange={(e) => handleSearch(e)}
        onKeyDown={handleKeyPress}
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
