import React, { useEffect, useRef } from 'react';
import reviewImg1 from '../../assets/images/reviewimg1.png';
import reviewImg2 from '../../assets/images/reviewPfp2.png';
import reviewImg3 from '../../assets/images/reviewImg4.jpg';
import reviewImg4 from '../../assets/images/reviewImg4.jpg';
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MyReview = () => {
  const cardsRef = useRef(null);
  const outerRef = useRef(null);

  useEffect(() => {
    const cardsEl = cardsRef.current;
    const outerEl = outerRef.current;
    if (!cardsEl || !outerEl) return;

    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 1024;
      const amountToScroll = cardsEl.scrollWidth - outerEl.clientWidth;

      if (isMobile) {
        gsap.to(cardsEl, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: outerEl,
            start: "top 40%",
            end: () => `+=${amountToScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      } else {
        gsap.to(cardsEl, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: outerEl,
            start: "center center",
            end: () => `+=${amountToScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      <div id="ScrollCardsHorizontal" ref={outerRef} className="cards-outer relative overflow-hidden">
        <div ref={cardsRef} className="cards flex lg:px-0 px-[16px]">
          {/* ----------------Card 1------------------- */}
          <div className="card min-w-[80vw] sm:min-w-[500px] mr-8">
            <div className="card__inner border border-white/15 bg-[var(--bg-card)]">
              <div className="card__content">
                <div className="flex items-center justify-between mb-10">
                  <div id='Quote' className='bg-coffee w-[52px] h-[52px] rounded-[6px] text-white flex items-center justify-center text-2xl'>
                    <FaQuoteLeft />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-coffee font-poppins font-medium">Reviews</p>
                    <div className="flex items-center gap-1 text-[#FBBF24]">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                  </div>
                </div>
                <p className="card__description text-[var(--text-secondary)]">
                  A natural problem-solver. “Ameer consistently delivered clean, scalable code and brought fresh ideas to the table. His ability to break down complex problems made him an invaluable part of our development team.”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img src={reviewImg1} alt="review profile" />
                  </div>
                  <div>
                    <h2 className="text-[var(--text-primary)] font-poppins font-semibold text-md">John Smith</h2>
                    <p className="text-[var(--text-secondary)] font-poppins font-semibold text-sm mt-1">Agency Client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------Card 2------------------- */}
          <div className="card min-w-[80vw] sm:min-w-[500px] mr-8">
            <div className="card__inner border border-white/15 bg-[var(--bg-card)]">
              <div className="card__content">
                <div className="flex items-center justify-between mb-10">
                  <div id='Quote' className='bg-coffee w-[52px] h-[52px] rounded-[6px] text-white flex items-center justify-center text-2xl'>
                    <FaQuoteLeft />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-coffee font-poppins font-medium">Reviews</p>
                    <div className="flex items-center gap-1 text-[#FBBF24]">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                  </div>
                </div>
                <p className="card__description text-[var(--text-secondary)]">
                  A fast learner. “Quickly adapted to new tools and frameworks, showing impressive growth and keeping projects modern and efficient. That adaptability made the development process future-proof.”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img src={reviewImg2} alt="review profile" />
                  </div>
                  <div>
                    <h2 className="text-[var(--text-primary)] font-poppins font-semibold text-md">Jesscia Aiba</h2>
                    <p className="text-[var(--text-secondary)] font-poppins font-semibold text-sm mt-1">Ui / UX Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------Card 3------------------- */}
          <div className="card min-w-[80vw] sm:min-w-[500px] mr-8">
            <div className="card__inner border border-white/15 bg-[var(--bg-card)]">
              <div className="card__content">
                <div className="flex items-center justify-between mb-10">
                  <div id='Quote' className='bg-coffee w-[52px] h-[52px] rounded-[6px] text-white flex items-center justify-center text-2xl'>
                    <FaQuoteLeft />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-coffee font-poppins font-medium">Reviews</p>
                    <div className="flex items-center gap-1 text-[#FBBF24]">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                  </div>
                </div>
                <p className="card__description text-[var(--text-secondary)]">
                  A reliable team player. “Consistently met deadlines and communicated clearly, making collaboration smooth and projects more enjoyable. You could always count on the work being delivered without stress.”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img src={reviewImg3} alt="review profile" />
                  </div>
                  <div>
                    <h2 className="text-[var(--text-primary)] font-poppins font-semibold text-md">Henry Roy</h2>
                    <p className="text-[var(--text-secondary)] font-poppins font-semibold text-sm mt-1">Digital Marketer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------Card 4------------------- */}
          <div className="card min-w-[80vw] sm:min-w-[500px] lg:mr-8">
            <div className="card__inner border border-white/15 bg-[var(--bg-card)]">
              <div className="card__content">
                <div className="flex items-center justify-between mb-10">
                  <div id='Quote' className='bg-coffee w-[52px] h-[52px] rounded-[6px] text-white flex items-center justify-center text-2xl'>
                    <FaQuoteLeft />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-coffee font-poppins font-medium">Reviews</p>
                    <div className="flex items-center gap-1 text-[#FBBF24]">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                  </div>
                </div>
                <p className="card__description text-[var(--text-secondary)]">
                  A creative innovator. “Always brought an eye for detail and design, writing efficient frontend code while suggesting UI improvements that elevated the overall user experience. The final product looked and felt better because of that vision.”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img src={reviewImg4} alt="review profile" />
                  </div>
                  <div>
                    <h2 className="text-[var(--text-primary)] font-poppins font-semibold text-md">Brendy Wiliam</h2>
                    <p className="text-[var(--text-secondary)] font-poppins font-semibold text-sm mt-1">Finance Professor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------Empty Card------------------- */}
          <div className="card lg:block hidden"> 
            <div className="card__inner">
            <div className="card__image-container" /> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReview;
