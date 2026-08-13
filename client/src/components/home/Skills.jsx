import React from 'react'
import { BiLogoNetlify } from "react-icons/bi";
import { FiLayers, FiGlobe, FiServer, FiCpu, FiDatabase, FiCode, FiTerminal, FiShield, FiZap, FiCommand } from 'react-icons/fi'
import ScrollFloat from '../effects/ScrollFloat'
import GithubActivity from './GithubActivity'
import ReactImg from '../../assets/images/react.svg'
import JsIcon from '../../assets/images/JsIcon.jpg'
import NextJsIcon from '../../assets/images/NextJsIcon.svg'
import TailwindCssIcon from '../../assets/images/TailwindCssIcon.svg'
import BootstrapIcon from '../../assets/images/BootStrapIcon.svg'
import GsapIcon from '../../assets/images/GsapIcon.png'
import CssIcon from '../../assets/images/CssIcon.svg'
import HtmlIcon from '../../assets/images/HtmlIcon.svg'
import FigmaIcon from '../../assets/images/FigmaIcon.svg'
import VsCodeIcon from '../../assets/images/VsCodeICon.svg'
import GithubIcon from '../../assets/images/GithubIcon.svg'
import ReduxIcon from '../../assets/images/ReduxIcon.svg'
import FirebaseIcon from '../../assets/images/FirebaseIcon.svg'
import AosIcon from '../../assets/images/AosIcon.png'

const skillGroups = [
  {
    title: 'Frontend',
    summary: 'Interfaces, motion, responsive systems, and polished user experiences.',
    skills: [
      { name: 'React 18 / 19', image: ReactImg },
      { name: 'Next.js 14 (App Router)', image: NextJsIcon },
      { name: 'TypeScript', image: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" },
      { name: 'Tailwind CSS', image: TailwindCssIcon },
      { name: 'TanStack Start (SSR)', icon: FiCode },
      { name: 'JavaScript', image: JsIcon },
      { name: 'HTML & CSS', image: HtmlIcon },
      { name: 'Vite', image: "https://www.vectorlogo.zone/logos/vitejsdev/vitejsdev-icon.svg" },
      { name: 'Redux', image: ReduxIcon },
    ],
  },
  {
    title: 'Backend & AI',
    summary: 'APIs, server logic, AI models, authentication, and data handling.',
    skills: [
      { name: 'Node.js', image: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" },
      { name: 'Express.js', icon: FiServer },
      { name: 'Python', image: "https://www.vectorlogo.zone/logos/python/python-icon.svg" },
      { name: 'C Programming', icon: FiTerminal },
      { name: 'PyTorch', image: "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg" },
      { name: 'Scikit-Learn', icon: FiCpu },
      { name: 'Pandas & NumPy', icon: FiCpu },
      { name: 'Anthropic Claude API', icon: FiGlobe },
      { name: 'REST APIs', icon: FiGlobe },
    ],
  },
  {
    title: 'Database & Cloud',
    summary: 'Structured data, realtime services, and project-ready persistence.',
    skills: [
      { name: 'Supabase & RLS Auth', image: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" },
      { name: 'MongoDB', image: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
      { name: 'PostgreSQL', image: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg" },
      { name: 'MySQL', image: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" },
      { name: 'Firebase DB', image: FirebaseIcon },
      { name: 'Vercel Deployment', icon: FiGlobe },
    ],
  },
  {
    title: 'Tools',
    summary: 'Design handoff, AI tooling, code workflows, and animation.',
    skills: [
      { name: 'Git & GitHub', image: GithubIcon },
      { name: 'VS Code', image: VsCodeIcon },
      { name: 'Claude', icon: FiCpu },
      { name: 'Antigravity', icon: FiZap },
      { name: 'Kimi K3', icon: FiCommand },
      { name: 'Codex', icon: FiCode },
      { name: 'Freebuf', icon: FiShield },
      { name: 'Jupyter Notebook', icon: FiTerminal },
      { name: 'Figma UI/UX', image: FigmaIcon },
      { name: 'GSAP', image: GsapIcon },
      { name: 'AOS', image: AosIcon },
      { name: 'Framer Motion', icon: FiLayers },
    ],
  },
]

const SkillIcon = ({ skill }) => {
  if (skill.image) {
    return <img src={skill.image} alt="" className="size-full object-contain" />
  }

  const Icon = skill.icon || FiGlobe
  return <Icon aria-hidden="true" className="size-4 text-[#F6F2FF]" />
}

export const Skills = () => {
  return (
    <section className="md:pt-20 pt-25">
      <div className="container">
        <div className="font-poppins text-Primary font-semibold lg:text-2xl text-lg text-center">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=80%"
            scrollEnd="bottom bottom-=80%"
            stagger={0.03}
          >
            MY SKILLS
          </ScrollFloat>
        </div>
        <h2 className="font-soldier text-Primary font-medium lg:text-5xl text-[30px] uppercase text-center">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=30%"
            scrollEnd="bottom bottom-=60%"
            stagger={0.03}
          >
            Technologies & expertise
          </ScrollFloat>
        </h2>

        <div className="md:mt-14 mt-8 grid items-stretch gap-6 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(340px,420px)]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <article className="skill-group" data-aos="fade-up" key={group.title}>
                <div className="skill-group__header">
                  <span>{group.title}</span>
                  <p>{group.summary}</p>
                </div>

                <div className="skill-group__items">
                  {group.skills.map((skill) => (
                    <div className="skill-pill" key={`${group.title}-${skill.name}`}>
                      <span className="skill-pill__icon">
                        <SkillIcon skill={skill} />
                      </span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <GithubActivity />
        </div>
      </div>
    </section>
  )
}
