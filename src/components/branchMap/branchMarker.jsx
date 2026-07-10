import { useCallback, useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";

import { branchApiService } from "../../api/BranchApiService";
import { getOpenStreetMapDirectionsUrl } from "../../utils/directions";
import "./branchMarker.css";

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
    } catch (err) {
      console.error("Error loading branch details:", err);
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
      <Popup minWidth={300}>
        {loading && <p className="popup-loading">Loading branch details...</p>}

        {!loading && error && (
          <p className="popup-error">{error}</p>
        )}

        {!loading && !error && !branchDetails && (
          <>
            <h3 className="popup-title">{branch.name}</h3>

            <div className="popup-section">
              <span className="popup-label">Province</span>
              <span className="popup-value">{branch.province}</span>
            </div>

            <div className="popup-section">
              <span className="popup-label">Address</span>
              <span className="popup-value">{branch.address}</span>
            </div>

            <p className="popup-hint">Click to load full branch details.</p>
          </>
        )}

        {!loading && !error && branchDetails && (
          <>
            <h3 className="popup-title">{branchDetails.name}</h3>

            <div className="popup-section">
              <span className="popup-label">Address</span>
              <span className="popup-value">
                {branchDetails.address.street}<br />
                {branchDetails.address.suburb && <>{branchDetails.address.suburb}<br /></>}
                {branchDetails.address.city}, {branchDetails.address.postalCode}
              </span>
            </div>

            <div className="popup-section">
              <span className="popup-label">Phone</span>
              <span className="popup-value">{branchDetails.contacts.phone}</span>
            </div>

            {branchDetails.contacts.email && (
              <div className="popup-section">
                <span className="popup-label">Email</span>
                <span className="popup-value">{branchDetails.contacts.email}</span>
              </div>
            )}

            <div className="popup-section">
              <span className="popup-label">Languages</span>
              <div className="popup-tags">
                {branchDetails.languages.map((lang) => (
                  <span key={lang} className="popup-tag">{lang}</span>
                ))}
              </div>
            </div>

            <div className="popup-section">
              <span className="popup-label">Facilities</span>
              <div className="popup-tags">
                {branchDetails.facilities.map((f) => (
                  <span key={f} className="popup-tag">{f}</span>
                ))}
              </div>
            </div>

            <div className="popup-section">
              <span className="popup-label">Services</span>
              <div className="popup-tags">
                {branchDetails.services.map((s) => (
                  <span key={s} className="popup-tag">{s}</span>
                ))}
              </div>
            </div>

            <div className="popup-section">
              <span className="popup-label">Opening Hours</span>
              <div className="popup-hours">
                {Object.entries(branchDetails.operatingHours).map(([day, hours]) => (
                  <>
                    <span key={`${day}-day`} className="popup-hours-day">{day}</span>
                    <span key={`${day}-hours`} className="popup-hours-time">{hours}</span>
                  </>
                ))}
              </div>
            </div>

            <button
              className="popup-directions-button"
              onClick={() => {
                const url = getOpenStreetMapDirectionsUrl(
                  branchDetails.coordinates.latitude,
                  branchDetails.coordinates.longitude
                );
                window.open(url, "_blank");
              }}
            >
              Get Directions
            </button>
          </>
        )}
      </Popup>
    </Marker>
  );
}
