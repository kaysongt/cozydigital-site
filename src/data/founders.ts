/**
 * The real people behind Cozy Digital.
 *
 * SOURCE OF TRUTH: every claim in this file comes from the founders' own
 * résumés. Do NOT add credentials, metrics, client outcomes, or awards that
 * aren't documented there — the rest of the site is deliberately claim-free
 * and this page carries the most trust weight.
 *
 * Photos: drop square headshots (~600x600) in /public/brand/team/ and set
 * `photo` below. Until then each card renders a branded monogram, which is an
 * intentional design state — never a stock photo of someone else.
 */

export type FounderAccent = "cyan" | "fuchsia";

export type Founder = {
  slug: string;
  name: string;
  /** Verbatim title from their own résumé. */
  role: string;
  /** Two or three words for the card chip. */
  focus: string;
  location: string;
  email?: string;
  photo?: string;
  initials: string;
  accent: FounderAccent;
  /** One line that positions them, used on the compact team strip. */
  short: string;
  /** Long-form intro on the founders page. */
  bio: string[];
  /** What they own day to day at Cozy Digital. */
  owns: string[];
  timeline: { role: string; org: string; period: string; detail: string }[];
  education: { credential: string; org: string; detail: string }[];
  toolkit: { label: string; items: string[] }[];
  proof: { title: string; detail: string }[];
  links?: { label: string; href: string }[];
};

export const founders: Founder[] = [
  {
    slug: "quincy",
    name: "Quincy",
    role: "Founder & Lead Developer",
    focus: "Build & ship",
    location: "Plainfield, Illinois",
    email: "quincy@cozydigital.org",
    initials: "Q",
    accent: "cyan",
    short:
      "Builds and deploys the client work end to end — sites, hosting, ad campaigns, and the internal tools the studio runs on.",
    bio: [
      "Quincy started Cozy Digital in 2024 and still writes the code. He designs, builds, and deploys client websites end to end, including hosting, domain setup, and post-launch maintenance, then plans and runs the paid social and search campaigns that point traffic at them.",
      "He also builds the tools the studio runs on: Shadow Leads, an in-house lead-tracking CRM deployed on cloud infrastructure, and the Cozy Client Hub, a client-facing content scheduler and advertising strategy workspace. Alongside the agency he's a Computer Science senior and a student technician on his university's front-line IT support desk.",
    ],
    owns: [
      "Website design, build, and deployment — including hosting, domains, and post-launch maintenance",
      "Paid social and search campaigns, including AI-assisted video ad production",
      "Shadow Leads CRM, the in-house lead tracking system on cloud infrastructure",
      "The Cozy Client Hub content scheduler and ad strategy workspace",
      "Client agreements, pricing, performance reporting, and the intern team",
    ],
    timeline: [
      {
        role: "Founder & Lead Developer",
        org: "Cozy Digital",
        period: "2024 — Present",
        detail:
          "Ships client systems end to end, from design through deployment and support, and leads a small intern team.",
      },
      {
        role: "Student Technician",
        org: "Technology Support Center, University of St. Francis",
        period: "Current",
        detail:
          "Front-line technical support for students, faculty, and staff across hardware, software, and account issues. Nominated for a Student Employment Award.",
      },
      {
        role: "Radiological Control Technician Training",
        org: "UTTAA · U.S. Department of Energy sponsored program",
        period: "May — July 2026",
        detail:
          "250 hours of DOE RCT Core Fundamental instruction, passed the Core Fundamental Comprehensive Examination, plus 14 hours of professional development training.",
      },
    ],
    education: [
      {
        credential: "B.S. Computer Science (Senior)",
        org: "University of St. Francis · Joliet, Illinois",
        detail:
          "Data analytics, software development, databases, calculus-based mathematics, and AI ethics and governance.",
      },
    ],
    toolkit: [
      {
        label: "Languages",
        items: ["Python", "JavaScript", "TypeScript", "SQL", "NoSQL", "HTML", "CSS", "PHP", "Java", "C++", "C#"],
      },
      {
        label: "Tools & platforms",
        items: ["Git & GitHub", "Linux / WSL", "Docker", "React", "Cloud hosting", "VPS setup & migration"],
      },
      {
        label: "Marketing",
        items: ["Paid social & search", "Landing page design", "Lead routing", "Content scheduling", "AI video production"],
      },
    ],
    proof: [
      {
        title: "Lavar Scott No. 45",
        detail: "Interactive site concept for a NASCAR driver, built dependency-free so it runs offline at the track.",
      },
      {
        title: "Essential Massage by Mesha",
        detail: "Business website with integrated lead capture.",
      },
      {
        title: "Aura Sports Group",
        detail: "Athlete brand site concept developed as an agency pitch.",
      },
      {
        title: "National Cyber League competitor",
        detail: "Student Employment Award nominee, University of St. Francis.",
      },
    ],
  },
  {
    slug: "kayson",
    name: "Kayson",
    role: "Founder & Analytics Consultant",
    focus: "Analysis & systems",
    location: "Chicago, Illinois",
    // Personal address intentionally left off the public site. Add a
    // cozydigital.org alias here and it renders automatically.
    initials: "K",
    accent: "fuchsia",
    short:
      "Maps the workflow before anything gets built, then tests what ships — requirements, integrations, data validation, and reporting.",
    bio: [
      "Kayson is a business applications and data analyst who came to Cozy Digital from healthcare technology. At Sibel Health he supported healthcare applications and connected medical devices, using Python and SQL to investigate missing, duplicate, and anomalous records and running UI, API, functional, and regression testing against expected requirements.",
      "At Cozy Digital he does the part most agencies skip: analyzing how a client's customers and staff actually move through a process, defining the functional requirements, and only then translating them into booking, scheduling, lead-intake, and follow-up configurations. Then he tests the normal and the error paths, documents what the system is supposed to do, and fixes the logic that doesn't hold up.",
    ],
    owns: [
      "Client workflow and user-needs analysis, requirements gathering, and process mapping",
      "Booking, scheduling, lead-intake, and automated follow-up configuration",
      "Integration testing across forms, spreadsheets, email, analytics, and CMS tools",
      "Data validation — permissions, error handling, and expected user outcomes",
      "Documentation of requirements, test results, defects, and implementation decisions",
    ],
    timeline: [
      {
        role: "Founder & Analytics Consultant",
        org: "Cozy Digital",
        period: "Nov 2025 — Present",
        detail:
          "Translates client workflows into application configurations for websites, booking, lead intake, scheduling, and automated follow-up, then validates them and coordinates fixes with third-party platforms.",
      },
      {
        role: "Junior Software Engineer",
        org: "Sibel Health · Chicago, IL",
        period: "Nov 2022 — Feb 2024",
        detail:
          "Supported healthcare applications and connected medical devices across mobile, web, and device environments. Used Python and SQL to surface anomalous records and ran UI, API, functional, and regression testing.",
      },
      {
        role: "Shift Lead / Manager",
        org: "Walgreens · Glenview, IL",
        period: "Jun 2025 — Present",
        detail:
          "Supports pharmacy, fulfillment, and transaction-processing workflows, reconciles $20,000+ in daily transactions, and coordinates and trains 8+ employees through high-volume operations.",
      },
    ],
    education: [
      {
        credential: "B.A. Economics · Minor in Computer Science · Certificate in Data Science",
        org: "University of Illinois Urbana-Champaign · Expected 2026",
        detail:
          "Database Systems, Software Design, Data Structures, Applied Machine Learning, Statistics, Econometrics, Python Programming.",
      },
    ],
    toolkit: [
      {
        label: "Business analysis",
        items: [
          "User & workflow analysis",
          "Requirements gathering",
          "Process mapping",
          "Requirement documentation",
          "Stakeholder communication",
        ],
      },
      {
        label: "Applications & testing",
        items: [
          "Application configuration",
          "Unit & functional testing",
          "UI / API testing",
          "Defect documentation",
          "Issue triage",
          "Root-cause analysis",
        ],
      },
      {
        label: "Technical tools",
        items: ["Python", "SQL", "pandas", "Power BI", "Excel", "REST APIs", "Make.com", "Git & GitHub", "React", "Next.js"],
      },
    ],
    proof: [
      {
        title: "Lead Intake & Follow-Up Workflow",
        detail:
          "Mapped the end-to-end path from lead capture through validation, assignment, follow-up, and timed reminders, then configured and tested it across Forms, Sheets, Gmail, Make.com, and REST APIs.",
      },
      {
        title: "Healthcare data investigation",
        detail:
          "Used Python and SQL at Sibel Health to identify missing, duplicate, and anomalous production records and communicate business impact to engineering, design, UX, operations, and leadership.",
      },
    ],
    // GitHub link pulled: the profile it points at carries a full legal name,
    // and this page is deliberately first-names-only. Restore this line if the
    // profile name changes.
    // links: [{ label: "github.com/kaceiji", href: "https://github.com/kaceiji" }],
  },
];

/** How the two halves of the studio divide the work. */
export const workSplit = [
  {
    stage: "Understand",
    lead: "Kayson",
    accent: "fuchsia" as FounderAccent,
    detail: "Workflow and user-needs analysis, requirements, and process mapping before a single page is designed.",
  },
  {
    stage: "Build",
    lead: "Quincy",
    accent: "cyan" as FounderAccent,
    detail: "Design, development, hosting, domains, and deployment — the site and the systems behind it.",
  },
  {
    stage: "Connect",
    lead: "Kayson",
    accent: "fuchsia" as FounderAccent,
    detail: "Booking, lead intake, scheduling, and follow-up configured across forms, email, analytics, and CMS tools.",
  },
  {
    stage: "Validate",
    lead: "Kayson",
    accent: "fuchsia" as FounderAccent,
    detail: "Functional and API testing, data validation, defect documentation, and revised logic where it doesn't hold.",
  },
  {
    stage: "Grow",
    lead: "Quincy",
    accent: "cyan" as FounderAccent,
    detail: "Paid social and search campaigns, AI-assisted video ads, content scheduling, and performance reporting.",
  },
  {
    stage: "Support",
    lead: "Quincy",
    accent: "cyan" as FounderAccent,
    detail: "Post-launch maintenance, hosting, and the in-house CRM and client hub that keep leads from going cold.",
  },
];
