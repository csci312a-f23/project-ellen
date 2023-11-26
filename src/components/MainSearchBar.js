/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import PropTypes from "prop-types";
import styles from "../styles/SearchBar.module.css";

function SearchBar() {
  const [selectedOption, setSelectedOption] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState();
  const router = useRouter();
  const freshmanDorms = [
    "Battell",
    "Allen",
    "Hepburn",
    "Stewart",
    "Forest(Feb Area)",
  ];
  const sophomoreDorms = [
    "Gifford",
    "Hadley",
    "Milliken",
    "Coffrin",
    "Pearsons",
  ];
  const upperclassDorms = [
    "LaForce",
    "Lang",
    "Kelly",
    "Painter",
    "Atwater",
    "Munford",
    "Chrome",
    "Forest",
    "Voter",
    "Star",
    "Ridgeline",
  ];

  const langHouses = [
    "German House - The Deanery",
    "Arabic House - Sperry House",
    "Spanish House - Perkins",
    "Italian House - Longwell",
  ];

  const dorms = [
    "Battell",
    "Allen",
    "Hepburn",
    "Stewart",
    "Forest(Feb Area)",
    "Gifford",
    "Hadley",
    "Milliken",
    "Coffrin",
    "Pearsons",
    "LaForce",
    "Lang",
    "Kelly",
    "Painter",
    "Atwater",
    "Munford",
    "Chrome",
    "Forest",
    "Voter",
    "Star",
    "Ridgeline",
    "German House - The Deanery",
    "Arabic House - Sperry House",
    "Spanish House - Perkins",
    "Italian House - Longwell",
  ];

  function sortDorms() {
    dorms.sort();
    freshmanDorms.sort();
    sophomoreDorms.sort();
    upperclassDorms.sort();
    langHouses.sort();
  }

  useEffect(() => {
    sortDorms();
    if (searchTerm === "") {
      if (selectedOption === "All") {
        setResults(dorms);
      } else if (selectedOption === "Freshman Dorms") {
        setResults(freshmanDorms);
      } else if (selectedOption === "Sophomore Dorms") {
        setResults(sophomoreDorms);
      } else if (selectedOption === "Upperclassmen Dorms") {
        setResults(upperclassDorms);
      } else if (selectedOption === "Language Houses") {
        setResults(langHouses);
      }
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
  };

  const handleDormView = (e) => {
    const dorm = e.target.innerText;
    dorm.toLowerCase();
    router.push(`dorms/${dorm}`);
  };

  return (
    <div className={styles.body}>
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.select}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Freshman Dorms">Freshman Dorms</option>
          <option value="Sophomore Dorms"> Sophomore Dorms</option>
          <option value="Upperclassmen Dorms">Upperclassmen Dorms</option>
          <option value="Language Houses">Language Houses</option>
        </select>
        <button
          type="button"
          className={styles.searchButton}
          onClick={handleOnClick}
        >
          Search
        </button>
      </div>
      <div className="SearchBar-results">
        <ul
          className={styles["SearchBar-results"]}
          aria-label="SearchBar-results"
          onClick={handleDormView}
        >
          {results && results.map((dorm) => <li key={dorm}>{dorm}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
