import BranchMap from "./components/BranchMap";
import Header from "./components/Header";


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <BranchMap />
      </main>
    </div>
  );
}


export default App
