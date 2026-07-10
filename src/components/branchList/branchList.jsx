import "./BranchList.css";

function formatBranchAddress(address) {
  if (!address) {
    return "Address not available";
  }

  if (typeof address === "string") {
    return address;
  }

  const addressParts = [
    address.street,
    address.suburb,
    address.city,
    address.postalCode,
  ].filter(Boolean);

  return addressParts.length > 0
    ? addressParts.join(", ")
    : "Address not available";
}

function getBranchProvince(branch) {
  return branch.province || branch.address?.province || "Province unavailable";
}

function formatRating(rating) {
  if (rating === undefined || rating === null) {
    return "Not rated";
  }

  return rating;
}

export default function BranchList({
  branches,
  loading,
  selectedBranch,
  onBranchSelect,
}) {
  if (loading) {
    return (
      <aside className="branch-list">
        <div className="branch-list-header">
          <div>
            <span className="branch-list-eyebrow">Results</span>
            <h2>Branches</h2>
          </div>
        </div>

        <div className="branch-list-state">
          <div className="branch-loader" />
          <p>Loading branches...</p>
        </div>
      </aside>
    );
  }

  if (branches.length === 0) {
    return (
      <aside className="branch-list">
        <div className="branch-list-header">
          <div>
            <span className="branch-list-eyebrow">Results</span>
            <h2>Branches</h2>
          </div>
        </div>

        <div className="branch-list-state">
          <p>No branches found.</p>
          <span>Try searching by city, suburb, or province.</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="branch-list">
      <div className="branch-list-header">
        <div>
          <span className="branch-list-eyebrow">Results</span>
          <h2>Branches</h2>
        </div>

        <span className="branch-count">{branches.length}</span>
      </div>

      <div className="branch-card-list">
        {branches.map((branch) => {
          const isSelected = selectedBranch?.id === branch.id;
          const address = formatBranchAddress(branch.address);
          const province = getBranchProvince(branch);
          const rating = formatRating(branch.rating);

          return (
            <article
              key={branch.id}
              className={`branch-card ${
                isSelected ? "branch-card-selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => onBranchSelect(branch)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onBranchSelect(branch);
                }
              }}
            >
              <div className="branch-card-top">
                <div>
                  <h3>{branch.name}</h3>

                  <p className="branch-location">
                    {address}
                  </p>
                </div>

                <span
                  className={
                    branch.isOpen
                      ? "branch-status branch-status-open"
                      : "branch-status branch-status-closed"
                  }
                >
                  {branch.isOpen ? "Open" : "Closed"}
                </span>
              </div>

              <div className="branch-meta">
                <span>{province}</span>

                {branch.distance !== undefined && (
                  <span>{branch.distance} km away</span>
                )}
              </div>

              <div className="branch-card-footer">
                <span className="branch-rating">
                  ⭐ {rating}
                </span>

                <span className="branch-view-map">
                  View on map
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}