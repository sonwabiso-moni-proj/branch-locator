import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import BranchList from "./components/BranchList/BranchList";
import BranchMap from "./components/BranchMap/BranchMap";

import { branchApiService } from "./api/BranchApiService";

const FILTER_PARAM_MAP = {
  "ATM": { facility: "ATM" },
  "Cash Accepting ATM": { facility: "Cash Accepting ATM" },
  "Smart ID Services": { service: "Smart ID Services" },
  "Business Banking Centre": { service: "Business Banking Centre" },
};

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    async function loadBranches() {
      try {
        setLoading(true);
        setSelectedBranch(null);

        const filterParam = FILTER_PARAM_MAP[activeFilter] ?? {};
        const params = { search, pageSize: 60, ...filterParam };

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

  return (
    <div className="app">
      <Header
        onSearch={setSearchInput}
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
            onBranchSelect={setSelectedBranch}
          />

          <div className="map-card">
            <BranchMap
              branches={branches}
              selectedBranch={selectedBranch}
              onBranchSelect={setSelectedBranch}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
