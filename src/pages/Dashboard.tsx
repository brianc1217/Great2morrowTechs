import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import { studyTopics } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";
import type { Technician } from "../types/technician";

interface DashboardProps {
  technician: Technician;
}

export default function Dashboard({
  technician,
}: DashboardProps) {
  const { completedTopics, correctAnswers } = useStudyProgress();
  const nextTopic = studyTopics.find((topic) => !completedTopics.includes(topic.id)) ?? studyTopics[0];
  const studyPercent = Math.round((completedTopics.length / studyTopics.length) * 100);
  const xp = correctAnswers.length * 100;
  const level = Math.floor(xp / 300) + 1;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Ready to study, ${technician.name}?`}
        subtitle="Work training tickets like a real help-desk technician and earn XP for correct resolutions."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Topics Complete"
          value={`${completedTopics.length}/${studyTopics.length}`}
          icon="📚"
          color="bg-blue-100"
        />

        <StatCard
          title="Study Progress"
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
          What to study next
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Topic"
            value={nextTopic.title}
          />

          <SummaryCard
            title="Focus"
            value={nextTopic.domain}
          />

          <SummaryCard
          title="Your next move"
          value="Work a training ticket"
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
