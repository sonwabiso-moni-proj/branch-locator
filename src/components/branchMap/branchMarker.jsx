import { useState } from "react";
import { Marker, Popup } from "react-leaflet";

import { API_PATHS } from "../../api/constants/api-paths";

export default function BranchMarker({ branch }) {
  const [branchDetails, setBranchDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function loadBranchDetails() {
    if (loaded) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_PATHS.BRANCHES}/${branch.id}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load branch.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setBranchDetails(data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Marker
      position={[
        branch.coordinates.latitude,
        branch.coordinates.longitude,
      ]}
      eventHandlers={{
        click: loadBranchDetails,
      }}
    >
      <Popup minWidth={280}>
        {loading && <p>Loading branch...</p>}

        {!loading && !branchDetails && (
          <p>Select the marker to load branch details.</p>
        )}

        {!loading && branchDetails && (
          <>
            <h3>{branchDetails.name}</h3>

            <p>
              <strong>Province</strong>
              <br />
              {branchDetails.province}
            </p>

            <p>
              <strong>Address</strong>
              <br />
              {branchDetails.address.street}
              <br />
              {branchDetails.address.suburb}
              <br />
              {branchDetails.address.city}
              <br />
              {branchDetails.address.postalCode}
            </p>

            <p>
              <strong>Phone</strong>
              <br />
              {branchDetails.contacts.phone}
            </p>

            {branchDetails.contacts.email && (
              <p>
                <strong>Email</strong>
                <br />
                {branchDetails.contacts.email}
              </p>
            )}

            <p>
              <strong>Languages</strong>
              <br />
              {branchDetails.languages.join(", ")}
            </p>

            <p>
              <strong>Facilities</strong>
              <br />
              {branchDetails.facilities.join(", ")}
            </p>

            <p>
              <strong>Services</strong>
              <br />
              {branchDetails.services.join(", ")}
            </p>

            <p>
              <strong>Rating</strong>
              <br />
              {branchDetails.rating ?? "Not Rated"} ⭐
            </p>

            <p>
              <strong>Monday Hours</strong>
              <br />
              {branchDetails.operatingHours.monday}
            </p>
          </>
        )}
      </Popup>
    </Marker>
  );
}