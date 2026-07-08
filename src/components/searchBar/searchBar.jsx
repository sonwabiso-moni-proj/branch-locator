import { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

import "./SearchBar.css";

export default function SearchBar({
  onSearch,
  onLocationFound,
}) {
  const [search, setSearch] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  function handleSearch() {
    onSearch(search.trim());
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  function handleLocation() {
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

        console.log("Current Location:", coordinates);

        if (onLocationFound) {
          onLocationFound(coordinates);
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error(error);

        alert("Unable to retrieve your location.");

        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }

  return (
    <div className="search-bar">

      <FiSearch className="search-icon" />

      <input
        type="text"
        placeholder="E.g. Cape Town, South Africa"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="location-icon"
        onClick={handleLocation}
        title="Use my location"
      >
        {loadingLocation ? "..." : <FiMapPin />}
      </button>

    </div>
  );
}