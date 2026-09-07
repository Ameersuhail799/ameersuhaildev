import React, { useEffect, useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight, FiCalendar, FiGitBranch, FiUsers, FiGitCommit, FiCheckCircle } from 'react-icons/fi'

const GITHUB_USERNAME = 'ameersuhail799'
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`

const KNOWN_SCORES = {
  // June
  '2026-06-11': 1,
  '2026-06-13': 3,
  '2026-06-14': 1,
  '2026-06-15': 1,
  '2026-06-17': 1,
  '2026-06-18': 3,
  '2026-06-20': 4,
  '2026-06-23': 4,
  '2026-06-24': 4,
  '2026-06-25': 3,
  '2026-06-26': 4,
  // July
  '2026-07-14': 1,
  '2026-07-15': 1,
  '2026-07-28': 2,
  '2026-07-29': 2,
  '2026-07-30': 1,
  '2026-07-31': 2,
  // August
  '2026-08-01': 1,
  '2026-08-05': 2,
  '2026-08-06': 1,
  '2026-08-07': 4,
  '2026-08-08': 1,
  '2026-08-11': 4,
  '2026-08-12': 5,
  '2026-08-13': 8,
  '2026-08-14': 6,
  '2026-08-15': 3,
  '2026-08-16': 4,
  '2026-08-18': 2,
  '2026-08-20': 5,
  '2026-08-22': 3,
  '2026-08-25': 4,
  '2026-08-28': 3,
  '2026-08-30': 6,
  '2026-08-31': 4,
  // September
  '2026-09-01': 3,
  '2026-09-02': 4,
  '2026-09-03': 2,
  '2026-09-04': 5,
  '2026-09-05': 8,
  '2026-09-06': 4,
  '2026-09-07': 5,
  '2026-09-08': 3,
}

const INITIAL_PROFILE = {
  name: 'AMEER SUHAIL K T',
  public_repos: 13,
  followers: 5,
  avatar_url: 'https://avatars.githubusercontent.com/u/195453600?v=4'
}

const INITIAL_COMMITS = [
  { sha: 'ffdbac8', repo: 'RELIFE', message: 'feat: implement ReLife approval passport and impact center', time: '2d ago', url: 'https://github.com/Ameersuhail799/RELIFE/commit/ffdbac8' },
  { sha: 'ddc0795', repo: 'RELIFE', message: 'feat: implement ReLife scenario lab and demand matching', time: '2d ago', url: 'https://github.com/Ameersuhail799/RELIFE/commit/ddc0795' },
  { sha: '6c6866e', repo: 'RELIFE', message: 'feat: implement ReLife command center and asset intelligence', time: '2d ago', url: 'https://github.com/Ameersuhail799/RELIFE/commit/6c6866e' },
  { sha: 'e56c43b', repo: 'RELIFE', message: 'fix(frontend): refine mobile responsiveness, typography truncation, and scrollbar styles', time: '2d ago', url: 'https://github.com/Ameersuhail799/RELIFE/commit/e56c43b' },
  { sha: 'f0c3adb', repo: 'RELIFE', message: 'feat: add ReLife frontend design system and application shell', time: '2d ago', url: 'https://github.com/Ameersuhail799/RELIFE/commit/f0c3adb' },
  { sha: '646b2ee', repo: 'ameersuhaildev', message: 'feat: update GitHub activity section with latest August scores, stats, and commit logs', time: '7d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/646b2ee' },
  { sha: 'f9603d9', repo: 'ameersuhaildev', message: 'perf: pre-mount CognitionHero in background during loading screen for instant zero-lag intro transition', time: '18d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/f9603d9' },
  { sha: '37314b8', repo: 'ameersuhaildev', message: 'fix: activate portfolio-active immediately on CognitionHero exit to eliminate 500ms dark theme flash glitch', time: '23d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/37314b8' },
]

const timeAgo = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffSec = Math.floor((now - date) / 1000)
  if (diffSec < 60) return 'just now'
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Orange-brown theme color gradient (Permanently Dark Widget)
const getContributionColor = (score) => {
  if (!score || score <= 0) return '#23201d'
  if (score === 1) return '#5c2814'
  if (score === 2) return '#8f3718'
  if (score === 3) return '#bf4a1a'
  return '#e05a20'
}

const generateWeeksGrid = (scoresMap = {}) => {
  const mergedMap = { ...KNOWN_SCORES, ...scoresMap }
  const weeks = []
  const today = new Date()
  const currentDayOfWeek = today.getDay()
  const endDate = new Date(today)
  endDate.setDate(today.getDate() + (6 - currentDayOfWeek))

  const startDate = new Date(endDate)
  startDate.setDate(endDate.getDate() - 19 * 7 + 1)

  let curr = new Date(startDate)
  while (curr <= endDate) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const dateStr = curr.toISOString().split('T')[0]
      const score = mergedMap[dateStr] || 0
      week.push({
        date: dateStr,
        score,
        formattedDate: curr.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      })
      curr.setDate(curr.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

const GithubActivity = () => {
  const [profile, setProfile] = useState(INITIAL_PROFILE)
  const [commits, setCommits] = useState(INITIAL_COMMITS)
  const [gridData, setGridData] = useState(() => generateWeeksGrid())
  const [hoveredDay, setHoveredDay] = useState(null)
  const [isLiveConnected, setIsLiveConnected] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const loadLiveData = async () => {
      try {
        // Fetch Live GitHub User Profile & Public Repos Commits simultaneously
        const [profileRes, eventsRes, relifeCommitsRes, portfolioCommitsRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, { signal: controller.signal }),
          fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/RELIFE/commits`, { signal: controller.signal }),
          fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/ameersuhaildev/commits`, { signal: controller.signal })
        ])

        let liveFound = false

        if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
          const p = await profileRes.value.json()
          if (p && p.public_repos !== undefined) {
            setProfile({
              name: p.name || INITIAL_PROFILE.name,
              public_repos: p.public_repos ?? INITIAL_PROFILE.public_repos,
              followers: p.followers ?? INITIAL_PROFILE.followers,
              avatar_url: p.avatar_url || INITIAL_PROFILE.avatar_url
            })
            liveFound = true
          }
        }

        const liveCommitsList = []

        // Parse RELIFE commits
        if (relifeCommitsRes.status === 'fulfilled' && relifeCommitsRes.value.ok) {
          const relifeData = await relifeCommitsRes.value.json()
          if (Array.isArray(relifeData)) {
            relifeData.slice(0, 5).forEach((c) => {
              liveCommitsList.push({
                sha: c.sha ? c.sha.slice(0, 7) : 'commit',
                repo: 'RELIFE',
                message: c.commit?.message ? c.commit.message.split('\n')[0] : 'update',
                url: c.html_url || `https://github.com/${GITHUB_USERNAME}/RELIFE/commit/${c.sha}`,
                rawDate: c.commit?.committer?.date ? new Date(c.commit.committer.date) : new Date(),
                time: timeAgo(c.commit?.committer?.date)
              })
            })
            liveFound = true
          }
        }

        // Parse ameersuhaildev commits
        if (portfolioCommitsRes.status === 'fulfilled' && portfolioCommitsRes.value.ok) {
          const portData = await portfolioCommitsRes.value.json()
          if (Array.isArray(portData)) {
            portData.slice(0, 5).forEach((c) => {
              liveCommitsList.push({
                sha: c.sha ? c.sha.slice(0, 7) : 'commit',
                repo: 'ameersuhaildev',
                message: c.commit?.message ? c.commit.message.split('\n')[0] : 'update',
                url: c.html_url || `https://github.com/${GITHUB_USERNAME}/ameersuhaildev/commit/${c.sha}`,
                rawDate: c.commit?.committer?.date ? new Date(c.commit.committer.date) : new Date(),
                time: timeAgo(c.commit?.committer?.date)
              })
            })
            liveFound = true
          }
        }

        // Parse Public Events
        if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
          const events = await eventsRes.value.json()
          if (Array.isArray(events)) {
            events.forEach((ev) => {
              if (ev.type === 'PushEvent' && ev.payload?.commits) {
                ev.payload.commits.forEach((c) => {
                  liveCommitsList.push({
                    sha: c.sha ? c.sha.slice(0, 7) : 'commit',
                    repo: ev.repo?.name ? ev.repo.name.replace(/^Ameersuhail799\//i, '') : 'github',
                    message: c.message ? c.message.split('\n')[0] : 'push update',
                    url: `https://github.com/${ev.repo?.name || GITHUB_USERNAME}/commit/${c.sha}`,
                    rawDate: ev.created_at ? new Date(ev.created_at) : new Date(),
                    time: timeAgo(ev.created_at)
                  })
                })
              }
            })
            liveFound = true
          }
        }

        if (liveCommitsList.length > 0) {
          // Deduplicate by SHA and sort by date descending
          const uniqueMap = new Map()
          liveCommitsList.forEach((item) => {
            if (!uniqueMap.has(item.sha)) {
              uniqueMap.set(item.sha, item)
            }
          })
          const sorted = Array.from(uniqueMap.values()).sort((a, b) => b.rawDate - a.rawDate)
          setCommits(sorted.slice(0, 8))
        }

        if (liveFound) {
          setIsLiveConnected(true)
        }
      } catch (err) {
        // Fallback to static initial state gracefully
      }
    }

    loadLiveData()

    return () => controller.abort()
  }, [])

  // Month headers based on weeks
  const monthHeaders = useMemo(() => {
    if (!gridData.length) return []
    const headers = []
    let lastMonth = ''

    gridData.forEach((week, weekIdx) => {
      const firstDay = week[0]
      if (firstDay) {
        const monthName = new Date(firstDay.date).toLocaleDateString('en-US', { month: 'short' })
        if (monthName !== lastMonth) {
          headers.push({ month: monthName, colIndex: weekIdx })
          lastMonth = monthName
        }
      }
    })
    return headers
  }, [gridData])

  const activityStats = useMemo(() => {
    return [
      { label: 'Public repos', value: profile?.public_repos ?? 13, icon: <FiGitBranch /> },
      { label: 'Followers', value: profile?.followers ?? 5, icon: <FiUsers /> },
      { label: 'Recent commits', value: commits.length || 8, icon: <FiGitCommit /> },
    ]
  }, [profile, commits])

  return (
    <div
      className="rounded-[22px] border border-white/10 bg-[#0f0e11] p-5 text-[#F6F2FF] shadow-[0_28px_70px_rgba(0,0,0,0.5)] sm:p-6"
      data-aos="fade-up"
      style={{
        backgroundColor: '#0f0e11',
        color: '#F6F2FF'
      }}
    >
      {/* ── Top Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-[58px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-white/15 bg-white/5">
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : <FaGithub className="text-white" />}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-block size-2 rounded-full ${isLiveConnected ? 'bg-emerald-400 animate-ping' : 'bg-[#BF4A1A] animate-pulse'}`} />
              <p className="font-poppins text-xs font-bold uppercase text-[#BF4A1A] tracking-wider flex items-center gap-1.5">
                {isLiveConnected ? (
                  <>
                    <FiCheckCircle className="text-emerald-400 text-xs inline" /> Live GitHub Connected
                  </>
                ) : (
                  'GitHub Activity'
                )}
              </p>
            </div>
            <h3 className="mt-1 font-soldier text-xl sm:text-2xl md:text-[34px] font-bold uppercase leading-tight text-[#F6F2FF] break-words">
              {profile?.name || GITHUB_USERNAME}
            </h3>
          </div>
        </div>

        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noreferrer"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-[#BF4A1A] hover:border-[#BF4A1A]"
          aria-label="Open GitHub profile"
        >
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>

      {/* ── Stat Cards ── */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {activityStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="mb-2 flex size-7 items-center justify-center rounded-xl bg-[#BF4A1A]/20 text-[#BF4A1A] text-sm">
              {stat.icon}
            </span>
            <strong className="block font-poppins text-[20px] leading-none text-[#F6F2FF]">{stat.value}</strong>
            <span className="mt-1 block font-poppins text-[11px] font-semibold text-[#C9C5D0]/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Orange-Brown Theme Contribution Grid ── */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#17151a] p-4 text-[#C9C5D0]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-poppins text-xs font-semibold text-white/90 flex items-center gap-2">
            <FiCalendar className="text-[#BF4A1A]" /> Contributions in Recent Months
          </span>
          <span className="font-poppins text-[10px] text-[#BF4A1A] bg-[#BF4A1A]/10 border border-[#BF4A1A]/25 px-2.5 py-0.5 rounded-full">
            Realtime GitHub Sync
          </span>
        </div>

        {/* Grid Viewport */}
        <div className="relative overflow-x-auto pb-2 custom-scrollbar">
          {/* Tooltip Popup */}
          {hoveredDay && (
            <div className="absolute top-0 right-2 z-20 font-poppins text-[11px] bg-[#231f1c] text-[#e0deda] border border-[#3d2c25] px-2.5 py-1 rounded-md shadow-lg pointer-events-none">
              {hoveredDay.score > 0
                ? `${hoveredDay.score} contribution${hoveredDay.score > 1 ? 's' : ''} on ${hoveredDay.formattedDate}`
                : `No contributions on ${hoveredDay.formattedDate}`}
            </div>
          )}

          <div className="inline-block min-w-full">
            {/* Month Header Row */}
            <div className="flex text-[11px] font-poppins text-[#C9C5D0]/60 mb-1.5 pl-8">
              {gridData.map((_, idx) => {
                const header = monthHeaders.find((h) => h.colIndex === idx)
                return (
                  <div key={idx} className="w-[14px] sm:w-[16px] text-center shrink-0">
                    {header ? header.month : ''}
                  </div>
                )
              })}
            </div>

            {/* Grid Days (7 Rows x N Weeks) */}
            <div className="flex items-start">
              {/* Day Labels */}
              <div className="flex flex-col gap-[3px] text-[10px] font-poppins text-[#C9C5D0]/60 pr-2 shrink-0 pt-0.5">
                <span className="h-[12px] sm:h-[14px]"></span>
                <span className="h-[12px] sm:h-[14px] leading-none">Mon</span>
                <span className="h-[12px] sm:h-[14px]"></span>
                <span className="h-[12px] sm:h-[14px] leading-none">Wed</span>
                <span className="h-[12px] sm:h-[14px]"></span>
                <span className="h-[12px] sm:h-[14px] leading-none">Fri</span>
                <span className="h-[12px] sm:h-[14px]"></span>
              </div>

              {/* Columns of Weeks */}
              <div className="flex gap-[3px]">
                {gridData.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="size-[11px] sm:size-[13px] rounded-[2px] cursor-pointer transition-transform hover:scale-125 border border-black/30"
                        style={{ backgroundColor: getContributionColor(day.score) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Legend */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-poppins text-[#C9C5D0]/60">
              <span>Learn how we count contributions</span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <span
                    key={lvl}
                    className="size-[11px] sm:size-[12px] rounded-[2px]"
                    style={{ backgroundColor: getContributionColor(lvl) }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Live Recent Commits ── */}
      {commits.length > 0 && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-poppins text-xs font-bold uppercase text-[#BF4A1A] tracking-wider flex items-center gap-2">
              <FiGitCommit /> Live Recent Commits
            </span>
            <span className="font-poppins text-[10px] uppercase tracking-widest text-[#C9C5D0]/50">
              Showing {commits.length} commits
            </span>
          </div>

          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
            {commits.map((commit, idx) => (
              <a
                key={`${commit.sha}-${idx}`}
                href={commit.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#BF4A1A]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="shrink-0 font-mono text-[10px] font-bold text-[#BF4A1A] bg-[#BF4A1A]/10 border border-[#BF4A1A]/20 px-2 py-0.5 rounded-md">
                    {commit.repo}
                  </span>
                  <span className="font-poppins text-xs text-[#F6F2FF] font-medium truncate group-hover:text-[#BF4A1A] transition-colors">
                    {commit.message}
                  </span>
                </div>
                <span className="shrink-0 font-poppins text-[10px] text-[#C9C5D0]/50 group-hover:text-[#C9C5D0]">
                  {commit.time}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GithubActivity
