import React from 'react'
import { FiLayout, FiSmartphone, FiCpu, FiCode } from 'react-icons/fi'
import ScrollFloat from '../effects/ScrollFloat'
import ScrollReveal from '../effects/ScrollReveal'

export const Services = () => {
  const services = [
    {
      id: '01',
      title: 'Web Application Development',
      shortTitle: 'Frontend & Full-Stack',
      description: 'Building modern, fast, and responsive web applications using React, Next.js, and clean component structures.',
      icon: FiLayout,
      tags: ['React', 'Next.js', 'Tailwind', 'JavaScript'],
    },
    {
      id: '02',
      title: 'UI / UX & Interactive Interfaces',
      shortTitle: 'Design to Code',
      description: 'Translating visual concepts into polished web experiences with responsive layouts and smooth micro-interactions.',
      icon: FiSmartphone,
      tags: ['Figma', 'Responsive UI', 'GSAP', 'CSS'],
    },
    {
      id: '03',
      title: 'AI & Data Integration',
      shortTitle: 'Models & Analytics',
      description: 'Integrating intelligent features, data visualization, and AI APIs into practical user-facing applications.',
      icon: FiCpu,
      tags: ['Python', 'Claude API', 'Pandas', 'REST APIs'],
    },
    {
      id: '04',
      title: 'Performance & Handoff',
      shortTitle: 'Clean Code & Optimization',
      description: 'Ensuring clean code organization, fast initial loads, accessible structures, and smooth project handoff.',
      icon: FiCode,
      tags: ['Clean Architecture', 'Optimization', 'Vite', 'Git'],
    },
  ]

  return (
    <section className="md:pt-20 pt-16">
      <div className="container">
        <div className="font-poppins text-Primary font-semibold lg:text-2xl text-lg text-center">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=80%"
            scrollEnd="bottom bottom-=80%"
            stagger={0.03}
          >
            SERVICES
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
            WHAT I DO
          </ScrollFloat>
        </h2>
        <ScrollReveal containerClassName="font-poppins text-second lg:text-xl text-lg lg:w-[440px] uppercase lg:ml-[100px] text-center mx-auto mt-2">
          Practical digital solutions built with strong structure and modern tools.
        </ScrollReveal>

        <div className="md:mt-14 mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <article
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="group relative min-h-[330px] overflow-hidden rounded-2xl border border-white/15 bg-[var(--bg-card)] p-6 shadow-[0_20px_60px_rgba(22,22,22,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-coffee/50 hover:shadow-[0_28px_80px_rgba(22,22,22,0.22)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coffee/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-white/15 bg-coffee text-2xl text-white">
                      <Icon />
                    </div>
                    <span className="font-soldier text-4xl font-medium leading-none text-coffee">
                      {service.id}
                    </span>
                  </div>

                  <div className="mt-8">
                    <p className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-coffee">
                      {service.shortTitle}
                    </p>
                    <h3 className="mt-2 font-soldier text-[28px] font-medium uppercase leading-[1] text-[var(--text-primary)]">
                      {service.title}
                    </h3>
                    <p className="mt-4 font-poppins text-[14px] leading-6 text-[var(--text-secondary)]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 font-poppins text-[11px] font-medium uppercase text-[var(--text-secondary)] bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services;
