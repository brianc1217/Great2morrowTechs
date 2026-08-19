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
