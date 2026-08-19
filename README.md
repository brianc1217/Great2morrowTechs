# Great 2morrow Techs

A local-first help desk ticketing app built as a practical IT-support portfolio project. It lets a technician clock in, create and manage tickets, document troubleshooting, resolve work, and review ticket history and basic workload reports.

## Version 1 features

- Technician clock-in experience
- Dashboard with ticket counts
- Create and edit tickets
- Active Ticket Queue with search
- Resolve workflow with resolution notes, category, and time worked
- Ticket History for resolved and closed work
- Reopen archived tickets when more work is needed
- Per-ticket comments for troubleshooting notes and updates
- Basic reports for ticket volume, priorities, and resolution time
- Browser `localStorage` persistence; no backend required for Version 1

## Ticket workflow

```text
Active Ticket Queue
        |
        v
Resolve Ticket (notes, category, time worked)
        |
        v
Ticket History
        |
        +--> Reopen --> Active Ticket Queue
```

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, normally `http://localhost:5173`.

## Verify the app

```bash
npm run build
npm run lint
```

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

## Future ideas

Version 2 can add inventory, technician roles, notifications, attachments, knowledge base articles, and a hosted backend. Those are intentionally outside Version 1 so the project stays focused and demonstrable.
