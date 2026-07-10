import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import BranchMarker from "./BranchMarker";
import "./BranchMap.css";

const DEFAULT_CENTER = [-26.2041, 28.0473];
const DEFAULT_ZOOM = 6;

const createClusterCustomIcon = (cluster) =>
  L.divIcon({
    html: `<div class="branch-cluster"><span>${cluster.getChildCount()}</span></div>`,
    className: "",
    iconSize: [44, 44],
  });

function hasValidCoordinates(branch) {
  return (
    branch?.coordinates?.latitude !== undefined &&
    branch?.coordinates?.longitude !== undefined
  );
}

function MapController({ branches, selectedBranch }) {
  const map = useMap();

  useEffect(() => {
    if (selectedBranch && hasValidCoordinates(selectedBranch)) {
      const { latitude, longitude } = selectedBranch.coordinates;

      map.flyTo([latitude, longitude], 15, {
        duration: 0.3,
      });

      return;
    }

    const branchesWithCoordinates = branches.filter(hasValidCoordinates);

    if (branchesWithCoordinates.length === 0) {
      return;
    }

    if (branchesWithCoordinates.length === 1) {
      const branch = branchesWithCoordinates[0];
      const { latitude, longitude } = branch.coordinates;

      map.flyTo([latitude, longitude], 14, {
        duration: 0.3,
      });

      return;
    }

    const bounds = L.latLngBounds(
      branchesWithCoordinates.map((branch) => [
        branch.coordinates.latitude,
        branch.coordinates.longitude,
      ]),
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 13,
    });
  }, [branches, selectedBranch, map]);

  return null;
}

export default function BranchMap({
  branches,
  selectedBranch,
  onBranchSelect,
}) {
  return (
    <div className="branch-map">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          branches={branches}
          selectedBranch={selectedBranch}
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {branches.map((branch) => (
            <BranchMarker
              key={branch.id}
              branch={branch}
              isSelected={selectedBranch?.id === branch.id}
              onBranchSelect={onBranchSelect}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}