import React from 'react';
import Logo from "../../assets/images/Logo.png"
import { Link } from 'react-router'
import Magnet from '../effects/Magnet';
import { FiArrowUpRight } from 'react-icons/fi';

import ThemeToggle from './ThemeToggle';

export const Navbar = () => {

  return (
    <>
      <nav className='py-5 hidden lg:block text-white'>
        <div className="container">
          <div id='NavRow' className='flex items-center justify-between'>
            {/* ----Logo---- */}
            <Magnet padding={40}>
              <Link to={'/'} className='hover-this transition-link flex items-center justify-center size-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-[#BF4A1A]/60 transition-all duration-300' >
                <img className='w-8 h-auto object-contain transition-trigger filter drop-shadow-[0_0_8px_rgba(246,242,255,0.4)]' src={Logo} alt="Logo" data-aos="fade-down" data-aos-duration="500" data-aos-delay="0" data-aos-easing="ease-out-cubic" />
              </Link>
            </Magnet>

            {/* ----NavLinks---- */}
            <div>
              <ul className='font-soldier flex items-center gap-6 text-2xl text-[#F6F2FF]'>
                <li data-aos="fade-down" data-aos-duration="500" data-aos-delay="100" data-aos-easing="ease-out-cubic">
                  <Link aria-label="Home" to={'/'} className={`flex items-center NavLinks text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors duration-200 transition-link`}>
                    HOME<span className="mx-1 text-[#BF4A1A]">•</span>
                  </Link>
                </li>
                <li data-aos="fade-down" data-aos-duration="500" data-aos-delay="180" data-aos-easing="ease-out-cubic">
                  <Link aria-label="About" to={'/about'} className='flex items-center NavLinks text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors duration-200 transition-link'>
                    ABOUT<span className="mx-1 text-[#BF4A1A]">•</span>
                  </Link>
                </li>
                <li data-aos="fade-down" data-aos-duration="500" data-aos-delay="260" data-aos-easing="ease-out-cubic">
                  <Link aria-label="Projects" to={'/projects'} className='flex items-center NavLinks text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors duration-200 transition-link'>
                    PROJECTS<span className="mx-1 text-[#BF4A1A]">•</span>
                  </Link>
                </li>
                <li data-aos="fade-down" data-aos-duration="500" data-aos-delay="340" data-aos-easing="ease-out-cubic">
                  <Link aria-label="Contact" to={'/contact'} className='flex items-center NavLinks text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors duration-200 transition-link'>
                    CONTACT<span className="mx-1 text-[#BF4A1A]">•</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* ----Theme Toggle & Contact Button---- */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Magnet magnetStrength={2} padding={20}>
                <div className="magnetic-btn" data-aos="fade-down" data-aos-duration="500" data-aos-delay="420" data-aos-easing="ease-out-cubic">
                  <Link aria-label="Contact Ameer Suhail" to={'/contact'} className='group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 px-5 font-poppins text-sm font-semibold uppercase text-[#F6F2FF] hover:text-white transition-trigger transition-link duration-300 hover-this hover:border-[#BF4A1A] hover:bg-[#BF4A1A]'>
                    Contact
                    <span className='flex size-7 items-center justify-center rounded-full group-hover:bg-white group-hover:text-[#030304] bg-[#BF4A1A] text-white transition duration-300 group-hover:rotate-45'>
                      <FiArrowUpRight />
                    </span>
                  </Link>
                </div>
              </Magnet>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
