import { useState, type FormEvent } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useTickets } from "../hooks/useTickets";

import PageHeader from "../components/common/PageHeader";
import TicketForm from "../components/tickets/TicketForm";

import type { Ticket } from "../types/ticket";

export default function TicketDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { tickets, updateTicket } = useTickets();

  const ticket = tickets.find(
    (t) => t.id === Number(id)
  );

  const [comment, setComment] = useState("");

  if (!ticket) {
    return <Navigate to="/tickets" replace />;
  }

  const currentTicket = ticket;

  function handleSave(updatedTicket: Ticket) {
    updateTicket(updatedTicket);

    navigate("/tickets");
  }

  function moveTicket(status: Ticket["status"]) {
    updateTicket({
      ...currentTicket,
      status,
      assignedTo: status === "Assigned" && currentTicket.assignedTo === "Unassigned" ? "Brian" : currentTicket.assignedTo,
      updated: new Date(),
    });
  }

  function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = comment.trim();
    if (!message) return;

    updateTicket({
      ...currentTicket,
      updated: new Date(),
      comments: [
        ...currentTicket.comments,
        { id: Date.now(), author: "Brian", message, created: new Date() },
      ],
    });
    setComment("");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Ticket #${currentTicket.id}`}
        subtitle="Help Desk ticket details"
      />

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Ticket workflow</h2>
        <p className="mt-1 text-slate-500">Current status: <span className="font-semibold text-slate-800">{currentTicket.status}</span></p>
        <div className="mt-4 flex flex-wrap gap-3">
          {currentTicket.status === "New" && <button onClick={() => moveTicket("Assigned")} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Assign to me</button>}
          {currentTicket.status === "Assigned" && <button onClick={() => moveTicket("In Progress")} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Start work</button>}
          {currentTicket.status === "In Progress" && <><button onClick={() => moveTicket("Waiting on User")} className="rounded-lg border px-4 py-2 font-semibold hover:bg-slate-100">Waiting on user</button><button onClick={() => navigate(`/tickets/${currentTicket.id}/resolve`)} className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white">Resolve ticket</button></>}
          {currentTicket.status === "Waiting on User" && <button onClick={() => moveTicket("In Progress")} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Resume work</button>}
          {currentTicket.status === "Resolved" && <button onClick={() => moveTicket("In Progress")} className="rounded-lg border px-4 py-2 font-semibold hover:bg-slate-100">Reopen ticket</button>}
        </div>
      </section>

      <div className="rounded-xl border bg-white p-8 shadow-sm"><TicketForm initialTicket={currentTicket} submitText="Save Changes" onSubmit={handleSave} /></div>

      <section className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <p className="mt-1 text-slate-500">Keep a record of troubleshooting updates and customer communication.</p>
        <div className="mt-6 space-y-4">
          {currentTicket.comments.length === 0 ? (
            <p className="rounded-lg bg-slate-50 p-4 text-slate-500">No comments yet.</p>
          ) : currentTicket.comments.map((item) => (
            <article key={item.id} className="rounded-lg bg-slate-50 p-4">
              <div className="flex justify-between gap-4"><strong>{item.author}</strong><span className="text-sm text-slate-500">{item.created.toLocaleString()}</span></div>
              <p className="mt-2 whitespace-pre-wrap text-slate-700">{item.message}</p>
            </article>
          ))}
        </div>
        <form onSubmit={addComment} className="mt-6 space-y-3">
          <label className="block font-semibold" htmlFor="comment">Add a comment</label>
          <textarea id="comment" rows={4} value={comment} onChange={(event) => setComment(event.target.value)} className="w-full rounded-lg border p-3" placeholder="Add a troubleshooting note or update." />
          <button className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Post comment</button>
        </form>
      </section>
    </div>
  );
}
