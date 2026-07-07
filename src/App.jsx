import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import BranchMap from "./components/BranchMap/BranchMap";
import BranchList from "./components/BranchList/BranchList";

import { API_PATHS } from "./api/constants/api-paths";

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

  return (
    <div className="min-h-screen bg-slate-50">

      <Header onSearch={setSearch} />

      <main className="max-w-7xl mx-auto px-6 py-10">

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