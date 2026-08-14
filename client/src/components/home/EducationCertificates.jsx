import React, { useState } from 'react'
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCalendar,
  FiAward,
  FiExternalLink,
  FiX,
  FiEye,
} from 'react-icons/fi'
import ScrollFloat from '../effects/ScrollFloat'

// ── IMPORT ALL 8 VERIFIED CERTIFICATE IMAGES ──
import datacampCertImg from '../../assets/images/certificates/datacamp_cert.png'
import plutoCertImg from '../../assets/images/certificates/pluto_cert.png'
import tataCertImg from '../../assets/images/certificates/tata_cert.png'
import nasscomCertImg from '../../assets/images/certificates/nasscom_cert.png'
import ibmSustainabilityCertImg from '../../assets/images/certificates/ibm_sustainability_cert.png'
import googleCertImg from '../../assets/images/certificates/google_cert.png'
import ibmAgentCertImg from '../../assets/images/certificates/ibm_agent_cert.png'
import ciscoCertImg from '../../assets/images/certificates/cisco_cert.png'

// ── ALL 8 TOP CURATED CREDENTIALS & EXPERIENCE ──
const topCredentials = [
  {
    id: 'top-1',
    title: 'AI Engineer for Data Scientists Associate',
    issuer: 'DataCamp',
    type: 'PROFESSIONAL CERT',
    date: 'August 12, 2026',
    credentialId: 'AEDS0014503856882',
    link: 'https://github.com/Ameersuhail799/ameer-credentials',
    certImage: datacampCertImg,
    description:
      'Professional certification demonstrating competency as an AI Engineer for Data Scientists, combining artificial intelligence, data science, machine learning and Python-based technical skills.',
    tags: ['AI Engineering', 'Machine Learning', 'Data Science', 'Python 3'],
  },
  {
    id: 'top-2',
    title: 'AI & Machine Learning Internship',
    issuer: 'Pluto Academy',
    type: 'INTERNSHIP',
    duration: '1 Month',
    date: 'June 2026',
    credentialId: 'PA-OL-AIML-2026-0233',
    link: 'https://github.com/Ameersuhail799/ameer-credentials',
    certImage: plutoCertImg,
    description:
      'Completed a one-month AI & Machine Learning internship focused on practical skill development and real-world project execution, gaining hands-on exposure to applied AI and machine learning workflows.',
    tags: ['Applied AI', 'Machine Learning', 'Python', 'Real Projects'],
  },
  {
    id: 'top-3',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata × Forage',
    type: 'JOB SIMULATION',
    date: 'June 24, 2026',
    credentialId: 'TATA-FORAGE-GENAI-2026',
    link: 'https://github.com/Ameersuhail799/ameer-credentials',
    certImage: tataCertImg,
    description:
      'Completed a practical GenAI-powered data analytics job simulation with Tata through Forage, working through realistic analytical problems involving exploratory data analysis, AI prediction, risk profiling, and reporting.',
    tags: ['Generative AI', 'Data Analytics', 'Risk Profiling', 'Data Storytelling'],
  },
  {
    id: 'top-4',
    title: 'GEN AI NASSCOM',
    issuer: 'NASSCOM / FutureSkills Prime',
    type: 'ASSESSMENT CREDENTIAL',
    date: 'June 11, 2026',
    credentialId: 'NASSCOM-GENAI-2026',
    link: 'https://github.com/Ameersuhail799/ameer-credentials',
    certImage: nasscomCertImg,
    description:
      'Assessment-based credential demonstrating successful completion of the GEN AI NASSCOM assessment, aligned with industry-developed competency standards approved by the Government of India.',
    tags: ['Generative AI', 'AI Applications', 'Prompt Engineering'],
  },
  {
    id: 'top-5',
    title: 'AI for Sustainability Virtual Internship',
    issuer: '1M1B × IBM SkillsBuild',
    type: 'VIRTUAL INTERNSHIP',
    date: 'August 2, 2026',
    credentialId: 'PLAN-56138075980A',
    link: 'https://github.com/Ameersuhail799/ameer-credentials',
    certImage: ibmSustainabilityCertImg,
    description:
      'Completed the 1M1B AI for Sustainability Virtual Internship, gaining exposure to the application of artificial intelligence in sustainability-focused problem solving.',
    tags: ['AI & Sustainability', 'Applied AI', 'IBM SkillsBuild'],
  },
  {
    id: 'top-6',
    title: 'Google AI Essentials Specialization',
    issuer: 'Google × Coursera',
    type: 'SPECIALIZATION',
    date: 'June 13, 2026',
    credentialId: '300LWM67QS9F',
    link: 'https://coursera.org/verify/specialization/300LWM67QS9F',
    certImage: googleCertImg,
    description:
      'Completed Google\'s 5-course AI Essentials specialization, developing foundational skills in AI tools, prompting, responsible AI use and AI-assisted productivity.',
    tags: ['AI Tools', 'Prompting', 'Responsible AI', 'Productivity'],
  },
  {
    id: 'top-7',
    title: 'Build an AI Agent',
    issuer: 'IBM SkillsBuild',
    type: 'DIGITAL CREDENTIAL',
    date: 'July 14, 2026',
    credentialId: 'CREDLY-IBM-AI-AGENT',
    link: 'https://www.credly.com/go/JanZ1w7w',
    certImage: ibmAgentCertImg,
    description:
      'Completed IBM SkillsBuild\'s Build an AI Agent credential, focused on foundational concepts and practical development of AI-agent-based systems.',
    tags: ['AI Agents', 'Generative AI', 'Agentic Workflows'],
  },
  {
    id: 'top-8',
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy × OpenEDG',
    type: 'TECHNICAL COURSE',
    date: 'June 19, 2026',
    credentialId: 'CISCO-PY-2026',
    link: 'https://github.com/Ameersuhail799/ameer-credentials',
    certImage: ciscoCertImg,
    description:
      'Completed Python Essentials 1 covering Python programming, algorithms, debugging, refactoring and core software development concepts.',
    tags: ['Python 3', 'Algorithms', 'Debugging', 'Refactoring'],
  },
]

const EducationCertificates = () => {
  const [selectedCred, setSelectedCred] = useState(null)

  return (
    <section id="EducationCertificates" className="lg:mt-70 mt-60 overflow-hidden text-white">
      <div className="container">
        
        {/* ── SECTION HEADER (MATCHING PROJECTS.JSX 1:1) ── */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-y border-white/15 py-8 md:flex-row md:items-end lg:mb-20">
          <div>
            <div className="font-poppins text-[#C9C5D0] font-semibold uppercase lg:text-base text-sm tracking-wider">
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
                AUTHENTICATED PROFILES
              </ScrollFloat>
            </div>
            <div className="font-soldier text-[#F6F2FF] font-semibold text-[26px] sm:text-[38px] md:text-[52px] lg:text-[64px] leading-[1.0] uppercase lg:mt-5 mt-3 break-words">
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=70%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
                Certifications & Experience
              </ScrollFloat>
            </div>
          </div>

          <a
            href="https://github.com/Ameersuhail799/ameer-credentials"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 px-5 font-poppins text-sm font-semibold uppercase text-[#F6F2FF] transition hover:border-[#BF4A1A] hover:bg-[#BF4A1A] hover:text-white"
          >
            View all credentials
            <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* ── 2-COLUMN SPLIT GRID WITH ALL 8 REAL CERTIFICATE PREVIEWS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {topCredentials.map((cred) => (
            <article
              key={cred.id}
              data-aos="fade-up"
              className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#0f0e11] shadow-[0_22px_70px_rgba(0,0,0,0.4)] transition duration-300 hover:-translate-y-1 hover:border-[#BF4A1A]/40 hover:shadow-[0_30px_90px_rgba(0,0,0,0.6)] p-5 sm:p-7 flex flex-col justify-between text-white"
            >
              <div>
                {/* Header Pills Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#BF4A1A]/30 bg-[#BF4A1A]/10 px-3.5 py-1.5 font-poppins text-xs font-bold uppercase text-[#BF4A1A]">
                    <FiCheckCircle />
                    {cred.type}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-poppins text-xs font-bold uppercase text-[#C9C5D0]">
                    <FiCalendar />
                    {cred.date}
                  </span>
                </div>

                {/* ── CERTIFICATE PHOTO CONTAINER INSIDE BOX ── */}
                <div
                  onClick={() => setSelectedCred(cred)}
                  className="relative w-full h-48 sm:h-56 overflow-hidden rounded-[18px] border border-white/10 bg-[#161616] mb-5 group/img cursor-pointer shadow-inner"
                >
                  <img
                    src={cred.certImage}
                    alt={`${cred.title} Certificate`}
                    className="h-full w-full object-cover sm:object-contain bg-black/40 transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition duration-300 flex items-center justify-center gap-2 font-poppins text-xs font-bold uppercase text-white backdrop-blur-[2px]">
                    <FiEye className="text-base" />
                    <span>Click to Expand</span>
                  </div>
                </div>

                {/* Issuer Name */}
                <p className="font-poppins text-xs font-semibold uppercase tracking-wider text-[#BF4A1A]">
                  {cred.issuer}
                </p>

                {/* Credential Title */}
                <h3 className="mt-1.5 font-soldier text-2xl sm:text-3xl font-semibold uppercase text-[#F6F2FF] leading-tight group-hover:text-white transition duration-300">
                  {cred.title}
                </h3>

                {/* Description */}
                <p className="mt-3 font-poppins text-xs sm:text-sm leading-relaxed text-[#C9C5D0]/80">
                  {cred.description}
                </p>

                {/* Skill Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {cred.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-poppins text-xs font-medium text-[#C9C5D0] group-hover:border-white/20 group-hover:text-[#F6F2FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={cred.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#BF4A1A] px-5 font-poppins text-xs font-bold uppercase text-white transition hover:bg-[#a33d13] shadow-lg"
                >
                  <span>Verify Credential</span>
                  <FiArrowUpRight />
                </a>

                <span className="font-mono-custom text-[11px] font-semibold text-[#C9C5D0]/50 uppercase tracking-widest">
                  {cred.credentialId ? `ID: ${cred.credentialId}` : 'VERIFIED'}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* ── BOTTOM CTA BANNER: VIEW ALL CERTIFICATES ON GITHUB ── */}
        <div className="mt-12 lg:mt-16 flex flex-col items-center justify-center text-center rounded-[26px] border border-white/10 bg-gradient-to-r from-[#16141a] via-[#0f0e11] to-[#16141a] p-8 sm:p-12 shadow-[0_22px_70px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#BF4A1A]/30 bg-[#BF4A1A]/10 text-[#BF4A1A] font-poppins text-xs font-bold uppercase tracking-wider mb-4">
            <FiAward className="text-sm" />
            <span>Master Repository Sync</span>
          </div>

          <h3 className="font-soldier text-2xl sm:text-4xl font-semibold uppercase text-[#F6F2FF] max-w-2xl leading-tight">
            Explore All 20+ Verified Credentials & Certificates
          </h3>

          <p className="mt-3 font-poppins text-xs sm:text-sm text-[#C9C5D0]/80 max-w-xl leading-relaxed">
            View the complete master archive of official certificates, badges, virtual internships, and job simulations hosted on GitHub.
          </p>

          <a
            href="https://github.com/Ameersuhail799/ameer-credentials"
            target="_blank"
            rel="noreferrer"
            className="mt-6 group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#BF4A1A] px-7 font-poppins text-xs sm:text-sm font-bold uppercase text-white shadow-[0_10px_30px_rgba(191,74,26,0.3)] transition-all duration-300 hover:bg-[#a33d13] hover:shadow-[0_15px_40px_rgba(191,74,26,0.5)] hover:scale-[1.02]"
          >
            <span>View All Certificates on GitHub</span>
            <FiArrowUpRight className="text-base transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

      </div>

      {/* ── INTERACTIVE EXPANDED CERTIFICATE LIGHTBOX MODAL ── */}
      {selectedCred && (
        <div className="fixed inset-0 z-[100050] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-white/20 bg-[#0f0e11] p-6 sm:p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.9)] scrollbar-thin">
            <button
              onClick={() => setSelectedCred(null)}
              type="button"
              className="absolute right-5 top-5 z-20 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-[#BF4A1A] hover:border-[#BF4A1A] transition cursor-pointer"
            >
              <FiX className="text-lg" />
            </button>

            {/* Modal Certificate Image Preview */}
            <div className="w-full overflow-hidden rounded-[20px] border border-white/15 bg-black p-2 mb-6">
              <img
                src={selectedCred.certImage}
                alt={`${selectedCred.title} Full Certificate`}
                className="w-full h-auto max-h-[450px] object-contain rounded-[14px]"
              />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#BF4A1A]/40 bg-[#BF4A1A]/15 px-3 py-1 font-poppins text-xs font-bold uppercase text-[#BF4A1A]">
                <FiCheckCircle />
                {selectedCred.type}
              </span>
              <span className="font-poppins text-xs font-semibold text-[#BF4A1A]">
                {selectedCred.issuer}
              </span>
            </div>

            <h3 className="font-soldier text-3xl sm:text-4xl font-semibold uppercase text-[#F6F2FF] leading-tight">
              {selectedCred.title}
            </h3>

            <div className="mt-2 flex items-center gap-3 font-mono-custom text-xs text-[#C9C5D0]/60">
              <span>DATE: {selectedCred.date}</span>
              {selectedCred.duration && <span>• DURATION: {selectedCred.duration}</span>}
            </div>

            <p className="mt-4 font-poppins text-sm leading-relaxed text-[#C9C5D0]/90">
              {selectedCred.description}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="font-mono-custom text-[10px] font-bold uppercase tracking-widest text-[#C9C5D0]/50 mb-2">
                VERIFIED COMPETENCIES
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCred.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-poppins text-xs font-medium text-[#F6F2FF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <span className="font-mono-custom text-xs text-[#C9C5D0]/50 font-semibold truncate max-w-[200px]">
                {selectedCred.credentialId ? `ID: ${selectedCred.credentialId}` : 'VERIFIED REPOSITORY'}
              </span>
              <a
                href={selectedCred.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#BF4A1A] bg-[#BF4A1A] px-5 py-2.5 font-poppins text-xs font-bold uppercase text-white hover:bg-[#a33d13] transition shadow-lg"
              >
                <span>VERIFY CREDENTIAL ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default EducationCertificates
