import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/SearchBar.module.css";

function SearchBar({ dorms, onChange, onClick }) {
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
          {dorms &&
            dorms.map((dorm) => (
              <div key={dorm.name}>
                <option value={dorm.name}>{dorm.name}</option>
              </div>
            ))}
        </select>
        <button type="button" onClick={onClick}>
          Search
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  dorms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchBar;
