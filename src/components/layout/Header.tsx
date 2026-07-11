import type { Technician } from "../../types/technician";

interface HeaderProps {
  technician: Technician;
  onClockOut: () => void;
}

export default function Header({
  technician,
  onClockOut,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Great 2morrow Techs
        </h1>

        <p className="text-sm text-gray-500">
          IT Service Management Platform
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-semibold">{technician.name}</p>

          <p className="text-sm text-gray-500">
            Level {technician.level} • {technician.xp} XP
          </p>
        </div>

        <button
          onClick={onClockOut}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Clock Out
        </button>
      </div>
    </header>
  );
}