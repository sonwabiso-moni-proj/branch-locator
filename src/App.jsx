import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import BranchList from "./components/BranchList/BranchList";
import BranchMap from "./components/BranchMap/BranchMap";

import { branchApiService } from "./api/BranchApiService";

export default function App() {
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadBranches() {
      try {
        setLoading(true);

        // When the user searches or changes filter,
        // reset the selected branch so the map does not stay on an old branch.
        setSelectedBranch(null);

        const params = {
          search,
          pageSize: 60,
        };

        if (activeFilter === "ATM") {
          params.facility = "ATM";
        }

        if (activeFilter === "Cash Accepting ATM") {
          params.facility = "Cash Accepting ATM";
        }

        if (activeFilter === "Smart ID Services") {
          params.service = "Smart ID Services";
        }

        if (activeFilter === "Business Banking Centre") {
          params.service = "Business Banking Centre";
        }

        const data = await branchApiService.getBranches(params);

        setBranches(data.branches);
      } catch (error) {
        console.error("Error loading branches:", error);
        setBranches([]);
      } finally {
        setLoading(false);
      }
    }

    loadBranches();
  }, [search, activeFilter]);

  async function handleLocationFound(coordinates) {
    try {
      setLoading(true);

      setSelectedBranch(null);

      const data = await branchApiService.searchNearbyBranches({
        coordinates,
      });

      setBranches(data.branches);
    } catch (error) {
      console.error("Error loading nearby branches:", error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  }

  function handleBranchSelect(branch) {
    setSelectedBranch(branch);
  }

  return (
    <div className="app">
      <Header
        onSearch={setSearch}
        onLocationFound={handleLocationFound}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <main className="app-content">
        <div className="locator-layout">
          <BranchList
            branches={branches}
            loading={loading}
            selectedBranch={selectedBranch}
            onBranchSelect={handleBranchSelect}
          />

          <div className="map-card">
            <BranchMap
              branches={branches}
              selectedBranch={selectedBranch}
              onBranchSelect={handleBranchSelect}
            />
          </div>
        </div>
      </main>
    </div>
  );
}