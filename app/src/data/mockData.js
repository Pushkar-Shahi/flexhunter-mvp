// Exact mock data matching the 4 uploaded wireframe screens

export const initialJobsData = [
  {
    id: "job-lumen-labs",
    title: "UI/UX Design Intern",
    company: "Lumen Labs",
    location: "Remote (India)",
    isRemote: true,
    hoursRange: "12–20 hrs / week",
    hoursPerWeek: 15,
    stipend: "₹10,000 / month",
    stipendShort: "₹10k / mo",
    duration: "3 months",
    deadline: "Apply by Nov 15",
    postedDate: "Posted 2 days ago",
    matchScore: 92,
    category: "Design",
    pros: [
      "Skills match: Figma, Canva, Copywriting (4 of 5 required)",
      "Fully remote, matches your Remote Only toggle",
      "₹10k stipend meets your requirement",
      "Work blocks are flexible, so weekends are fine"
    ],
    warnings: [
      "Company prefers 20 hrs/week, your limit is 15 hrs",
      "Tue 10:00 AM team standup overlaps your Economics lecture",
      "Nice-to-have skill missing: Motion design"
    ],
    about: "Lumen Labs is a small product studio building learning tools for students. You'll join the design team to turn rough ideas into clean, testable interfaces in Figma, with a mentor reviewing your work weekly.",
    deliverables: [
      "Design and iterate on mobile and web screens in Figma",
      "Support the team with social graphics made in Canva",
      "Write short UX copy for onboarding flows"
    ]
  },
  {
    id: "job-orbit-growth",
    title: "Social Media Marketing Associate",
    company: "Orbit Growth",
    location: "Remote",
    isRemote: true,
    hoursRange: "10 hrs/wk",
    hoursPerWeek: 10,
    stipend: "₹8,000 / month",
    stipendShort: "₹8k / mo",
    duration: "2 months",
    deadline: "Apply by Nov 18",
    postedDate: "Posted 1 day ago",
    matchScore: 89,
    category: "Marketing",
    pros: [
      "Skills match: Canva, Copywriting, Social Media Marketing",
      "100% remote asynchronous deliverables",
      "Bandwidth (10h/wk) fits comfortably below your 15h cap"
    ],
    warnings: [
      "Requires bi-weekly sync on Friday afternoons"
    ],
    about: "Orbit Growth helps early-stage startups build authentic social media followings. You'll work closely with founders on organic content creation.",
    deliverables: [
      "Draft 4-5 weekly LinkedIn & Instagram carousels",
      "Curate industry news for weekly newsletter",
      "Engage with student followers in comments"
    ]
  },
  {
    id: "job-northwind-studio",
    title: "Content & Copywriting Intern",
    company: "Northwind Studio",
    location: "Remote",
    isRemote: true,
    hoursRange: "Weekends",
    hoursPerWeek: 10,
    stipend: "₹6,000 / month",
    stipendShort: "₹6k / mo",
    duration: "3 months",
    deadline: "Apply by Nov 20",
    postedDate: "Posted 3 days ago",
    matchScore: 86,
    category: "Marketing",
    pros: [
      "Weekend-only schedule leaves weekdays 100% clear for college",
      "Matches your Copywriting & Storytelling interests"
    ],
    warnings: [
      "Stipend is slightly below average (₹6k/mo)"
    ],
    about: "Northwind Studio publishes long-form design case studies and student founder interviews. Looking for an articulate student writer.",
    deliverables: [
      "Interview 2 student founders per month",
      "Edit articles for voice and clarity",
      "Write catchy social hooks"
    ]
  },
  {
    id: "job-pixelnest",
    title: "Canva Graphic Designer",
    company: "PixelNest",
    location: "Remote",
    isRemote: true,
    hoursRange: "Flexible",
    hoursPerWeek: 8,
    stipend: "₹500 / post",
    stipendShort: "₹500 / post",
    duration: "Ongoing",
    deadline: "Open until filled",
    postedDate: "Posted 4 days ago",
    matchScore: 81,
    category: "Design",
    pros: [
      "Per-post payout allows micro-bandwidth commitments",
      "Direct match with Canva skills"
    ],
    warnings: [
      "Uncapped variable hours depending on weekly demand"
    ],
    about: "PixelNest is an on-demand creative agency supplying visual assets to digital brands.",
    deliverables: [
      "Produce template-based promotional banners",
      "Format Instagram story bundles"
    ]
  },
  {
    id: "job-kindle-media",
    title: "Community Manager (Weekend)",
    company: "Kindle Media",
    location: "Hybrid (Mumbai)",
    isRemote: false,
    hoursRange: "8 hrs/wk",
    hoursPerWeek: 8,
    stipend: "₹7,000 / month",
    stipendShort: "₹7k / mo",
    duration: "3 months",
    deadline: "Apply by Nov 25",
    postedDate: "Posted 5 days ago",
    matchScore: 77,
    category: "Marketing",
    pros: [
      "Only 8 hrs/week, low bandwidth burden"
    ],
    warnings: [
      "Hybrid requirement: 1 in-person weekend meetup per month"
    ],
    about: "Kindle Media organizes student developer and design hackathons across major colleges.",
    deliverables: [
      "Moderate Discord and WhatsApp community channels",
      "Coordinate weekend design jam submissions"
    ]
  },
  {
    id: "job-brightside-growth",
    title: "Growth Marketing Intern",
    company: "Brightside Co.",
    location: "Remote",
    isRemote: true,
    hoursRange: "15 hrs/wk",
    hoursPerWeek: 15,
    stipend: "Unpaid + cert.",
    stipendShort: "Unpaid + cert.",
    duration: "2 months",
    deadline: "Apply by Nov 10",
    postedDate: "Posted 1 week ago",
    matchScore: 68,
    category: "Marketing",
    pros: [
      "100% remote flexibility"
    ],
    warnings: [
      "Unpaid opportunity (certificate + recommendation letter only)",
      "Strict 15 hrs/week requirement"
    ],
    about: "Brightside Co. is a non-profit incubator mentoring early-stage student social initiatives.",
    deliverables: [
      "Assist in campus ambassador recruitment",
      "Maintain outreach spreadsheets"
    ]
  }
];

// Exact applications for Screen 3 (Kanban Board)
export const initialApplications = [
  // Saved (3)
  {
    id: "app-saved-1",
    company: "Brightside Co.",
    title: "Content Writing Intern",
    dateMeta: "Saved Oct 29",
    status: "saved",
    pill: "Closes in 3 days",
    pillType: "neutral"
  },
  {
    id: "app-saved-2",
    company: "PixelNest",
    title: "Canva Graphic Designer",
    dateMeta: "Saved Oct 27",
    status: "saved",
    pill: "Weekend only",
    pillType: "neutral"
  },
  {
    id: "app-saved-3",
    company: "Kindle Media",
    title: "Community Manager",
    dateMeta: "Saved Oct 25",
    status: "saved",
    pill: "Closes Nov 20",
    pillType: "neutral"
  },

  // Applied (3)
  {
    id: "app-applied-1",
    company: "Lumen Labs",
    title: "UI/UX Design Intern",
    dateMeta: "Applied Oct 24",
    status: "applied",
    pill: "Follow-up due in 2 days",
    pillType: "dark"
  },
  {
    id: "app-applied-2",
    company: "Orbit Growth",
    title: "Social Media Marketing Intern",
    dateMeta: "Applied Oct 22",
    status: "applied",
    pill: "No reply: 6 days",
    pillType: "warning"
  },
  {
    id: "app-applied-3",
    company: "Northwind Studio",
    title: "Copywriting Intern",
    dateMeta: "Applied Oct 28",
    status: "applied",
    pill: "Awaiting reply",
    pillType: "neutral"
  },

  // Screening / Interview (2)
  {
    id: "app-interview-1",
    company: "Helio Learning",
    title: "Content Strategy Intern",
    dateMeta: "Applied Oct 15",
    status: "interview",
    pill: "Interview Nov 3, 4 PM",
    pillType: "dark"
  },
  {
    id: "app-interview-2",
    company: "Brightpath",
    title: "Marketing Associate",
    dateMeta: "Applied Oct 12",
    status: "interview",
    pill: "Screening call done",
    pillType: "neutral"
  },

  // Offers (1)
  {
    id: "app-offers-1",
    company: "Sparrow Labs",
    title: "Brand Design Intern",
    dateMeta: "Applied Oct 5",
    status: "offers",
    pill: "Offer expires in 5 days",
    pillType: "dark"
  },

  // Rejected / Ghosted (2)
  {
    id: "app-rejected-1",
    company: "Vertex Media",
    title: "Video Editing Intern",
    dateMeta: "Applied Sep 28",
    status: "rejected",
    pill: "No reply: 21 days",
    pillType: "warning"
  },
  {
    id: "app-rejected-2",
    company: "Cobalt Co.",
    title: "Growth Intern",
    dateMeta: "Applied Oct 1",
    status: "rejected",
    pill: "Not selected",
    pillType: "neutral"
  }
];

// Pre-filled schedule timetable matching Image 1 exactly
export const initialScheduleSlots = {
  // Mon
  "Mon-9 AM": { blocked: true, label: "Calculus" },
  "Mon-10 AM": { blocked: true, label: "" },
  "Mon-2 PM": { blocked: true, label: "Statistics" },
  "Mon-3 PM": { blocked: true, label: "" },
  // Tue
  "Tue-10 AM": { blocked: true, label: "Economics" },
  "Tue-11 AM": { blocked: true, label: "" },
  // Wed
  "Wed-9 AM": { blocked: true, label: "Calculus" },
  "Wed-10 AM": { blocked: true, label: "" },
  "Wed-2 PM": { blocked: true, label: "Statistics" },
  "Wed-3 PM": { blocked: true, label: "" },
  // Thu
  "Thu-10 AM": { blocked: true, label: "Economics" },
  "Thu-11 AM": { blocked: true, label: "" },
  // Fri
  "Fri-9 AM": { blocked: true, label: "Physics Lab" },
  "Fri-10 AM": { blocked: true, label: "" },
  "Fri-1 PM": { blocked: true, label: "Seminar" },
  "Fri-2 PM": { blocked: true, label: "" }
};
