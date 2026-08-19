import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import { useTickets } from "../hooks/useTickets";

export default function Progress() {
  const { tickets } = useTickets();
  const activeTickets = tickets.filter((ticket) => !ticket.archivedAt);
  const archivedTickets = tickets.filter((ticket) => ticket.archivedAt);
  const resolvedTickets = archivedTickets.filter((ticket) => ticket.status === "Resolved" || ticket.status === "Closed");
  const totalResolutionMinutes = resolvedTickets.reduce((total, ticket) => total + (ticket.resolutionTimeMinutes ?? 0), 0);
  const averageResolutionMinutes = resolvedTickets.length ? Math.round(totalResolutionMinutes / resolvedTickets.length) : 0;
  const priorityTotals = ["Critical", "High", "Medium", "Low"].map((priority) => ({ priority, count: tickets.filter((ticket) => ticket.priority === priority).length }));

  return (
    <div className="space-y-8">
      <PageHeader title="Reports" subtitle="A simple view of ticket workload and completed work." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Tickets" value={activeTickets.length} icon="📂" color="bg-blue-100" />
        <StatCard title="Archived Tickets" value={archivedTickets.length} icon="🗂️" color="bg-slate-100" />
        <StatCard title="Resolved Work" value={resolvedTickets.length} icon="✅" color="bg-green-100" />
        <StatCard title="Avg. Resolution Time" value={averageResolutionMinutes} icon="⏱️" color="bg-amber-100" />
      </div>
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Tickets by priority</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {priorityTotals.map(({ priority, count }) => <div key={priority} className="rounded-lg bg-slate-50 p-5"><p className="text-sm text-slate-500">{priority}</p><p className="mt-2 text-3xl font-bold">{count}</p></div>)}
        </div>
      </section>
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Time logged</h2>
        <p className="mt-2 text-slate-600">{totalResolutionMinutes} total minutes logged across resolved and closed tickets.</p>
      </section>
    </div>
  );
}
