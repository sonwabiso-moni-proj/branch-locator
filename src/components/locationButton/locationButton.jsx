import { useState } from "react";

import "./LocationButton.css";

export default function LocationButton({ onLocationFound }) {
  const [loading, setLoading] = useState(false);

  function handleLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log("Current Location:", coordinates);

        try {
          if (onLocationFound) {
            onLocationFound(coordinates);
          }
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);

        alert("Unable to retrieve your location.");

        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }

  return (
    <button
      className="location-button"
      onClick={handleLocation}
      disabled={loading}
    >
      {loading ? "Locating..." : "📍 Use my location"}
    </button>
  );
}