import { useEffect, useState } from "react";

const TOPICS_KEY = "g2t-aplus-completed-topics";
const QUESTIONS_KEY = "g2t-aplus-correct-answers";

function readList(key: string): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function useStudyProgress() {
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => readList(TOPICS_KEY));
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(() => readList(QUESTIONS_KEY));

  useEffect(() => { localStorage.setItem(TOPICS_KEY, JSON.stringify(completedTopics)); }, [completedTopics]);
  useEffect(() => { localStorage.setItem(QUESTIONS_KEY, JSON.stringify(correctAnswers)); }, [correctAnswers]);

  const toggleTopic = (id: string) => setCompletedTopics((current) => current.includes(id) ? current.filter((topic) => topic !== id) : [...current, id]);
  const markCorrect = (id: string) => setCorrectAnswers((current) => current.includes(id) ? current : [...current, id]);

  return { completedTopics, correctAnswers, toggleTopic, markCorrect };
}
