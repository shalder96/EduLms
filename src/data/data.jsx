import { FaChalkboardTeacher, FaLaptopCode, FaCertificate } from "react-icons/fa";
export const cards = [
  {
    icon: <FaChalkboardTeacher />,
    title: "Expert Instructors",
    desc: "Learn from professionals with years of real-world experience.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Flexible Learning",
    desc: "Study anytime, anywhere at your own pace.",
  },
  {
    icon: <FaCertificate />,
    title: "Career Guidance",
    desc: "Get mentorship and job readiness tips.",
  },
];

export const coursesData = [
  {
    id: 1,
    title: "Artificial Intelligence",
    description: "Learn AI from scratch and be prepared for Board Examination",
    introduction: `
    The CBSE Class 10 Artificial Intelligence curriculum introduces students to the fundamentals of AI, focusing on real-world applications and hands-on learning. It covers key topics such as AI concepts and history, data handling, machine learning basics, and natural language processing. Students also explore AI tools like Python, NumPy, and Pandas while learning about ethics, bias, and responsible AI use. The syllabus encourages creativity through projects like chatbots, predictive models, and AI-powered games. This early exposure builds computational thinking, problem-solving, and analytical skills. With AI driving innovation in industries like healthcare, education, and automation, students gain a strong foundation for future careers in data science, robotics, and software development. The curriculum not only sparks curiosity but also prepares learners for advanced studies in computer science and emerging technologies, empowering them for the digital future.
    `,
    instructor: "",
    image: "https://m.media-amazon.com/images/I/71druzjLO8L.jpg",
    class: "Class 10",
    subject: "Artificial Intelligence",
    board: "CBSE",
    lessons: {
      partA: [
        { id: "com_skill",
          title: "Communication Skills",
          video: "🎬 Communication Video",
          notes: "AI is the simulation of human intelligence in machines. Learn the basics here.",
        },
        { id: "self_mgmt_skill",
          title: "Self Management Skills",
          video: "🎬 Management Video",
          notes: "AI is the simulation of human intelligence in machines. Learn the basics here.",
        },
        { id: "ict_skill",
          title: "ICT Skills",
          video: "🎬 ICT Skills Video",
          notes: "AI is the simulation of human intelligence in machines. Learn the basics here.",
        },
        { id: "entre_skill",
          title: "Entreprenewrial Skills",
          video: "🎬 Entrepreneurial Skills Video",
          notes: "AI is the simulation of human intelligence in machines. Learn the basics here.",
        },
        { id: "green_skill",
          title: "Green Skills",
          video: "🎬 Green Skills Video",
          notes: "AI is the simulation of human intelligence in machines. Learn the basics here.",
        },
      ],
      partB: [
        
        { id: "intro_to_AI",
          title: "Introduction to AI",
          video: "🎬 Intro Video",
          notes: "Understand supervised, unsupervised, and reinforcement learning.",
        },
        { id: "ai_project_cycle",
          title: "AI Project Cycle",
          video: "🎬 Project Cycle Video",
          notes: "Learn about neural networks, CNNs, RNNs, and applications.",
        },
        { id: "advanced_python",
          title: "Advance Python",
          video: "🎬Advance Python Video",
          notes: "Explore AI applications in healthcare, finance, robotics, and NLP.",
        },
        { id: "data_sci",
          title: "Data Science",
          video: "🎬Data Science Video",
          notes: "Explore AI applications in healthcare, finance, robotics, and NLP.",
        },
        { id: "comp_vision",
          title: "Computer Vision",
          video: "🎬Computer Vision Video",
          notes: "Explore AI applications in healthcare, finance, robotics, and NLP.",
        },
        { id: "nlp",
          title: "Natural Language Processing",
          video: "🎬NLP Video",
          notes: "Explore AI applications in healthcare, finance, robotics, and NLP.",
        },
        { id: "eval",
          title: "Evaluation",
          video: "🎬Eval Video",
          notes: "Explore AI applications in healthcare, finance, robotics, and NLP.",
        },
      ],
     
    },
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description: "Master the fundamentals of JavaScript for web development.",
    instructor: "Jane Smith",
    image: "https://cdn-icons-png.flaticon.com/512/919/919828.png",
    class: "",
    subject: "",
    board: "",
    lessons: [
      {
        title: "Introduction to JavaScript",
        video: "🎬 JS Intro Video",
        notes: "Learn JavaScript syntax, variables, and data types.",
      },
      {
        title: "Functions and Loops",
        video: "🎬 JS Functions Video",
        notes: "Understand functions, loops, and control flow.",
      },
      {
        title: "DOM Manipulation",
        video: "🎬 DOM Video",
        notes: "Learn how to interact with the DOM using JavaScript.",
      },
      {
        title: "Events and Forms",
        video: "🎬 Events Video",
        notes: "Handle user events and form inputs effectively.",
      },
    ],
  },
  {
    id: 3,
    title: "CSS & Tailwind",
    description: "Design beautiful and responsive websites using CSS & Tailwind.",
    instructor: "Alex Johnson",
    image: "https://cdn-icons-png.flaticon.com/512/919/919826.png",
    class: "Class 6",
    subject: "Science",
    board: "CBSE",
    lessons: [
      {
        title: "CSS Basics",
        video: "🎬 CSS Intro Video",
        notes: "Learn about selectors, colors, typography, and layout.",
      },
      {
        title: "Flexbox and Grid",
        video: "🎬 Flexbox/Grid Video",
        notes: "Build responsive layouts with Flexbox and CSS Grid.",
      },
      {
        title: "Tailwind Setup",
        video: "🎬 Tailwind Video",
        notes: "Integrate Tailwind CSS into your project and learn utilities.",
      },
      {
        title: "Building Components",
        video: "🎬 Components Video",
        notes: "Create reusable UI components using Tailwind CSS.",
      },
    ],
  },
  {
    id: 4,
    title: "Node.js & Express",
    description: "Build backend APIs with Node.js and Express.",
    instructor: "Emily Brown",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    class: "",
    subject: "",
    board: "",
    lessons: [
      {
        title: "Introduction to Node.js",
        video: "🎬 Node.js Intro Video",
        notes: "Learn about Node.js runtime and setup.",
      },
      {
        title: "Express Basics",
        video: "🎬 Express Video",
        notes: "Build your first Express server and routes.",
      },
      {
        title: "Working with APIs",
        video: "🎬 API Video",
        notes: "Create and consume RESTful APIs using Node.js and Express.",
      },
      {
        title: "Database Integration",
        video: "🎬 Database Video",
        notes: "Connect your Node.js app with a database (MongoDB/MySQL).",
      },
    ],
  },
];


export const classes = [
  "Class 6", 
  "Class 7", 
  "Class 8", 
  "Class 9", 
  "Class 10",
  "Class 11",
  "Class 12"
];

export const subjects = [
  "Artificial Intelligence",
  "Bengali",
  "Biology",
  "Computer Application",
  "Computer Science",
  "Economics",
  "English",
  "Geography",
  "History", 
  "Information Technology",
  "Mathematics", 
  "Science", 
  "Social Studies",

];

export const boards = [
  "CBSE", 
  "ICSE", 
  "ISC",
  "WBBSE",
  "WBCHSE",
];

