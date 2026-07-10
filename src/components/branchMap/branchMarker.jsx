import { useCallback, useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";

import { branchApiService } from "../../api/BranchApiService";

export default function BranchMarker({
  branch,
  isSelected,
  onBranchSelect,
}) {
  const markerRef = useRef(null);
  const hasRequestedDetailsRef = useRef(false);

  const [branchDetails, setBranchDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadBranchDetails = useCallback(async () => {
    if (loaded || loading || hasRequestedDetailsRef.current) {
      return;
    }

    try {
      hasRequestedDetailsRef.current = true;
      setLoading(true);
      setError("");

      const data = await branchApiService.getBranchById(branch.id);

      setBranchDetails(data);
      setLoaded(true);
    } catch (error) {
      console.error("Error loading branch details:", error);
      setError("Unable to load branch details.");
    } finally {
      setLoading(false);
    }
  }, [branch.id, loaded, loading]);

  useEffect(() => {
    if (!isSelected || !markerRef.current) {
      return;
    }

    // Give the map a small moment to fly/zoom before opening the popup.
    // This prevents the popup from opening too early and disappearing.
    const popupTimer = setTimeout(() => {
      markerRef.current?.openPopup();
      loadBranchDetails();
    }, 100);

    return () => clearTimeout(popupTimer);
  }, [isSelected, loadBranchDetails]);

  if (
    branch?.coordinates?.latitude === undefined ||
    branch?.coordinates?.longitude === undefined
  ) {
    return null;
  }

  return (
    <Marker
      ref={markerRef}
      position={[
        branch.coordinates.latitude,
        branch.coordinates.longitude,
      ]}
      eventHandlers={{
        click: () => {
          onBranchSelect(branch);
          loadBranchDetails();
        },
      }}
    >
      <Popup minWidth={280}>
        {loading && <p>Loading branch...</p>}

        {!loading && error && (
          <p>{error}</p>
        )}

        {!loading && !error && !branchDetails && (
          <>
            <h3>{branch.name}</h3>

            <p>
              <strong>Province</strong>
              <br />
              {branch.province}
            </p>

            <p>
              <strong>Address</strong>
              <br />
              {branch.address}
            </p>

            <p>Select the marker to load branch details.</p>
          </>
        )}

        {!loading && !error && branchDetails && (
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