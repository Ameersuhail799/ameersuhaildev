import React from 'react'
import { Link } from 'react-router'
import Magnet from '../effects/Magnet'
import ScrollReveal from '../effects/ScrollReveal'

const AboutText = () => {
  return (
    <>
    <div id='AboutMeText' className='overflow-hidden mt-[112px]'>
        <div className="container">
            <div id="AboutTextRow">
                <div id='Text' className='lg:w-[600px] flex flex-col gap-7'>
                    <h2 data-aos="fade-right" className='lg:text-6xl text-5xl text-Primary font-soldier'>Hello!</h2>
                        <ScrollReveal containerClassName='lg:text-[26px] text-second font-poppins font-normal leading-[150%]'>
                            I’m <span className='text-coffee font-medium'>Ameer Suhail,</span> a 3rd Year B.Tech IT student at APJ Abdul Kalam Technological University (KTU) and a passionate <span className='text-coffee font-medium'>Full Stack Developer & AI/ML Engineer.</span> I build high-performance web applications, intelligent AI tools like CareerOS, and scalable digital solutions that solve real-world problems.
                        </ScrollReveal>
                        <ScrollReveal containerClassName='lg:text-[26px] text-second font-poppins font-normal leading-[150%]'>
                            My focus is on <span className='text-coffee font-medium'>Full Stack development & Artificial Intelligence</span>, leveraging modern stacks like React, Next.js, TypeScript, Python, and Supabase to combine clean, intuitive design with <span className='text-coffee font-medium'>powerful functionality.</span>
                        </ScrollReveal>
                    {/* -----------Explore Work----------- */}
                    <Magnet padding={5} magnetStrength={30}>
                        <Link to={'/projects'} className='hover-brown transition-trigger relative w-[200px] h-[200px] rounded-full border-1 border-coffee mt-10 flex items-center justify-center rotate-[-25deg] cursor-pointer hover:rotate-0 hover:bg-coffee duration-[.3s] group'>
                            <span className='absolute top-[-15px] left-0 w-full h-[200px] rotate-[-85deg] group-hover:rotate-0 group-hover:top-0 duration-[.3s] rounded-full border-1 border-coffee'></span>
                            <p className='text-4xl text-second text-center font-soldier group-hover:text-brand duration-[.3s]'>Explore <br /> my Work</p>
                        </Link>
                    </Magnet>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AboutText