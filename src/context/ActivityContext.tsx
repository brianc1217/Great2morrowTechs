import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { activity as initialActivity } from "../data/activity";
import type { Activity } from "../types/activity";

interface ActivityContextType {
  activity: Activity[];
  addActivity: (message: string) => void;
}

const ActivityContext = createContext<ActivityContextType | null>(null);

export function ActivityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activity, setActivity] = useState<Activity[]>(
    initialActivity
  );

  function addActivity(message: string) {
    setActivity((previous: Activity[]) => [
      {
        id: Date.now(),
        message,
        created: new Date(),
      },
      ...previous,
    ]);
  }

  return (
    <ActivityContext.Provider
      value={{
        activity,
        addActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivityContext() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivityContext must be used inside ActivityProvider."
    );
  }

  return context;
}