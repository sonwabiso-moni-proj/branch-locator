import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import BranchMarker from "./BranchMarker";

import "./BranchMap.css";

const DEFAULT_CENTER = [-26.2041, 28.0473];
const DEFAULT_ZOOM = 6;

const createClusterCustomIcon = (cluster) =>
  L.divIcon({
    html: `
      <div class="branch-cluster">
        <span>${cluster.getChildCount()}</span>
      </div>
    `,
    className: "",
    iconSize: [44, 44],
  });

export default function BranchMap({ branches }) {
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

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {branches.map((branch) => (
            <BranchMarker
              key={branch.id}
              branch={branch}
            />
          ))}
        </MarkerClusterGroup>

      </MapContainer>

    </div>
  );
}