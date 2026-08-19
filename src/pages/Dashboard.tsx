import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import { ticketScenarios } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";
import type { Technician } from "../types/technician";

interface DashboardProps {
  technician: Technician;
}

export default function Dashboard({
  technician,
}: DashboardProps) {
  const { correctAnswers } = useStudyProgress();
  const solved = correctAnswers.filter((id) => id.startsWith("ticket-"));
  const nextTicket = ticketScenarios.find((item) => !solved.includes(`ticket-${item.ticketId}`)) ?? ticketScenarios[0];
  const studyPercent = Math.round((solved.length / ticketScenarios.length) * 100);
  const xp = solved.length * 100;
  const level = Math.floor(xp / 300) + 1;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Ready to study, ${technician.name}?`}
        subtitle="Work training tickets like a real help-desk technician and earn XP for correct resolutions."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Tickets Solved"
          value={`${solved.length}/${ticketScenarios.length}`}
          icon="🎫"
          color="bg-blue-100"
        />

        <StatCard
          title="Ticket Progress"
          value={`${studyPercent}%`}
          icon="🎯"
          color="bg-purple-100"
        />

        <StatCard
          title="Experience"
          value={`${xp} XP`}
          icon="⚡"
          color="bg-green-100"
        />

        <StatCard
          title="Current Level"
          value={level}
          icon="🏅"
          color="bg-amber-100"
        />
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">
          What to work next
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Ticket"
            value={`#${nextTicket.ticketId}`}
          />

          <SummaryCard
            title="A+ focus"
            value={nextTicket.domain}
          />

          <SummaryCard
          title="Your next move"
          value="Open the ticket lab"
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
