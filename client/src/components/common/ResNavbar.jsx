import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import ResLogo from "../../assets/images/Logo.png"
import { FiArrowUpRight, FiHome, FiUser, FiBriefcase, FiMail } from 'react-icons/fi';

export const ResNavbar = () => {

  const [isClosed, setIsClosed] = useState(true)
  const { pathname } = useLocation();
  const navLinks = [
    { label: 'Home', path: '/', icon: FiHome },
    { label: 'About me', path: '/about', icon: FiUser },
    { label: 'Projects', path: '/projects', icon: FiBriefcase },
    { label: 'Contact', path: '/contact', icon: FiMail },
  ];

  useEffect(() => {
    document.body.style.overflow = isClosed ? '' : 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isClosed]);

  return (
    <>
      <nav id='Navbar' className='sticky top-0 z-[90] py-4 lg:hidden'>
        <div id='NavRow' className='container flex items-center justify-between'>
          {/* ------Logo------ */}
          <Link
            data-aos="fade-down"
            data-aos-duration="500"
            data-aos-delay="0"
            data-aos-easing="ease-out-cubic"
            to={'/'}
            className='z-[70] flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_14px_34px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-trigger transition-link'
          >
            <img className='w-8 h-auto object-contain filter drop-shadow-[0_0_8px_rgba(246,242,255,0.4)]' src={ResLogo} alt="Logo" />
          </Link>

          {/* ------Nav Menu Button------ */}
          <div className='z-[70] flex items-center gap-3' data-aos="fade-down" data-aos-duration="500" data-aos-delay="150" data-aos-easing="ease-out-cubic">
            <button
              onClick={() => setIsClosed(!isClosed)}
              className={`group flex min-h-12 cursor-pointer select-none items-center gap-3 rounded-full border px-4 font-soldier text-xl font-semibold uppercase shadow-[0_14px_34px_rgba(0,0,0,0.3)] backdrop-blur-xl duration-300 ${
                isClosed
                  ? 'border-white/20 bg-white/10 text-white'
                  : 'border-[#BF4A1A] bg-[#BF4A1A] text-white'
              }`}
              aria-label={isClosed ? "Open menu" : "Close menu"}
              aria-expanded={!isClosed}
            >
              <span>{isClosed ? 'Menu' : 'Close'}</span>
              <span className='relative size-8 rounded-full bg-white/15'>
                <span className={`absolute left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-current duration-300 ${isClosed ? 'top-[9px] rotate-0' : 'top-[15px] rotate-45'}`} ></span>
                <span className={`absolute left-1/2 top-[15px] h-[2px] w-4 -translate-x-1/2 rounded-full bg-current duration-300 ${isClosed ? 'opacity-100' : 'opacity-0'}`}></span>
                <span className={`absolute left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-current duration-300 ${isClosed ? 'top-[21px] rotate-0' : 'top-[15px] -rotate-45'}`}></span>
              </span>
            </button>
          </div>

          {/* ------Mobile Menu Drawer------ */}
          <div className={`fixed left-0 top-0 z-[60] h-dvh w-full transition-opacity duration-500 ${isClosed ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'}`}>
            {/* Overlay */}
            <div onClick={() => setIsClosed(true)} className={`fixed left-0 top-0 h-dvh w-full bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isClosed ? 'opacity-0' : 'opacity-100'}`}></div>

            {/* Drawer Content */}
            <div className={`fixed bottom-0 left-0 z-[65] h-[88dvh] w-full overflow-hidden rounded-t-[30px] border border-white/15 bg-[#0f0e11] text-white p-5 shadow-[0_-30px_90px_rgba(0,0,0,0.5)] duration-500 ease-out ${isClosed ? 'translate-y-full' : 'translate-y-0'}`}>
              <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(191,74,26,0.2),transparent_35%)]'></div>
              <div className='relative flex items-center justify-between border-b border-white/10 pb-5'>
                <div>
                  <p className='font-poppins text-xs font-bold uppercase text-[#BF4A1A] tracking-wider'>Navigation</p>
                  <h2 className='mt-1 font-soldier text-5xl font-semibold uppercase leading-none text-[#F6F2FF]'>Menu</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className='flex size-11 items-center justify-center rounded-full bg-[#BF4A1A] text-white'>
                    <FiArrowUpRight className='rotate-45' />
                  </span>
                </div>
              </div>

              {/* Nav Links */}
              <ul className={`relative mt-8 flex flex-col gap-3 transition-all duration-500 ${isClosed ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                {navLinks.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;

                  return (
                    <li key={item.path} className={`transition-all duration-500 ${isClosed ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`} style={{ transitionDelay: isClosed ? '0ms' : `${180 + index * 80}ms` }}>
                      <Link
                        onClick={() => setIsClosed(true)}
                        className={`group flex min-h-[72px] items-center justify-between rounded-2xl border px-4 font-poppins font-semibold transition-trigger transition-link duration-300 ${
                          isActive
                            ? 'border-[#BF4A1A] bg-[#BF4A1A] text-white shadow-[0_18px_40px_rgba(191,74,26,0.3)]'
                            : 'border-white/10 bg-white/5 text-[#F6F2FF] hover:border-[#BF4A1A]/50 hover:bg-white/10'
                        }`}
                        to={item.path}
                      >
                        <span className='flex items-center gap-4'>
                          <span className={`flex size-11 items-center justify-center rounded-full text-xl transition duration-300 ${isActive ? 'bg-white text-[#BF4A1A]' : 'bg-white/10 text-white group-hover:bg-[#BF4A1A]'}`}>
                            <Icon />
                          </span>
                          <span className='text-xl'>{item.label}</span>
                        </span>
                        <FiArrowUpRight className='text-xl transition duration-300 group-hover:rotate-45' />
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className={`relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-500 ${isClosed ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`} style={{ transitionDelay: isClosed ? '0ms' : '560ms' }}>
                <p className='font-poppins text-xs font-semibold uppercase leading-5 text-[#C9C5D0]/80'>
                  Fullstack developer focused on polished interfaces, smooth interactions, and practical product experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

      </nav>

    </>
  )
}
