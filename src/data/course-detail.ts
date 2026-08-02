import { categoryMeta, type Course } from "./courses";

export type CurriculumModule = {
  title: string;
  hint: string;
  items: string[];
};

export type CourseDetail = {
  highlights: string[];
  curriculum: CurriculumModule[];
  tools: string[];
  prerequisites: string[];
  certification: string[];
  careerPaths: string[];
  faqs: { q: string; a: string }[];
  schedule: { label: string; value: string }[];
};

const phaseNames = [
  { title: "Foundations", hint: "Get grounded in the core ideas and tooling." },
  { title: "Core Skills", hint: "Daily-driver techniques you will use on the job." },
  { title: "Applied Practice", hint: "Guided labs, exercises and real datasets." },
  { title: "Advanced Topics", hint: "Depth, performance and professional patterns." },
  { title: "Capstone & Career", hint: "Build, present, and get interview-ready." },
];

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const toolMap: Record<string, string[]> = {
  professional: ["VS Code", "Git & GitHub", "Jupyter / Notebooks", "Windows & Linux labs"],
  tally: ["TallyPrime", "Tally Candidate Portal", "GST Portal", "Excel"],
  internship: ["Git & GitHub", "VS Code", "Project tracker", "Mentor reviews"],
  school: ["Scratch", "Teachable Machine", "ChatGPT", "Canva & AI creative tools"],
};

export function getCourseDetail(course: Course): CourseDetail {
  const cat = categoryMeta[course.category];
  const groups = chunk(course.outcomes, Math.max(2, Math.ceil(course.outcomes.length / 4)));

  const curriculum: CurriculumModule[] = groups.map((items, i) => ({
    title: phaseNames[Math.min(i, phaseNames.length - 1)].title,
    hint: phaseNames[Math.min(i, phaseNames.length - 1)].hint,
    items,
  }));

  if (course.category !== "school") {
    curriculum.push({
      title: "Capstone & Employability",
      hint: "Portfolio project, mock assessment and interview coaching.",
      items: [
        "Guided capstone project with mentor review",
        "Assessment / mock test and feedback",
        "Resume, LinkedIn and portfolio polish",
        "Interview preparation and soft skills",
      ],
    });
  } else {
    curriculum.push({
      title: "Showcase Day",
      hint: "Every learner presents what they built.",
      items: [
        "Final showcase project",
        "Presentation & communication practice",
        "Parent showcase and certificate ceremony",
      ],
    });
  }

  const highlights = [
    "Mentor-led classroom instruction at MSDC, Manipal",
    "Hands-on labs from day one — no passive lectures",
    `${course.duration} of structured, outcome-mapped learning`,
    course.category === "tally"
      ? "Digital, verifiable certificate directly from Tally Company"
      : "Verifiable certificate of completion from School of IT Skills",
    course.category === "internship"
      ? "Real project deliverable you can show recruiters"
      : "Capstone project for your portfolio",
    "Small batches with doubt-clearing support",
  ];

  const prerequisites =
    course.category === "school"
      ? [
          "Basic computer familiarity (mouse, keyboard, browser)",
          `Open to students of ${course.audience}`,
          "Curiosity — no prior coding experience needed",
        ]
      : [
          `Eligibility: ${course.audience}`,
          "Comfortable using a computer and the internet",
          course.level ? `Recommended level: ${course.level}` : "No advanced prerequisites — we start from fundamentals",
          "A laptop is helpful, but lab systems are provided",
        ];

  const certification =
    course.category === "tally"
      ? [
          "Candidate portal access with digital books & videos",
          "Chapter-wise and final mock tests",
          "Final Computer Based Test (CBT)",
          "Digital, verifiable certificate from Tally Company",
          "Grading (A+, A, B, C) with syllabus on the certificate",
          "Job portal access and soft-skills training",
        ]
      : [
          "Certificate of completion from School of IT Skills, MSDC Manipal",
          "Project and assessment record",
          "Employability & soft-skills module included",
          "Guidance on relevant industry certifications",
        ];

  const careerPaths = (course.jobs ?? cat.tagline)
    .split(/·|\/|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const faqs = [
    {
      q: "Who is this program for?",
      a: `${course.audience}. ${course.summary}`,
    },
    {
      q: "How long is the program and what is the fee?",
      a: `${course.duration}, with a program fee of ${course.fee}. Batches run in both weekday and weekend slots subject to availability.`,
    },
    {
      q: "Do I need prior experience?",
      a: prerequisites[prerequisites.length - 1],
    },
    {
      q: "What do I get at the end?",
      a: certification[0] + " Plus a capstone project you can add to your portfolio.",
    },
    {
      q: "How do I enroll?",
      a: "Write to msdc.itskills@gmail.com or call +91 91879 74688 and our team will confirm the next batch date and seat availability.",
    },
  ];

  const schedule = [
    { label: "Mode", value: "Classroom (offline) at MSDC, Manipal" },
    { label: "Batch size", value: "Small batches for individual attention" },
    { label: "Pace", value: course.duration },
    {
      label: "Sessions",
      value: course.category === "school" ? "Summer / winter session slots" : "Weekday & weekend slots",
    },
  ];

  return {
    highlights,
    curriculum,
    tools: [...new Set([...(course.tags ?? []), ...toolMap[course.category]])],
    prerequisites,
    certification,
    careerPaths,
    faqs,
    schedule,
  };
}
