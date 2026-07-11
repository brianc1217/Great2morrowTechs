import { NavLink } from "react-router-dom";

export default function Sidebar() {
  function menuItem(to: string, label: string) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block w-full rounded-lg px-4 py-3 ${
            isActive
              ? "bg-slate-700 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`
        }
      >
        {label}
      </NavLink>
    );
  }

  return (
    <aside className="w-64 bg-slate-900 p-6">
      <h1 className="mb-10 text-2xl font-bold text-white">
        Great 2morrow Techs
      </h1>

      <nav className="space-y-2">
        {menuItem("/dashboard", "Dashboard")}
        {menuItem("/tickets", "Tickets")}
        {menuItem("/tickets/new", "New Ticket")}
        {menuItem("/progress", "Progress")}
        {menuItem("/settings", "Settings")}
      </nav>
    </aside>
  );
}