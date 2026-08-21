import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import { useTickets } from "../hooks/useTickets";
import type { Technician } from "../types/technician";

interface DashboardProps {
  technician: Technician;
}

export default function Dashboard({
  technician,
}: DashboardProps) {
  const { tickets } = useTickets();
  const count = (status: string) => tickets.filter((ticket) => ticket.status === status && !ticket.archivedAt).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${technician.name}`}
        subtitle="Here is your current Help Desk workload."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="New Tickets"
          value={count("New")}
          icon="🆕"
          color="bg-blue-100"
        />

        <StatCard
          title="Assigned"
          value={count("Assigned")}
          icon="👤"
          color="bg-purple-100"
        />

        <StatCard
          title="In Progress"
          value={count("In Progress")}
          icon="🛠️"
          color="bg-green-100"
        />

        <StatCard
          title="Waiting on User"
          value={count("Waiting on User")}
          icon="⏳"
          color="bg-amber-100"
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
            title="Resolved"
            value={count("Resolved").toString()}
          />

          <SummaryCard
          title="Current Level"
          value={technician.level.toString()}
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
