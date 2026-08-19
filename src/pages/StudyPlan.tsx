import PageHeader from "../components/common/PageHeader";
import { studyTopics } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";

export default function StudyPlan() {
  const { completedTopics, toggleTopic } = useStudyProgress();
  return <div className="space-y-8">
    <PageHeader title="A+ Study Plan" subtitle="Work through one topic at a time, then mark it complete." />
    <div className="grid gap-4 md:grid-cols-2">
      {studyTopics.map((topic) => {
        const complete = completedTopics.includes(topic.id);
        return <button key={topic.id} onClick={() => toggleTopic(topic.id)} className={`rounded-xl border p-5 text-left shadow-sm transition hover:shadow-md ${complete ? "border-green-300 bg-green-50" : "bg-white"}`}>
          <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-blue-700">{topic.domain}</p><h2 className="mt-1 text-xl font-bold">{topic.title}</h2><p className="mt-2 text-slate-600">{topic.description}</p></div><span className="text-2xl">{complete ? "✅" : "⬜"}</span></div>
          <p className="mt-4 text-sm font-medium">{complete ? "Completed — click to undo" : "Click when you finish this topic"}</p>
        </button>;
      })}
    </div>
  </div>;
}
