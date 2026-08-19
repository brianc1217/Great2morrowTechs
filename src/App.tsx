import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import TicketDetails from "./pages/TicketDetails";
import ResolveTicket from "./pages/ResolveTicket";
import TicketHistory from "./pages/TicketHistory";
import Progress from "./pages/Progress";
import StudyPlan from "./pages/StudyPlan";
import Flashcards from "./pages/Flashcards";
import PracticeQuestions from "./pages/PracticeQuestions";
import TrainingTickets from "./pages/TrainingTickets";
import TrainingTicketDetail from "./pages/TrainingTicketDetail";
import Settings from "./pages/Settings";
import ClockIn from "./pages/ClockIn";

import { TicketProvider } from "./context/TicketContext";

import type { Technician } from "./types/technician";

const STORAGE_KEY = "g2t-technician";

export default function App() {
  const [technician, setTechnician] =
    useState<Technician>(() => {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        return {
          ...parsed,
          clockInTime: parsed.clockInTime
            ? new Date(parsed.clockInTime)
            : null,
        };
      }

      return {
        name: "Brian",
        clockedIn: false,
        clockInTime: null,
        totalHoursThisWeek: 0,
        xp: 0,
        level: 1,
      };
    });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(technician)
    );
  }, [technician]);

  function handleClockIn() {
    setTechnician((previous) => ({
      ...previous,
      clockedIn: true,
      clockInTime: new Date(),
    }));
  }

  function handleClockOut() {
    localStorage.removeItem(STORAGE_KEY);

    setTechnician({
      name: "Brian",
      clockedIn: false,
      clockInTime: null,
      totalHoursThisWeek: 0,
      xp: 0,
      level: 1,
    });
  }

  if (!technician.clockedIn) {
    return (
      <ClockIn onClockIn={handleClockIn} />
    );
  }

  return (
    <TicketProvider>
      <MainLayout
        technician={technician}
        onClockOut={handleClockOut}
      >
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard technician={technician} />
            }
          />

          <Route
            path="/tickets"
            element={<Tickets />}
          />

          <Route
            path="/tickets/new"
            element={<NewTicket />}
          />

          <Route
            path="/tickets/:id"
            element={<TicketDetails />}
          />

          <Route
            path="/tickets/:id/resolve"
            element={<ResolveTicket />}
          />

          <Route path="/history" element={<TicketHistory />} />

          <Route
            path="/progress"
            element={<Progress />}
          />

          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/practice" element={<PracticeQuestions />} />
          <Route path="/training" element={<TrainingTickets />} />
          <Route path="/training/:id" element={<TrainingTicketDetail />} />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Routes>
      </MainLayout>
    </TicketProvider>
  );
}
