import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import { ticketScenarios } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";

export default function Progress() {
  const { correctAnswers } = useStudyProgress();
  const solved = correctAnswers.filter((id) => id.startsWith("ticket-"));
  const topicsLeft = ticketScenarios.length - solved.length;
  const xp = solved.length * 100;
  const level = Math.floor(xp / 300) + 1;
  const domainTotals = [...new Set(ticketScenarios.map((scenario) => scenario.domain))].map((domain) => ({ domain, complete: ticketScenarios.filter((scenario) => scenario.domain === domain && solved.includes(`ticket-${scenario.ticketId}`)).length, total: ticketScenarios.filter((scenario) => scenario.domain === domain).length }));

  return (
    <div className="space-y-8">
      <PageHeader title="My A+ Progress" subtitle="Your progress is saved on this device, so you can pick up where you left off." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Tickets Solved" value={`${solved.length}/${ticketScenarios.length}`} icon="🎫" color="bg-blue-100" />
        <StatCard title="Tickets Remaining" value={topicsLeft} icon="📝" color="bg-slate-100" />
        <StatCard title="Correct Resolutions" value={`${solved.length}/${ticketScenarios.length}`} icon="✅" color="bg-green-100" />
        <StatCard title={`Level ${level} Experience`} value={`${xp} XP`} icon="🏅" color="bg-amber-100" />
      </div>
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Tickets by A+ domain</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domainTotals.map(({ domain, complete, total }) => <div key={domain} className="rounded-lg bg-slate-50 p-5"><p className="text-sm text-slate-500">{domain}</p><p className="mt-2 text-3xl font-bold">{complete}/{total}</p><p className="mt-1 text-sm text-slate-600">tickets solved</p></div>)}
        </div>
      </section>
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">A simple study routine</h2>
        <p className="mt-2 text-slate-600">Open an A+ Ticket Lab scenario, work through its investigation checklist, keep notes in the ticket comments, then choose the best diagnosis to earn XP.</p>
      </section>
    </div>
  );
}
