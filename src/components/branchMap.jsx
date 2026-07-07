import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import BranchMarker from "./BranchMarker";
import { API_PATHS } from "../api/constants/api-paths";

const DEFAULT_CENTER = [-26.2041, 28.0473];
const DEFAULT_ZOOM = 6;

export default function BranchMap() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await fetch(API_PATHS.BRANCHES);

        if (!response.ok) {
          throw new Error("Failed to fetch branches.");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load branches.");
        }

        setBranches(data.branches);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBranches();
  }, []);

  if (loading) {
    return <p>Loading branches...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {branches.map((branch) => (
        <BranchMarker
          key={branch.id}
          branch={branch}
        />
      ))}
    </MapContainer>
  );
}