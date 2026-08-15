import stylespotImg from '../assets/images/stylespot_preview.png'
import careerosImg from '../assets/images/careeros_preview.png'
import portfolioV1Img from '../assets/images/portfolio_v1_preview.png'
import activityPointImg from '../assets/images/activitypoint_preview.png'

export const defaultProjects = [
  {
    _id: "1",
    title: "StyleSpot — E-Commerce & CMS",
    type: "Full Stack",
    description: "A full-stack SSR clothing store storefront & CMS template featuring direct WhatsApp 1-click ordering, real-time Supabase inventory management, and click analytics.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    liveLink: "https://dotme-style-spot-c0233a21.vercel.app/",
    githubRepo: "https://github.com/Ameersuhail799/dotme-style-spot-c0233a21.git",
    thumbnail: stylespotImg,
    featured: true
  },
  {
    _id: "2",
    title: "CareerOS — AI Career Suite",
    type: "AI / ML Suite",
    description: "Full-stack career preparation platform for engineering students featuring 24/7 AI career coaching, ATS resume scoring, AI mock interviews, and career roadmaps.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveLink: "https://careeros-azure.vercel.app/",
    githubRepo: "https://github.com/Ameersuhail799/careeros.git",
    thumbnail: careerosImg,
    featured: true
  },
  {
    _id: "3",
    title: "Personal Portfolio V1 — Cyber Dark Interactive",
    type: "Full Stack / Web App",
    description: "My previous personal developer portfolio website built with dark grid aesthetics, custom bio hero, skill badges, live repository sync, and modern UI micro-interactions.",
    technologies: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "PyTorch & AI"],
    liveLink: "https://ameer-portfolio-khaki.vercel.app/",
    githubRepo: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    thumbnail: portfolioV1Img,
    featured: true
  },
  {
    _id: "4",
    title: "Activity Point Manager",
    type: "Full Stack",
    description: "A centralized web platform for KTU students and faculty admins to record, categorize, and verify mandatory 100 activity credit points.",
    technologies: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
    liveLink: "https://apms-activity-points.vercel.app/login",
    githubRepo: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    thumbnail: activityPointImg,
    featured: true
  },
  {
    _id: "5",
    title: "House Price Prediction Model",
    type: "AI / ML Model",
    description: "A predictive machine learning regression model trained to estimate property market values based on spatial, structural, and historical feature datasets.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    liveLink: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    githubRepo: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    _id: "6",
    title: "BunkBuddy Attendance App",
    type: "Student Utility",
    description: "A practical student attendance calculator that computes safe class bunks while maintaining target percentage requirements.",
    technologies: ["JavaScript", "HTML", "CSS", "Tailwind CSS"],
    liveLink: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    githubRepo: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    featured: false
  }
];
