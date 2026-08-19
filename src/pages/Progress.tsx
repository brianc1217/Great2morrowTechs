import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import { practiceQuestions, studyTopics } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";

export default function Progress() {
  const { completedTopics, correctAnswers } = useStudyProgress();
  const topicsLeft = studyTopics.length - completedTopics.length;
  const xp = correctAnswers.length * 100;
  const level = Math.floor(xp / 300) + 1;
  const domainTotals = [...new Set(studyTopics.map((topic) => topic.domain))].map((domain) => ({ domain, complete: studyTopics.filter((topic) => topic.domain === domain && completedTopics.includes(topic.id)).length, total: studyTopics.filter((topic) => topic.domain === domain).length }));

  return (
    <div className="space-y-8">
      <PageHeader title="My A+ Progress" subtitle="Your progress is saved on this device, so you can pick up where you left off." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Topics Complete" value={`${completedTopics.length}/${studyTopics.length}`} icon="📚" color="bg-blue-100" />
        <StatCard title="Topics Remaining" value={topicsLeft} icon="📝" color="bg-slate-100" />
        <StatCard title="Training Tickets Solved" value={`${correctAnswers.length}/${practiceQuestions.length}`} icon="✅" color="bg-green-100" />
        <StatCard title={`Level ${level} Experience`} value={`${xp} XP`} icon="🏅" color="bg-amber-100" />
      </div>
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Topics by domain</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domainTotals.map(({ domain, complete, total }) => <div key={domain} className="rounded-lg bg-slate-50 p-5"><p className="text-sm text-slate-500">{domain}</p><p className="mt-2 text-3xl font-bold">{complete}/{total}</p><p className="mt-1 text-sm text-slate-600">topics completed</p></div>)}
        </div>
      </section>
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">A simple study routine</h2>
        <p className="mt-2 text-slate-600">Start by opening a Training Ticket. Read the user issue, choose the best response, and earn 100 XP when you resolve it correctly. Use the Study Plan and Flashcards when you need a review.</p>
      </section>
    </div>
  );
}
