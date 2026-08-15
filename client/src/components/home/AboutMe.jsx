import React from 'react'
import { Link } from 'react-router'
import Magnet from '../effects/Magnet'
import BlurText from '../effects/BlurText';
import { FaCheck } from "react-icons/fa6";

const AboutMe = () => {
    return (
        <>
            <section id='About_Me' className='w-full py-16 bg-[#030304] text-[#F6F2FF] md:mt-0 mt-18'>
                <div className="container overflow-hidden">
                    <div className="AboutMe flex lg:flex-row flex-col justify-between">
                        <div className="aboutMeText">
                            <h2 data-aos="fade-right" className='lg:text-[58px] text-[28px] font-soldier text-[#F6F2FF] font-medium lg:mb-5 mb-2'>ABOUT ME</h2>
                            <p data-aos="fade-right" className='lg:text-[68px] text-[40px] font-soldier lg:leading-[72px] leading-[42px] text-[#F6F2FF] font-medium lg:w-[370px] w-full'>
                                Creating Stuff That <span data-aos="fade-left" className='text-coffee'>Does More </span>Than Impress
                            </p>
                            <div className='lg:text-[18px] text-[15px] font-poppins text-[#C9C5D0] font-normal lg:mt-10 lg:mb-0 mb-5 mt-5 lg:w-[370px] w-full'>
                                <BlurText text="Full Stack Developer & AI/ML Engineer based in India" delay={250} animateBy="words" direction="top" />
                            </div>
                        </div>
                        <div>
                            <div className='lg:mb-[50px] mb-[24px] font-poppins lg:text-[32px] text-[16px] font-medium text-[#F6F2FF] lg:w-[700px] w-[100%] overflow-hidden'>
                                <BlurText text="I am dedicated to developing innovative AI-driven applications and full-stack digital tools that solve real-world challenges." delay={150} animateBy="words" direction="top" />
                            </div>
                            <div className='flex items-center justify-between lg:w-[500px] w-full lg:mb-[50px] mb-[30px]'>
                                <div className='flex flex-col gap-4 text-[#C9C5D0]'>
                                    <p className='flex items-center gap-3 font-poppins font-medium' data-aos="fade-right"><FaCheck className="text-coffee" />AI & ML Applications</p>
                                    <p className='flex items-center gap-3 font-poppins font-medium' data-aos="fade-right"><FaCheck className="text-coffee" />Full Stack Development</p>
                                    <p className='flex items-center gap-3 font-poppins font-medium' data-aos="fade-right"><FaCheck className="text-coffee" />ATS Optimization</p>
                                </div>
                                <div className='flex flex-col gap-4 text-[#C9C5D0]'>
                                    <p className='flex items-center gap-3 font-poppins font-medium' data-aos="fade-left"><FaCheck className="text-coffee" />KTU B.Tech IT</p>
                                    <p className='flex items-center gap-3 font-poppins font-medium' data-aos="fade-left"><FaCheck className="text-coffee" />Clean Architecture</p>
                                    <p className='flex items-center gap-3 font-poppins font-medium' data-aos="fade-left"><FaCheck className="text-coffee" />Continuous Innovation</p>
                                </div>
                            </div>
                            <Magnet padding={30} disabled={false} magnetStrength={5}>
                                <Link to={'/about'} className='ContactButton font-poppins py-2.5 px-[24px] font-medium text-base text-[#F6F2FF] border border-white/20 bg-white/5 hover:bg-[#BF4A1A] hover:border-[#BF4A1A] rounded-full hover-this transition-trigger transition-link duration-300'>MORE ABOUT ME</Link>
                            </Magnet>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutMe