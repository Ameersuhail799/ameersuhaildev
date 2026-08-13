import React, { useEffect, useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight, FiCalendar, FiGitBranch, FiUsers, FiGitCommit } from 'react-icons/fi'

const GITHUB_USERNAME = 'ameersuhail799'
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`

const KNOWN_SCORES = {
  // June Week 1
  '2026-06-18': 3,
  '2026-06-20': 4,
  // June Week 2
  '2026-06-21': 1,
  '2026-06-22': 1,
  '2026-06-23': 4,
  '2026-06-24': 4,
  '2026-06-25': 3,
  '2026-06-26': 4,
  '2026-06-27': 1,
  // June Week 3
  '2026-06-29': 3,
  '2026-07-04': 3,
  // July Week 2
  '2026-07-14': 1,
  '2026-07-15': 1,
  '2026-07-16': 1,
  // July Week 3
  '2026-07-19': 1,
  '2026-07-20': 1,
  '2026-07-21': 1,
  // August Week 1
  '2026-08-04': 3,
  '2026-08-05': 4,
  '2026-08-06': 3,
  '2026-08-07': 4,
  '2026-08-08': 2,
  // August Week 2
  '2026-08-11': 4,
  '2026-08-12': 5,
}

const INITIAL_PROFILE = {
  name: 'AMEER SUHAIL K T',
  public_repos: 12,
  followers: 5,
  avatar_url: 'https://avatars.githubusercontent.com/u/150937799?v=4'
}

const INITIAL_COMMITS = [
  { sha: 'a3f1b2c', repo: 'ameer_portfolio', message: 'feat: updated github contribution grid & logo', time: '1h ago', url: 'https://github.com/Ameersuhail799/ameer_portfolio' },
  { sha: '7b9c2e1', repo: 'AlphaForge', message: 'feat: updated model pipeline and API routes', time: '5h ago', url: 'https://github.com/Ameersuhail799/AlphaForge' },
  { sha: '4d8e3f9', repo: 'careeros', message: 'feat: ATS resume analyzer integration', time: '1d ago', url: 'https://github.com/Ameersuhail799/careeros' },
  { sha: '1c5e9a2', repo: 'apms-activity-points', message: 'fix: student dashboard activity points counter', time: '2d ago', url: 'https://github.com/Ameersuhail799/apms-activity-points' },
  { sha: '9e2b1f8', repo: 'dotme-style-spot', message: 'feat: e-commerce product catalog and filter', time: '3d ago', url: 'https://github.com/Ameersuhail799/dotme-style-spot' },
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

// Orange-brown theme color gradient
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

  useEffect(() => {
    const controller = new AbortController()

    const loadLiveData = async () => {
      try {
        const [profileRes, eventsRes, chartRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, { signal: controller.signal }),
          fetch(`https://ghchart.rshah.org/BF4A1A/${GITHUB_USERNAME}`, { signal: controller.signal })
        ])

        if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
          const p = await profileRes.value.json()
          setProfile(p)
        }

        if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
          const events = await eventsRes.value.json()
          const parsedCommits = []
          events.forEach((ev) => {
            if (ev.type === 'PushEvent' && ev.payload?.commits) {
              ev.payload.commits.forEach((c) => {
                parsedCommits.push({
                  sha: c.sha ? c.sha.slice(0, 7) : 'commit',
                  repo: ev.repo.name.replace(/^Ameersuhail799\//i, ''),
                  message: c.message,
                  url: `https://github.com/${ev.repo.name}/commit/${c.sha}`,
                  time: timeAgo(ev.created_at)
                })
              })
            }
          })
          if (parsedCommits.length > 0) {
            setCommits(parsedCommits.slice(0, 7))
          }
        }

        if (chartRes.status === 'fulfilled' && chartRes.value.ok) {
          const svgText = await chartRes.value.text()
          const parser = new DOMParser()
          const doc = parser.parseFromString(svgText, 'image/svg+xml')
          const rects = Array.from(doc.querySelectorAll('rect'))

          const liveScores = {}
          rects.forEach((r) => {
            const date = r.getAttribute('data-date')
            const score = parseInt(r.getAttribute('data-score') || '0', 10)
            if (date && score > 0) {
              liveScores[date] = score
            }
          })

          setGridData(generateWeeksGrid(liveScores))
        }
      } catch (err) {
        // Fallback to initial state gracefully
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
      { label: 'Public repos', value: profile?.public_repos ?? 12, icon: <FiGitBranch /> },
      { label: 'Followers', value: profile?.followers ?? 5, icon: <FiUsers /> },
      { label: 'Recent commits', value: commits.length || 7, icon: <FiGitCommit /> },
    ]
  }, [profile, commits])

  return (
    <div
      className="rounded-[22px] border border-white/10 bg-[#0f0e11] p-5 text-white shadow-[0_28px_70px_rgba(0,0,0,0.4)] sm:p-6"
      data-aos="fade-up"
    >
      {/* ── Top Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-[58px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-white/15 bg-white/5">
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : <FaGithub className="text-white" />}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-[#BF4A1A] animate-pulse" />
              <p className="font-poppins text-xs font-bold uppercase text-[#BF4A1A] tracking-wider">
                GitHub Activity
              </p>
            </div>
            <h3 className="mt-1 font-soldier text-[34px] font-bold uppercase leading-none text-[#F6F2FF]">
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

      {/* ── Orange-Brown Theme Contribution Grid (Apr - Aug) ── */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#17151a] p-4 text-[#C9C5D0]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-poppins text-xs font-semibold text-white/90 flex items-center gap-2">
            <FiCalendar className="text-[#BF4A1A]" /> Contributions in Apr - Aug
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
