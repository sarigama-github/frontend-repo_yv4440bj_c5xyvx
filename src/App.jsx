import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import Features from "./components/Features";
import DemoPanel from "./components/DemoPanel";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero3D />
      <Features />
      <DemoPanel />
      <footer className="border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">Built for exploring GNNs in cybersecurity.</p>
          <a href="/test" className="text-sm text-gray-700 hover:text-gray-900">Check backend status</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
