import { Menu, Shield, Github } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 grid place-items-center text-white shadow-lg shadow-violet-600/30">
              <Shield size={18} />
            </div>
            <span className="font-semibold text-gray-900">GNN Cyber</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm text-gray-700 hover:text-gray-900" href="#features">Features</a>
            <a className="text-sm text-gray-700 hover:text-gray-900" href="#demo">Demo</a>
            <a className="text-sm text-gray-700 hover:text-gray-900" href="/test">Backend Test</a>
            <a className="inline-flex items-center gap-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-3.5 py-2 rounded-md shadow-sm" href="https://github.com" target="_blank" rel="noreferrer">
              <Github size={16} />
              Star
            </a>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu />
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <a className="block text-sm text-gray-700 hover:text-gray-900" href="#features">Features</a>
            <a className="block text-sm text-gray-700 hover:text-gray-900" href="#demo">Demo</a>
            <a className="block text-sm text-gray-700 hover:text-gray-900" href="/test">Backend Test</a>
          </div>
        )}
      </div>
    </header>
  );
}
