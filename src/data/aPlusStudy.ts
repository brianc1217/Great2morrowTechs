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
  problem: string;
  symptoms: string;
  environment: string;
  objective: string;
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
  { id: "q-cpu", domain: "Hardware", question: "A desktop powers on but immediately shuts down under load. Which component should be checked first?", choices: ["CPU cooling system", "Monitor cable", "Keyboard", "Printer driver"], answer: 0, explanation: "Overheating can trigger a protective shutdown. Check the fan, heatsink, and thermal compound." },
  { id: "q-raid", domain: "Hardware", question: "Which RAID level mirrors data across two drives?", choices: ["RAID 0", "RAID 1", "RAID 5", "RAID 10 only"], answer: 1, explanation: "RAID 1 mirrors data for redundancy." },
  { id: "q-ssd", domain: "Hardware", question: "A laptop needs a small storage upgrade with no moving parts. Which option is best?", choices: ["3.5-inch HDD", "SSD", "Optical drive", "Tape drive"], answer: 1, explanation: "An SSD uses flash storage and has no moving parts." },
  { id: "q-dhcp", domain: "Networking", question: "A PC has a 169.254 address. What is the most likely problem?", choices: ["DHCP could not be reached", "DNS is too fast", "The monitor is off", "HTTPS is blocked"], answer: 0, explanation: "APIPA addresses usually mean the device could not obtain a DHCP lease." },
  { id: "q-dns", domain: "Networking", question: "Users can reach websites by IP address but not by name. What should be checked?", choices: ["DNS settings", "RAM speed", "Printer toner", "Screen resolution"], answer: 0, explanation: "Name resolution depends on DNS." },
  { id: "q-wifi", domain: "Networking", question: "Which Wi-Fi band generally offers shorter range but less interference?", choices: ["2.4 GHz", "5 GHz", "AM radio", "Bluetooth only"], answer: 1, explanation: "5 GHz commonly provides more channels and less interference but shorter range." },
  { id: "q-port22", domain: "Networking", question: "Which protocol normally uses TCP port 22?", choices: ["SSH", "FTP", "SMTP", "RDP"], answer: 0, explanation: "SSH uses TCP port 22 for secure remote access." },
  { id: "q-ipconfigrelease", domain: "Operating Systems", question: "Which Windows command releases a DHCP lease?", choices: ["ipconfig /release", "ping /release", "format /release", "netstat /release"], answer: 0, explanation: "ipconfig /release releases the current DHCP address." },
  { id: "q-taskmanager", domain: "Operating Systems", question: "Which Windows tool can end an unresponsive application?", choices: ["Task Manager", "Disk Cleanup", "Device Manager only", "Control Panel"], answer: 0, explanation: "Task Manager can end an unresponsive process." },
  { id: "q-safe", domain: "Operating Systems", question: "Why would a technician start Windows in Safe Mode?", choices: ["To load minimal drivers for troubleshooting", "To format the drive", "To increase Wi-Fi range", "To update BIOS automatically"], answer: 0, explanation: "Safe Mode loads a minimal environment to isolate startup and driver issues." },
  { id: "q-android", domain: "Mobile Devices", question: "A phone battery drains quickly after a new app was installed. What is a reasonable first step?", choices: ["Check battery usage and remove the app", "Replace the SIM immediately", "Reinstall the router", "Disable the screen"], answer: 0, explanation: "Battery usage can identify a misbehaving app; remove or update it first." },
  { id: "q-airplane", domain: "Mobile Devices", question: "Which setting disables a phone's cellular, Wi-Fi, and Bluetooth radios quickly?", choices: ["Airplane mode", "Do Not Disturb", "Dark mode", "Accessibility mode"], answer: 0, explanation: "Airplane mode turns off wireless radios until individually re-enabled." },
  { id: "q-phishing", domain: "Security", question: "An email asks a user to verify their password through an unfamiliar link. What is the best response?", choices: ["Report it as phishing", "Enter the password", "Forward it to everyone", "Disable MFA"], answer: 0, explanation: "Unexpected credential requests and unfamiliar links are phishing indicators." },
  { id: "q-encryption", domain: "Security", question: "Which technology protects data on a lost laptop's drive?", choices: ["Full-disk encryption", "A screensaver", "A printer queue", "DHCP reservation"], answer: 0, explanation: "Full-disk encryption protects data at rest." },
  { id: "q-malware", domain: "Security", question: "What is the first action when malware is suspected on a workstation?", choices: ["Isolate it from the network", "Keep browsing", "Share the files", "Disable antivirus"], answer: 0, explanation: "Isolation limits the spread while the incident is investigated." },
  { id: "q-method", domain: "Troubleshooting", question: "What is the first step of the standard troubleshooting methodology?", choices: ["Identify the problem", "Implement a solution", "Document findings", "Replace hardware"], answer: 0, explanation: "Start by identifying the problem and gathering information." },
  { id: "q-test", domain: "Troubleshooting", question: "After implementing a fix, what should a technician do next?", choices: ["Verify functionality and implement preventive measures", "Delete all logs", "Close without testing", "Change the user's password"], answer: 0, explanation: "Verification confirms the issue is resolved and helps prevent recurrence." },
];

export const trainingScenarios: TrainingScenario[] = practiceQuestions.map((question, index) => ({
  ...question,
  ticketNumber: `A+-${String(101 + index).padStart(4, "0")}`,
  requester: ["Alex Morgan", "Jamie Lee", "Taylor Reed", "Casey Jordan", "Morgan Patel"][index],
  urgency: index === 2 ? "High" : index === 0 || index === 3 ? "Medium" : "Low",
  points: 100,
  problem: question.question,
  symptoms: "The user reports the issue and needs service restored.",
  environment: "Managed Windows workstation on the company network.",
  objective: `CompTIA A+ · ${question.domain}`,
}));

export const ticketScenarios: TicketScenario[] = [
  { ticketId: 1001, domain: "Operating Systems", goal: "Restore Outlook access without risking the user's mail profile.", checks: ["Confirm the exact error and when it started", "Try opening Outlook in Safe Mode", "Disable a suspected add-in before attempting repair"], question: "Outlook opens normally in Safe Mode. What is the best next step?", choices: ["Replace the computer", "Disable recently added Outlook add-ins and test again", "Delete the user's mailbox", "Reset the network router"], answer: 1, explanation: "Safe Mode prevents add-ins from loading. A successful Safe Mode launch points to an add-in problem, so disable add-ins one at a time and retest.", points: 100 },
  { ticketId: 1002, domain: "Hardware", goal: "Bring the accounting printer back online using a safe troubleshooting order.", checks: ["Check power, paper, and error lights", "Check the network or USB connection", "Confirm Windows is not set to Use Printer Offline and inspect the print queue"], question: "The printer is powered on but Windows says it is offline. What should you check first?", choices: ["Buy a new toner cartridge", "Check the printer connection and whether Windows has it set to offline", "Reset every employee password", "Reinstall Windows"], answer: 1, explanation: "Start with the physical or network connection and the printer's offline setting. Toner affects print quality, not whether Windows can reach the printer.", points: 100 },
  { ticketId: 1003, domain: "Security", goal: "Restore account access while protecting the user's identity.", checks: ["Verify the requester's identity using the company process", "Reset or unlock the account in the approved directory tool", "Have the user set a new password and confirm sign-in"], question: "What must happen before you reset a user's password?", choices: ["Verify the user's identity", "Ask for their old password in chat", "Turn off multi-factor authentication", "Share the temporary password with the whole team"], answer: 0, explanation: "Identity verification protects against social engineering. Only then should you use the approved reset process.", points: 100 },
  { ticketId: 1004, domain: "Networking", goal: "Identify whether the VPN problem is local connectivity, authentication, or the VPN service.", checks: ["Confirm the user has working internet access", "Check the VPN server name and sign-in details", "Confirm MFA approval and capture the exact error message"], question: "A remote user cannot connect to VPN. What is the best first check?", choices: ["Verify that the user's normal internet connection works", "Immediately replace their laptop", "Remove all firewall rules", "Reset the company domain"], answer: 0, explanation: "A VPN depends on a working internet connection. First rule out the local connection, then check credentials, MFA, and the exact error.", points: 100 },
];
