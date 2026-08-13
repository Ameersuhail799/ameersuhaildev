import React, { useEffect, useState } from 'react'
import ScrollFloat from '../effects/ScrollFloat';
import { FiArrowUpRight } from 'react-icons/fi';
import { api } from '../../api';
import ProjectCard from '../Projects/ProjectCard';
import { defaultProjects } from '../../data/projectsData';

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let active = true

    const fetchFeaturedProjects = async () => {
      try {
        const res = await api.get('/projects/featured', {
          params: { limit: 10 },
        })
        const data = res?.data?.data || res?.data || []
        if (active && Array.isArray(data) && data.length > 0) {
          setProjects(data)
        } else if (active) {
          setProjects(defaultProjects)
        }
      } catch (error) {
        if (active) setProjects(defaultProjects)
      }
    }

    fetchFeaturedProjects()

    return () => {
      active = false
    }
  }, [])
  
  const displayProjects = projects.length > 0 ? projects : defaultProjects

  return (
    <>
      <section id="Projects" className='lg:mt-70 mt-60 overflow-hidden text-white'>
        <div className="container">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 border-y border-white/15 py-8 md:flex-row md:items-end lg:mb-20">
            <div>
              <div className='font-poppins text-[#C9C5D0] font-semibold uppercase lg:text-base text-sm tracking-wider'>
                <ScrollFloat animationDuration={1} ease='back.inOut(2)' scrollStart='center bottom+=50%' scrollEnd='bottom bottom-=40%' stagger={0.03}>MY PROJECTS</ScrollFloat>
              </div>
              <div className='font-soldier text-[#F6F2FF] font-semibold lg:text-[64px] text-[42px] leading-[0.9] uppercase lg:mt-5 mt-3'>
                <ScrollFloat animationDuration={1} ease='back.inOut(2)' scrollStart='center bottom+=70%' scrollEnd='bottom bottom-=40%' stagger={0.03}>Selected Work</ScrollFloat>
              </div>
            </div>
            <a
              href="/projects"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 px-5 font-poppins text-sm font-semibold uppercase text-[#F6F2FF] transition hover:border-[#BF4A1A] hover:bg-[#BF4A1A] hover:text-white"
            >
              View all projects
              <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* ============= Projects ============ */}
          <div className='flex flex-col gap-10 '>
            {
              displayProjects.map((items, i) => (
                <ProjectCard
                  key={i}
                  scrollPreview={items.scrollPreview}
                  project={items}
                  index={i}
                />
              ))
            }
          </div>
        </div>

      </section>

    </>
  )
}

export default Projects
