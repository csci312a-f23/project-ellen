import React, { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ onChange, onClick }) {
  const [selectedOption, setSelectedOption] = useState("All");

  return (
    <div className="SearchBar">
      <div className="SearchBar-header">
        <input type="text" placeholder="Search..." onChange={onChange} />
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="All">All</option>
          {/* dorms && dorms.map((dorm)) => {} */}
          <option value="Battell">Battell</option>
          <option value="Hepburn">Hepburn</option>
          <option value="Allen">Allen</option>
          <option value="Stewart">Stewart</option>
        </select>
        <button type="button" onClick={onClick}>
          Search
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchBar;
