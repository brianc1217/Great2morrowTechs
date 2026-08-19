import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { flashcards } from "../data/aPlusStudy";

export default function Flashcards() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const card = flashcards[index];
  const move = (direction: number) => { setIndex((current) => (current + direction + flashcards.length) % flashcards.length); setShowAnswer(false); };
  return <div className="space-y-8"><PageHeader title="A+ Flashcards" subtitle="Read the question, say your answer out loud, then reveal it." />
    <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 text-center shadow-sm"><p className="text-sm font-semibold text-blue-700">{card.domain} · Card {index + 1} of {flashcards.length}</p><p className="mt-8 text-3xl font-bold leading-relaxed">{showAnswer ? card.back : card.front}</p><button onClick={() => setShowAnswer(!showAnswer)} className="mt-10 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">{showAnswer ? "Show question" : "Reveal answer"}</button></div>
    <div className="flex justify-center gap-4"><button onClick={() => move(-1)} className="rounded-lg border bg-white px-5 py-3 font-semibold">Previous</button><button onClick={() => move(1)} className="rounded-lg border bg-white px-5 py-3 font-semibold">Next</button></div>
  </div>;
}
