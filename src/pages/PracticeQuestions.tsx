import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { practiceQuestions } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";

export default function PracticeQuestions() {
  const [index, setIndex] = useState(0); const [selected, setSelected] = useState<number | null>(null);
  const { correctAnswers, markCorrect } = useStudyProgress(); const question = practiceQuestions[index]; const answered = selected !== null;
  const choose = (choice: number) => { if (answered) return; setSelected(choice); if (choice === question.answer) markCorrect(question.id); };
  const next = () => { setIndex((current) => (current + 1) % practiceQuestions.length); setSelected(null); };
  return <div className="space-y-8"><PageHeader title="Practice Questions" subtitle="Choose an answer, read why, then move to the next question." />
    <section className="mx-auto max-w-3xl rounded-xl border bg-white p-7 shadow-sm"><p className="text-sm font-semibold text-blue-700">{question.domain} · Question {index + 1} of {practiceQuestions.length}</p><h2 className="mt-4 text-2xl font-bold leading-relaxed">{question.question}</h2><div className="mt-6 space-y-3">{question.choices.map((choice, choiceIndex) => { const state = answered ? choiceIndex === question.answer ? "border-green-500 bg-green-50" : choiceIndex === selected ? "border-red-400 bg-red-50" : "border-slate-200" : "border-slate-200 hover:border-blue-400 hover:bg-blue-50"; return <button key={choice} onClick={() => choose(choiceIndex)} className={`block w-full rounded-lg border p-4 text-left font-medium ${state}`}>{String.fromCharCode(65 + choiceIndex)}. {choice}</button>; })}</div>
      {answered && <div className={`mt-6 rounded-lg p-4 ${selected === question.answer ? "bg-green-50 text-green-900" : "bg-amber-50 text-amber-900"}`}><p className="font-bold">{selected === question.answer ? "Correct!" : "Not quite."}</p><p className="mt-1">{question.explanation}</p></div>}
      {answered && <button onClick={next} className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">Next question</button>}
    </section><p className="text-center text-sm text-slate-600">{correctAnswers.length} of {practiceQuestions.length} questions answered correctly so far.</p>
  </div>;
}
