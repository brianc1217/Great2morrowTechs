import { useState } from "react";

type ClockInProps = {
  onClockIn: (name: string) => void;
};

export default function ClockIn({ onClockIn }: ClockInProps) {
  const [name, setName] = useState("");

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-8">
          Great 2morrow Techs
        </h1>

        <label className="block mb-2 font-medium">
          Technician Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full border rounded-lg px-4 py-3 mb-6"
        />

        <button
          disabled={!name.trim()}
          onClick={() => onClockIn(name)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg"
        >
          Clock In
        </button>

      </div>
    </div>
  );
}