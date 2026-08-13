import React from 'react'
import FooterLogo from '../../assets/images/Logo.png'
import { Link } from 'react-router'
// ---------Icons 
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Magnet from '../effects/Magnet';

const Footer = () => {
  return (
    <>
      <footer className='pt-[50px] hidden md:block border-t border-white/15 lg:pb-[32px] pb-[32px] text-white bg-[#030304]'>
        <div className="container">
          <div id="Footer_Row" className='grid grid-cols-1 lg:place-items-start place-items-center sm:grid-cols-2 lg:grid-cols-4 gap-10 py-8 lg:py-[65px]'>
            <div id="Row_1">
              <Magnet data-aos="fade-up" padding={20} disabled={false} magnetStrength={2}>
                <Link to={'/'} className='transition-link'><img src={FooterLogo} alt="Logo" className='md:w-[130px] w-[110px] m-0 m-auto filter drop-shadow-[0_0_10px_rgba(246,242,255,0.3)]' /></Link>
              </Magnet>
              <p data-aos="fade-up" className='text-xs text-[#C9C5D0]/70 font-poppins font-light md:w-[130px] w-[120px] text-center md:mt-6 mt-3'>©2026 Portfolio By Ameer Suhail.</p>
            </div>

            <div id="Row_2">
              <h2 data-aos="fade-up" className='font-soldier md:text-start text-center lg:text-6xl text-5xl text-[#F6F2FF] mb-6'>LINKS</h2>
              <ul id='FooterLinks' className='flex flex-col md:items-start items-center gap-4 text-[#C9C5D0] font-poppins text-sm'>
                <li data-aos="fade-up"><Link to={'/'} className="hover:text-[#BF4A1A] transition-colors">SUPPORT</Link></li>
                <li data-aos="fade-up"><Link to={'/'} className="hover:text-[#BF4A1A] transition-colors">LICENSES</Link></li>
                <li data-aos="fade-up"><Link to={'/'} className="hover:text-[#BF4A1A] transition-colors">TERMS OF USE</Link></li>
                <li data-aos="fade-up"><Link to={'/'} className="hover:text-[#BF4A1A] transition-colors">PRIVACY POLICY</Link></li>
              </ul>
            </div>

            <div id="Row_3">
              <h2 data-aos="fade-up" className='font-soldier md:text-start text-center lg:text-6xl text-5xl text-[#F6F2FF] mb-6'>PAGES</h2>
              <ul id='FooterLinks' className='flex md:items-start items-center flex-col gap-4 text-[#C9C5D0] font-poppins text-sm'>
                <li data-aos="fade-up"><Link className='transition-trigger transition-link hover:text-[#BF4A1A] transition-colors' to={'/about'}>ABOUT ME</Link></li>
                <li data-aos="fade-up"><Link className='transition-trigger transition-link hover:text-[#BF4A1A] transition-colors' to={'/projects'}>MY WORK</Link></li>
                <li data-aos="fade-up"><a className='transition-trigger transition-link hover:text-[#BF4A1A] transition-colors' href='/resume.pdf' download='Ameer_Suhail_Resume.pdf'>DOWNLOAD CV</a></li>
                <li data-aos="fade-up"><Link className='transition-trigger transition-link hover:text-[#BF4A1A] transition-colors' to={'/contact'}>CONTACT</Link></li>
              </ul>
            </div>

            <div id="Row_4">
              <h2 data-aos="fade-up" className='font-soldier md:text-start text-center lg:text-6xl text-5xl text-[#F6F2FF] mb-4'>CONTACT</h2>
              <div id='FooterLinks' className='flex md:items-start items-center flex-col gap-3 text-[#C9C5D0] font-poppins font-medium'>
                <div data-aos="fade-up"><p>KERALA, INDIA</p></div>
                <div data-aos="fade-up"><a href='mailto:ameersuhail81570@gmail.com' className="hover:text-[#BF4A1A] transition-colors">ameersuhail81570@gmail.com</a></div>

                <div className='mt-3 flex items-center gap-7'>
                  <Magnet padding={20} disabled={false} magnetStrength={2}>
                    <a target='_blank' rel='noreferrer' href='https://instagram.com/_ame._r._' aria-label="Visit my Instagram profile" className="text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors"><FaInstagram className='text-[18px]' /></a>
                  </Magnet>
                  <Magnet padding={20} disabled={false} magnetStrength={2}>
                    <a target='_blank' rel='noreferrer' href='https://github.com/ameersuhail799' aria-label="Visit my Github profile" className="text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors"><FaGithub className='text-[18px]' /></a>
                  </Magnet>
                  <Magnet padding={20} disabled={false} magnetStrength={2}>
                    <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/Ameersuhail799' aria-label="Visit my Linkedin profile" className="text-[#F6F2FF] hover:text-[#BF4A1A] transition-colors"><FaLinkedinIn className='text-[18px]' /></a>
                  </Magnet>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------Bottom Copyright------------------ */}
        <div className='border-t border-white/10 mt-10 pt-8 text-center'>
          <p className='text-sm text-[#C9C5D0]/70 font-poppins font-light'>©2026 By Ameer Suhail | All rights reserved.</p>
        </div>
      </footer>

      {/* ---------------- Mobile Device --------------- */}
      <footer className='pt-[40px] pb-[24px] border-t border-white/15 bg-[#030304] md:hidden text-white'>
        <div className="container text-center">

          {/* Branding Header Section */}
          <div className="flex flex-col items-center mb-8">
            <Magnet data-aos="fade-up" padding={15} disabled={false} magnetStrength={1.5}>
              <Link to={'/'} className='transition-link inline-block'>
                <img src={FooterLogo} alt="Logo" className='w-[100px] filter drop-shadow-[0_0_8px_rgba(246,242,255,0.3)]' />
              </Link>
            </Magnet>
            <p data-aos="fade-up" className='text-xs text-[#C9C5D0]/70 font-poppins font-light mt-2 max-w-[150px] mx-auto'>
              ©2026 Portfolio By Ameer Suhail.
            </p>
          </div>

          {/* Links Micro-Grid (2 Columns to save screen space) */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 mb-8 pb-8 border-b border-white/10">
            <div className="flex flex-col items-center">
              <h2 data-aos="fade-up" className='font-soldier text-4xl text-[#F6F2FF] mb-4 tracking-wide'>LINKS</h2>
              <ul className='flex flex-col gap-3 text-[#C9C5D0] font-poppins text-xs font-medium'>
                <li data-aos="fade-up"><Link to={'/'} className="hover:text-[#BF4A1A]">SUPPORT</Link></li>
                <li data-aos="fade-up"><Link to={'/'} className="hover:text-[#BF4A1A]">LICENSES</Link></li>
                <li data-aos="fade-up"><Link to={'/'} className="hover:text-[#BF4A1A]">TERMS OF USE</Link></li>
                <li data-aos="fade-up"><Link to={'/'} className="hover:text-[#BF4A1A]">PRIVACY POLICY</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center">
              <h2 data-aos="fade-up" className='font-soldier text-4xl text-[#F6F2FF] mb-4 tracking-wide'>PAGES</h2>
              <ul className='flex flex-col gap-3 text-[#C9C5D0] font-poppins text-xs font-medium'>
                <li data-aos="fade-up"><Link className='transition-trigger transition-link hover:text-[#BF4A1A]' to={'/about'}>ABOUT ME</Link></li>
                <li data-aos="fade-up"><Link className='transition-trigger transition-link hover:text-[#BF4A1A]' to={'/projects'}>MY WORK</Link></li>
                <li data-aos="fade-up"><a className='transition-trigger transition-link hover:text-[#BF4A1A]' href='/resume.pdf' download='Ameer_Suhail_Resume.pdf'>DOWNLOAD CV</a></li>
                <li data-aos="fade-up"><Link className='transition-trigger transition-link hover:text-[#BF4A1A]' to={'/contact'}>CONTACT</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact & Social Info Container */}
          <div className="flex flex-col items-center gap-4">
            <h2 data-aos="fade-up" className='font-soldier text-4xl text-[#F6F2FF] tracking-wide'>CONTACT</h2>
            <div className='flex flex-col gap-2 text-[#C9C5D0] font-poppins text-xs font-semibold tracking-tight'>
              <div data-aos="fade-up"><p>KERALA, INDIA</p></div>
              <div data-aos="fade-up"><a href='mailto:ameersuhail81570@gmail.com' className="hover:text-[#BF4A1A]">ameersuhail81570@gmail.com</a></div>
            </div>

            {/* Social Icons Strip */}
            <div className='mt-4 flex items-center justify-center gap-6 flex-wrap'>
              <Magnet padding={15} disabled={false} magnetStrength={1.5}>
                <a target='_blank' rel='noreferrer' href='https://instagram.com/_ame._r._' aria-label="Visit my Instagram profile" className="text-[#F6F2FF] hover:text-[#BF4A1A]"><FaInstagram className='text-[16px]' /></a>
              </Magnet>
              <Magnet padding={15} disabled={false} magnetStrength={1.5}>
                <a target='_blank' rel='noreferrer' href='https://github.com/ameersuhail799' aria-label="Visit my Github profile" className="text-[#F6F2FF] hover:text-[#BF4A1A]"><FaGithub className='text-[16px]' /></a>
              </Magnet>
              <Magnet padding={15} disabled={false} magnetStrength={1.5}>
                <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/Ameersuhail799' aria-label="Visit my Linkedin profile" className="text-[#F6F2FF] hover:text-[#BF4A1A]"><FaLinkedinIn className='text-[16px]' /></a>
              </Magnet>
            </div>
          </div>

          {/* Footer Bottom Copyright */}
          <div className='border-t border-white/10 mt-8 pt-6'>
            <p className='text-[11px] text-[#C9C5D0]/70 font-poppins font-light tracking-wide'>©2026 By Ameer Suhail | All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer