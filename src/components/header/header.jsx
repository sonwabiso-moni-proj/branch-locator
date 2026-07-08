import { useState } from "react";

import "./Header.css";

import SearchBar from "../SearchBar/SearchBar";

export default function Header({
  onSearch,
  onLocationFound,
}) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <header className="header">
      <div className="header-container">

        <h1>Branch Locator</h1>

        <p>
          Use our branch locator below to find your nearest branch.
          Use the filters to see ATMs, branches or Smart ID services.
        </p>

        <div className="header-actions">
          <SearchBar
            onSearch={onSearch}
            onLocationFound={onLocationFound}
          />
        </div>

        <div className="branch-filters">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={selectedFilter === "all"}
              onChange={() => setSelectedFilter("all")}
            />

            <span>All</span>
          </label>
        </div>

      </div>
    </header>
  );
}