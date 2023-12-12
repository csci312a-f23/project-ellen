/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import PropTypes from "prop-types";
import alldorms from "../../data/dorms.json";
import styles from "../styles/SearchBar.module.css";

function SearchBar() {
  const [selectedOption, setSelectedOption] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState();
  const router = useRouter();

  useEffect(() => {
    if (searchTerm === "") {
      if (selectedOption === "All") {
        setResults(alldorms.dorms);
      } else if (selectedOption === "Freshman Dorms") {
        setResults(alldorms.freshmanDorms);
      } else if (selectedOption === "Sophomore Dorms") {
        setResults(alldorms.sophomoreDorms);
      } else if (selectedOption === "Upperclassmen Dorms") {
        setResults(alldorms.upperclassDorms);
      } else if (selectedOption === "Language Houses") {
        setResults(alldorms.langHouses);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, searchTerm]);

  const handleOnClick = () => {
    const filteredDorms = alldorms.dorms.filter((dorm) =>
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
          placeholder="Dorm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.select}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="All">All Dorms</option>
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
          {results && results.sort().map((dorm) => <li key={dorm}>{dorm}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
