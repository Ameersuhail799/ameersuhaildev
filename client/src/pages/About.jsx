import React from 'react'
import PageBanner from '../components/common/PageBanner'
import AboutText from '../components/About Me/AboutText'
import Services from '../components/About Me/Services'
import Review from '../components/About Me/Review'
import ExploreMyWork from '../components/common/ExploreMyWork'

const About = () => {

  return (
    <>
      <section className='my-20'>
        <PageBanner
          id='AboutBanner'
          kicker='AMEER SUHAIL'
          kickerMobile="Let's Work Together"
          title='ABOUT ME'
          description='Full Stack Developer & AI/ML Engineer crafting intelligent web applications'
          scrollTarget='#AboutMeText'
        />
        <AboutText />
        <Services />
        <Review />
        <div className='pt-[130px]'>
          <ExploreMyWork />
        </div>
      </section>
    </>
  )
}

export default About
