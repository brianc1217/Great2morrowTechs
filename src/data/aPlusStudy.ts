export type APlusDomain = "Hardware" | "Networking" | "Mobile Devices" | "Operating Systems" | "Troubleshooting" | "Security";

export interface StudyTopic {
  id: string;
  domain: APlusDomain;
  title: string;
  description: string;
}

export interface Flashcard {
  id: string;
  domain: APlusDomain;
  front: string;
  back: string;
}

export interface PracticeQuestion {
  id: string;
  domain: APlusDomain;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export interface TrainingScenario extends PracticeQuestion {
  ticketNumber: string;
  requester: string;
  urgency: "Low" | "Medium" | "High";
  points: number;
}

export interface TicketScenario {
  ticketId: number;
  domain: APlusDomain;
  goal: string;
  checks: string[];
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  points: number;
}

export const studyTopics: StudyTopic[] = [
  { id: "hardware-pc", domain: "Hardware", title: "PC components", description: "CPUs, RAM, storage, power supplies, and expansion cards." },
  { id: "hardware-printers", domain: "Hardware", title: "Printers", description: "Laser, inkjet, thermal, impact, and common fixes." },
  { id: "networking-basics", domain: "Networking", title: "Network basics", description: "Ports, protocols, IP addressing, Wi-Fi, and cables." },
  { id: "mobile", domain: "Mobile Devices", title: "Mobile devices", description: "Phones, tablets, accessories, and mobile troubleshooting." },
  { id: "windows", domain: "Operating Systems", title: "Windows", description: "Windows tools, settings, commands, and installation." },
  { id: "troubleshooting", domain: "Troubleshooting", title: "Troubleshooting process", description: "Identify, test, fix, verify, and document." },
  { id: "security", domain: "Security", title: "Security basics", description: "Malware, passwords, permissions, and safe work habits." },
];

export const flashcards: Flashcard[] = [
  { id: "port-443", domain: "Networking", front: "What port does HTTPS use?", back: "TCP port 443." },
  { id: "ram", domain: "Hardware", front: "What does RAM do?", back: "It temporarily stores data and programs that the CPU is actively using." },
  { id: "ipconfig", domain: "Operating Systems", front: "Which Windows command shows IP configuration?", back: "ipconfig. Use ipconfig /all for more detail." },
  { id: "laser", domain: "Hardware", front: "A laser printer leaves repeating marks. What is a likely cause?", back: "A worn drum or other imaging component may be causing the repeated defect." },
  { id: "mfa", domain: "Security", front: "What is MFA?", back: "Multi-factor authentication: two or more ways to prove your identity." },
  { id: "methodology", domain: "Troubleshooting", front: "What comes after testing a theory?", back: "Establish a plan of action and implement the solution." },
];

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: "q-https", domain: "Networking", question: "A technician needs to allow secure web browsing through a firewall. Which port should be allowed?", choices: ["21", "22", "80", "443"], answer: 3, explanation: "HTTPS encrypts web traffic and uses TCP port 443.",
  },
  {
    id: "q-ram", domain: "Hardware", question: "Which component provides temporary working memory for running programs?", choices: ["SSD", "RAM", "Power supply", "Motherboard"], answer: 1, explanation: "RAM is volatile memory used by active programs and the operating system.",
  },
  {
    id: "q-malware", domain: "Security", question: "Which action best reduces the chance of a user entering credentials on a fake website?", choices: ["Disable updates", "Use MFA and verify the URL", "Share one password", "Turn off antivirus"], answer: 1, explanation: "MFA adds protection, while checking the URL helps identify phishing sites.",
  },
  {
    id: "q-printer", domain: "Hardware", question: "A laser printer produces faded pages. What should a technician check first?", choices: ["Toner level", "Ethernet cable", "Screen brightness", "Wi-Fi password"], answer: 0, explanation: "Low toner is a common reason for faded output from a laser printer.",
  },
  {
    id: "q-windows", domain: "Operating Systems", question: "Which command is commonly used to test whether a host is reachable on a network?", choices: ["format", "ping", "mkdir", "chkdsk"], answer: 1, explanation: "ping sends test packets to check basic network reachability.",
  },
];

export const trainingScenarios: TrainingScenario[] = practiceQuestions.map((question, index) => ({
  ...question,
  ticketNumber: `A+-${String(101 + index).padStart(4, "0")}`,
  requester: ["Alex Morgan", "Jamie Lee", "Taylor Reed", "Casey Jordan", "Morgan Patel"][index],
  urgency: index === 2 ? "High" : index === 0 || index === 3 ? "Medium" : "Low",
  points: 100,
}));

export const ticketScenarios: TicketScenario[] = [
  { ticketId: 1001, domain: "Operating Systems", goal: "Restore Outlook access without risking the user's mail profile.", checks: ["Confirm the exact error and when it started", "Try opening Outlook in Safe Mode", "Disable a suspected add-in before attempting repair"], question: "Outlook opens normally in Safe Mode. What is the best next step?", choices: ["Replace the computer", "Disable recently added Outlook add-ins and test again", "Delete the user's mailbox", "Reset the network router"], answer: 1, explanation: "Safe Mode prevents add-ins from loading. A successful Safe Mode launch points to an add-in problem, so disable add-ins one at a time and retest.", points: 100 },
  { ticketId: 1002, domain: "Hardware", goal: "Bring the accounting printer back online using a safe troubleshooting order.", checks: ["Check power, paper, and error lights", "Check the network or USB connection", "Confirm Windows is not set to Use Printer Offline and inspect the print queue"], question: "The printer is powered on but Windows says it is offline. What should you check first?", choices: ["Buy a new toner cartridge", "Check the printer connection and whether Windows has it set to offline", "Reset every employee password", "Reinstall Windows"], answer: 1, explanation: "Start with the physical or network connection and the printer's offline setting. Toner affects print quality, not whether Windows can reach the printer.", points: 100 },
  { ticketId: 1003, domain: "Security", goal: "Restore account access while protecting the user's identity.", checks: ["Verify the requester's identity using the company process", "Reset or unlock the account in the approved directory tool", "Have the user set a new password and confirm sign-in"], question: "What must happen before you reset a user's password?", choices: ["Verify the user's identity", "Ask for their old password in chat", "Turn off multi-factor authentication", "Share the temporary password with the whole team"], answer: 0, explanation: "Identity verification protects against social engineering. Only then should you use the approved reset process.", points: 100 },
  { ticketId: 1004, domain: "Networking", goal: "Identify whether the VPN problem is local connectivity, authentication, or the VPN service.", checks: ["Confirm the user has working internet access", "Check the VPN server name and sign-in details", "Confirm MFA approval and capture the exact error message"], question: "A remote user cannot connect to VPN. What is the best first check?", choices: ["Verify that the user's normal internet connection works", "Immediately replace their laptop", "Remove all firewall rules", "Reset the company domain"], answer: 0, explanation: "A VPN depends on a working internet connection. First rule out the local connection, then check credentials, MFA, and the exact error.", points: 100 },
];
