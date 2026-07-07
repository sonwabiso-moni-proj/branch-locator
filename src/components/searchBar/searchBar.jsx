import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  function handleSearch() {
    onSearch(search.trim());
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="E.g. Cape Town, South Africa"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className="search-icon"
        onClick={handleSearch}
      >
        <FiSearch size={22} />
      </button>
    </div>
  );
}