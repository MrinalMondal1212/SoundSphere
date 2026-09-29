import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";

// Top navigation tabs
const topTabs = [
  { label: "Home", path: "/", end: true },
  { label: "Discover", path: "/discover", end: false },
  { label: "Premium", path: "/premium", end: false },
  { label: "Artist", path: "/artist", end: false },
];

const Topbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Profile button click
  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      // User is logged in
      navigate("/profile");
    } else {
      // User is not logged in
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-surface border-b border-border flex items-center px-6 gap-6 flex-shrink-0">

      {/* Search */}
      <div className="flex items-center bg-card border border-border rounded-lg px-3 py-2 gap-2 w-52 flex-shrink-0">
        <Search size={15} className="text-text-muted flex-shrink-0" />

        <input
          type="text"
          placeholder="Search songs, artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-text placeholder:text-text-muted outline-none w-full"
        />
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1 flex-1">
        {topTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "text-text-secondary hover:text-text hover:bg-card"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4 flex-shrink-0">

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-xs select-none">
            Dark
          </span>

          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
              isDark ? "bg-primary" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                isDark ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* User Profile Button */}
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <User size={13} className="text-white" />
          </div>

          <span className="text-sm text-text-secondary font-medium">
            Profile
          </span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;