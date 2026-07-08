import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import BranchList from "./components/BranchList/BranchList";
import BranchMap from "./components/BranchMap/BranchMap";

import { API_PATHS } from "./api/constants/api-paths";
import { branchApiService } from "./api/BranchApiService";


export default function App() {
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBranches() {
      try {
        setLoading(true);

        const url = new URL(API_PATHS.BRANCHES, window.location.origin);

        if (search) {
          url.searchParams.set("search", search);
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setBranches(data.branches);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadBranches();
  }, [search]);

async function handleLocationFound(coordinates) {
  try {
    setLoading(true);

    const data = await branchApiService.searchNearbyBranches({
      coordinates,
    });

    setBranches(data.branches);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="app">
      <Header
        onSearch={setSearch}
        onLocationFound={handleLocationFound}
      />

      <main className="app-content">
        <div className="locator-layout">
          <BranchList
            branches={branches}
            loading={loading}
          />

          <div className="map-card">
            <BranchMap
              branches={branches}
            />
          </div>
        </div>
      </main>
    </div>
  );
}