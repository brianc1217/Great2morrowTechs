import type { Technician } from "../types/technician";

import { useTickets } from "../hooks/useTickets";

import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";

interface DashboardProps {
  technician: Technician;
}

export default function Dashboard({
  technician,
}: DashboardProps) {
  const { tickets } = useTickets();

  const open = tickets.filter(
    (t) => t.status === "Open"
  ).length;

  const critical = tickets.filter(
    (t) => t.priority === "Critical"
  ).length;

  const waiting = tickets.filter(
    (t) => t.status === "Waiting"
  ).length;

  const resolved = tickets.filter(
    (t) =>
      t.status === "Resolved" ||
      t.status === "Closed"
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${technician.name}`}
        subtitle="Here's what's happening today."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Open Tickets"
          value={open}
          icon="📂"
          color="bg-blue-100"
        />

        <StatCard
          title="Critical"
          value={critical}
          icon="🔥"
          color="bg-red-100"
        />

        <StatCard
          title="Waiting"
          value={waiting}
          icon="⏳"
          color="bg-yellow-100"
        />

        <StatCard
          title="Resolved"
          value={resolved}
          icon="✅"
          color="bg-green-100"
        />
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">
          Technician Summary
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Technician"
            value={technician.name}
          />

          <SummaryCard
            title="Level"
            value={technician.level.toString()}
          />

          <SummaryCard
            title="XP"
            value={technician.xp.toString()}
          />
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
}

function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-lg bg-slate-100 p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {value}
      </h3>
    </div>
  );
}