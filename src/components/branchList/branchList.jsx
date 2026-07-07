import "./BranchList.css";

export default function BranchList({
  branches,
  loading,
}) {
  if (loading) {
    return (
      <div className="branch-list">
        Loading...
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="branch-list">
        No branches found.
      </div>
    );
  }

  return (
    <div className="branch-list">

      <h2>Branches</h2>

      {branches.map((branch) => (

        <div
          key={branch.id}
          className="branch-card"
        >

          <h3>{branch.name}</h3>

          <p>{branch.address}</p>

          <p>{branch.province}</p>

          <div className="branch-footer">

            <span
              className={
                branch.isOpen
                  ? "status-open"
                  : "status-closed"
              }
            >
              {branch.isOpen ? "Open" : "Closed"}
            </span>

            <span>
              ⭐ {branch.rating ?? "-"}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}