import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-slate-700 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 bg-slate-900 p-6">
      <h1 className="mb-10 text-2xl font-bold text-white">
        Great 2morrow Techs
      </h1>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          Study Dashboard
        </NavLink>

        <NavLink to="/training" className={linkClass}>
          Training Tickets
        </NavLink>

        <NavLink to="/flashcards" className={linkClass}>
          Flashcards
        </NavLink>

        <NavLink to="/study-plan" className={linkClass}>
          Study Plan
        </NavLink>

        <NavLink to="/progress" className={linkClass}>
          My Progress
        </NavLink>

        <NavLink to="/flashcards" className={linkClass}>
          Flashcards
        </NavLink>

        <p className="px-4 pt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">Portfolio tools</p>

        <NavLink to="/tickets" className={linkClass}>
          Live Ticket Queue
        </NavLink>

        <NavLink to="/history" className={linkClass}>
          Ticket History
        </NavLink>
      </nav>
    </aside>
  );
}
