import Header from "./Header";
import Sidebar from "./Sidebar";

import type { Technician } from "../../types/technician";

type MainLayoutProps = {
  technician: Technician;
  onClockOut: () => void;
  children: React.ReactNode;
};

export default function MainLayout({
  technician,
  onClockOut,
  children,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header
          technician={technician}
          onClockOut={onClockOut}
        />

        <main className="flex-1 overflow-auto bg-slate-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}