import React from 'react'
import { Link } from 'react-router';
import PortfolioPic from "../../assets/images/portfolioImg_nobg.png"
import PortfolioShape from "../../assets/images/PortfolioShape.png"
// -----Animation Npm 
import { TypeAnimation } from 'react-type-animation';
import Magnet from '../effects/Magnet'
import BlurText from '../effects/BlurText';
// ---------Icons 
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Banner = () => {
  return (
    <>
      <section id="Banner" className='pt-8 lg:pt-16 overflow-hidden lg:pb-16 pb-0 text-white'>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-8%] md:top-20 top-0 h-72 w-72 rounded-full bg-[#BF4A1A]/20 blur-3xl" />
        </div>
        <div className="container">
          <div className='flex justify-between items-start md:flex-nowrap flex-wrap gap-10 lg:gap-0'>
            <div className="bannerText" >
              <p data-aos="fade-right" data-aos-duration="600" data-aos-delay="100" data-aos-easing="ease-out-cubic" className='font-medium text-sm tracking-[2px] lg:text-base lg:tracking-[3px] text-[#C9C5D0] uppercase'>
                WELCOME TO MY PORTFOLIO
              </p>
              <h1 data-aos="fade-right" data-aos-duration="600" data-aos-delay="0" data-aos-easing="ease-out-cubic" className='font-poppins text-[#F6F2FF] text-[38px] lg:text-[68px] font-medium lg:mt-2 mt-4'>
                Hi, i'm <span className='text-[#BF4A1A]'>Ameer Suhail</span>
              </h1>
              {/* -----animated Text------- */}
              <div data-aos="fade-right" data-aos-duration="600" data-aos-delay="200" data-aos-easing="ease-out-cubic">
                <TypeAnimation
                  sequence={[
                    `An AI-Powered Software Engineer.`,
                    1200,
                    `An AI Engineer & Full-Stack Creator.`,
                    1200,
                    `Building Intelligent AI Systems.`,
                    1200,
                    `Architecting Next-Gen Web & AI Apps.`,
                    1200,
                  ]}
                  className='text-[25px] lg:text-[38px] text-[#C9C5D0]'
                  wrapper="span"
                  speed={60}
                  repeat={Infinity}
                />
              </div>
              <div data-aos="fade-right" data-aos-duration="700" data-aos-delay="300" data-aos-easing="ease-out-cubic" className='font-medium font-poppins text-[#C9C5D0]/80 mt-6 lg:mt-4 text-[12px] lg:text-sm md:w-[435px] w-full'>
                <BlurText text="3rd Year B.Tech IT student at KTU. Driven by passion and defined by precision, I craft high-performance web apps, intelligent AI models, and real-time software systems." delay={350} animateBy="words" direction="top" />
              </div>

              {/* -----Text Button------- */}
              <div className='mt-6 flex items-center gap-3'>
                <Magnet padding={10} disabled={false} magnetStrength={5}>
                  <div data-aos="fade-right" data-aos-duration="700" data-aos-delay="400" data-aos-easing="ease-out-cubic">
                    <Link to={'/contact'} className='ContactButton transition-trigger transition-link px-[24px] py-[8px] font-poppins font-medium lg:text-base text-sm text-[#F6F2FF] border border-white/20 hover:border-[#BF4A1A] hover:bg-[#BF4A1A] rounded-full hover-this transition-all duration-300'>
                      CONTACT
                    </Link>
                  </div>
                </Magnet>
                <Magnet padding={10} disabled={false} magnetStrength={5}>
                  <a href="/resume.pdf" download="Ameer_Suhail_Resume.pdf" data-aos="fade-right" data-aos-duration="700" data-aos-delay="450" data-aos-easing="ease-out-cubic" className='DownloadCv px-[24px] py-[8px] font-poppins font-medium text-white text-sm lg:py-[8px] lg:text-base bg-[#BF4A1A] hover:bg-[#a33d13] border border-[#BF4A1A] rounded-full hover-this transition-all duration-300'>
                    <span>DOWNLOAD CV</span>
                  </a>
                </Magnet>
              </div>

              {/* -----Social Media Button------- */}
              <div className='mt-10 flex items-center gap-7'>
                <Magnet padding={20} disabled={false} magnetStrength={2}>
                  <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="560" data-aos-easing="ease-out-cubic" data-aos-offset="30">
                    <a target='_blank' rel='noreferrer' href='https://instagram.com/_ame._r._' aria-label="Visit my Instagram profile" className="text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors duration-200">
                      <FaInstagram className='text-[20px]' />
                    </a>
                  </div>
                </Magnet>
                <Magnet padding={20} disabled={false} magnetStrength={2}>
                  <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="680" data-aos-easing="ease-out-cubic" data-aos-offset="30">
                    <a target='_blank' rel='noreferrer' href='https://github.com/ameersuhail799' aria-label="Visit my Github profile" className="text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors duration-200">
                      <FaGithub className='text-[20px]' />
                    </a>
                  </div>
                </Magnet>
                <Magnet padding={20} disabled={false} magnetStrength={2}>
                  <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="740" data-aos-easing="ease-out-cubic" data-aos-offset="30">
                    <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/Ameersuhail799' aria-label="Visit my Linkedin profile" className="text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors duration-200">
                      <FaLinkedinIn className='text-[20px]' />
                    </a>
                  </div>
                </Magnet>
              </div>
            </div>

            {/* ----------------------- Portfolio Image Cutout ---------------------- */}
            <div className='relative md:w-[500px] w-full flex items-center justify-center py-4' data-aos="fade-left" data-aos-duration="800" data-aos-delay="150" data-aos-easing="ease-out-cubic" id="bannerPhoto">
              <img src={PortfolioShape} alt="" className="absolute -z-10 w-[115%] max-w-[560px] opacity-90 rotate-[-2deg] pointer-events-none select-none" />
              <img src={PortfolioPic} alt="Ameer Suhail" className="w-full max-w-[440px] h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-[1.02]" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Banner