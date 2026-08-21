import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import { useTickets } from "../hooks/useTickets";

export default function HelpDeskReports() {
  const { tickets } = useTickets();
  const today = new Date().toDateString();
  const count = (status: string) => tickets.filter((ticket) => ticket.status === status && !ticket.archivedAt).length;
  const resolvedToday = tickets.filter((ticket) => ticket.resolvedAt?.toDateString() === today).length;
  const closedToday = tickets.filter((ticket) => ticket.status === "Closed" && ticket.updated.toDateString() === today).length;
  return <div className="space-y-8"><PageHeader title="Reports" subtitle="Current Help Desk workload and completed work." /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"><StatCard title="New" value={count("New")} icon="🆕" color="bg-blue-100" /><StatCard title="Assigned" value={count("Assigned")} icon="👤" color="bg-indigo-100" /><StatCard title="Waiting on User" value={count("Waiting on User")} icon="⏳" color="bg-yellow-100" /><StatCard title="Resolved Today" value={resolvedToday} icon="✅" color="bg-green-100" /></div><section className="rounded-xl border bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold">Closed Today</h2><p className="mt-2 text-3xl font-bold">{closedToday}</p></section></div>;
}
