/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ dorms }) {
  const [selectedOption, setSelectedOption] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState();

  useEffect(() => {
    if (selectedOption !== "All") {
      setResults(dorms.filter((dorm) => dorm === selectedOption));
    }
  }, [selectedOption, searchTerm]);

  const handleOnClick = () => {
    const filteredDorms = dorms.filter((dorm) =>
      dorm.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setResults(filteredDorms);
    if (selectedOption !== "All") {
      setSelectedOption("All");
    }

    console.log("clicked");
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-header">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="All">All</option>
          {dorms &&
            dorms.sort().map((dorm) => (
              <option key={dorm} value={dorm}>
                {dorm}
              </option>
            ))}
        </select>
        <button type="button" onClick={handleOnClick}>
          Search
        </button>
      </div>
      <div className="SearchBar-results">
        <ul>{results && results.map((dorm) => <li key={dorm}>{dorm}</li>)}</ul>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  dorms: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchBar;
