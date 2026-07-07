import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Header({ onSearch }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Branch Locator</h1>

        <p>
          Use our branch locator below to find your nearest branch.
          Use the filters to see ATMs, branches or Smart ID services.
        </p>

        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
}