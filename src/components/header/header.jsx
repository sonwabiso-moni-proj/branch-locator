import { useState } from "react";
import "./Header.css";

const FILTER_OPTIONS = [
  {
    label: "All",
    description: "Show all",
    value: "All",
  },
  {
    label: "Cash Accepting ATM",
    description: "Cash deposits",
    value: "Cash Accepting ATM",
  },
  {
    label: "ATM",
    description: "Self-service",
    value: "ATM",
  },
  {
    label: "Branch",
    description: "In-person banking",
    value: "Branch",
  },
  {
    label: "Smart ID Services",
    description: "ID applications",
    value: "Smart ID Services",
  },

];

export default function Header({
  onSearch,
  onLocationFound,
  activeFilter = "All",
  onFilterChange,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  function handleSearchChange(event) {
    const value = event.target.value;

    setSearchValue(value);

    if (onSearch) {
      onSearch(value);
    }
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    if (onSearch) {
      onSearch(searchValue);
    }
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        if (onLocationFound) {
          onLocationFound(coordinates);
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting current location:", error);
        alert("Unable to retrieve your location.");
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 60000,
      },
    );
  }

  return (
    <header className="locator-header">
      <div className="locator-header-content">
        <div className="locator-header-copy">
          <span className="locator-eyebrow">Branch locator</span>

          <h1>Find your nearest branch</h1>

          <p>
            Search by branch name, city, suburb, or province and view the
            closest branches on the map.
          </p>
        </div>

        <form className="locator-search-card" onSubmit={handleSearchSubmit}>
          <div className="locator-search-field">
            <div className="locator-search-input-wrap">
              <input
                id="branch-search"
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Enter your address"
                aria-label="Search branches"
              />
            </div>
          </div>

          <button
            type="button"
            className="locator-location-button"
            onClick={handleUseLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? "Finding..." : "Use my location"}
          </button>
        </form>

        <div className="locator-filter-section">
          <p>Filter results by</p>

          <div className="locator-toggle-scroll">
            <div className="locator-toggle-group" role="group">
              {FILTER_OPTIONS.map((filter, index) => {
                const isActive = activeFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    className={`locator-toggle-button ${
                      isActive ? "locator-toggle-button-active" : ""
                    } ${
                      index === 0 ? "locator-toggle-button-left" : ""
                    } ${
                      index === FILTER_OPTIONS.length - 1
                        ? "locator-toggle-button-right"
                        : ""
                    }`}
                    onClick={() => {
                      if (onFilterChange) {
                        onFilterChange(filter.value);
                      }
                    }}
                    aria-pressed={isActive}
                  >
                    <span className="locator-toggle-label">
                      {filter.label}
                    </span>

                    <span className="locator-toggle-description">
                      {filter.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}