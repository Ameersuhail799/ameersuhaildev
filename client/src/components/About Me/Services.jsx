import React from 'react'
import { FaFigma, FaLaptopCode, FaServer, FaPalette } from 'react-icons/fa'
import { FiClock, FiArrowLeft, FiGlobe, FiCpu } from 'react-icons/fi'
import ScrollFloat from '../effects/ScrollFloat'
import ScrollReveal from '../effects/ScrollReveal'

const services = [
  {
    id: '01',
    title: 'Frontend Development',
    shortTitle: 'Frontend',
    icon: FaLaptopCode,
    description:
      'Building responsive, fast, and interactive user interfaces using React, Next.js, and Tailwind CSS.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: '02',
    title: 'Backend & APIs',
    shortTitle: 'Backend',
    icon: FaServer,
    description:
      'Designing secure REST APIs, backend services, and database management with Node.js, Express, and Supabase.',
    tags: ['Node.js', 'Express', 'Supabase'],
  },
  {
    id: '03',
    title: 'AI Integration',
    shortTitle: 'AI / ML',
    icon: FaPalette,
    description:
      'Integrating AI models, ATS optimization engines, and smart automation pipelines into modern products.',
    tags: ['Claude AI', 'PyTorch', 'Automation'],
  },
  {
    id: '04',
    title: 'Full Stack Solutions',
    shortTitle: 'Full Stack',
    icon: FiClock,
    description:
      'Delivering end-to-end production-ready applications from architectural design to cloud deployment.',
    tags: ['Architecture', 'Deployment', 'Vercel'],
  },
]

const Services = () => {
  return (
    <section id='Services' className='mt-[112px] pb-8'>
      <div className="container">
        <div>
          <div className='font-poppins text-Primary text-lg font-semibold uppercase'>
            <ScrollFloat animationDuration={1} ease='back.inOut(2)' scrollStart='center bottom+=50%' scrollEnd='bottom bottom-=40%' stagger={0.03}>
              What I Do
            </ScrollFloat>
          </div>
          <div className='flex items-center justify-between'>
            <div className='font-soldier text-Primary lg:text-[120px] text-[48px] font-medium uppercase leading-[0.95]'>
              <ScrollFloat animationDuration={1} ease='back.inOut(2)' scrollStart='center bottom+=50%' scrollEnd='bottom bottom-=40%' stagger={0.03}>
                Services
              </ScrollFloat>
            </div>
            <FiArrowLeft data-aos="fade-up" className='hidden md:block text-[150px] md:text-[200px] rotate-[-45deg] text-borderCol' />
          </div>
          <ScrollReveal containerClassName='font-poppins text-second lg:text-xl text-lg lg:w-[440px] uppercase lg:ml-[100px]'>
            Comprehensive digital services to boost your online presence and achieve impactful results.
          </ScrollReveal>
        </div>

        <div className='mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <article
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className='group relative min-h-[330px] overflow-hidden rounded-2xl border border-Primary/15 bg-brand/70 p-6 shadow-[0_20px_60px_rgba(22,22,22,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-coffee/50 hover:bg-Primary hover:shadow-[0_28px_80px_rgba(22,22,22,0.22)]'
              >
                <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coffee/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                <div className='pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-Primary/10 transition-all duration-500 group-hover:scale-125 group-hover:border-brand/10' />
                <div className='relative z-10 flex h-full flex-col'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex h-13 w-13 items-center justify-center rounded-xl border border-Primary/10 bg-Primary text-2xl text-brand transition-all duration-500 group-hover:border-brand/15 group-hover:bg-brand group-hover:text-Primary'>
                      <Icon />
                    </div>
                    <span className='font-soldier text-4xl font-medium leading-none text-Primary/20 transition-colors duration-500 group-hover:text-brand/20'>
                      {service.id}
                    </span>
                  </div>

                  <div className='mt-8'>
                    <p className='font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-coffee transition-colors duration-500 group-hover:text-brand/60'>
                      {service.shortTitle}
                    </p>
                    <h3 className='mt-2 font-soldier text-[28px] font-medium uppercase leading-[1] text-Primary transition-colors duration-500 group-hover:text-brand'>
                      {service.title}
                    </h3>
                    <p className='mt-4 font-poppins text-[14px] leading-6 text-second/80 transition-colors duration-500 group-hover:text-brand/75'>
                      {service.description}
                    </p>
                  </div>

                  <div className='mt-auto flex flex-wrap gap-2 pt-6'>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className='rounded-full border border-Primary/10 px-3 py-1 font-poppins text-[11px] font-medium uppercase text-Primary/70 transition-colors duration-500 group-hover:border-brand/15 group-hover:text-brand/70'
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

export default Services
