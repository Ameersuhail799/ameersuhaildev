import React, { useEffect, useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight, FiCalendar, FiGitBranch, FiUsers, FiGitCommit } from 'react-icons/fi'

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
}

const INITIAL_PROFILE = {
  name: 'AMEER SUHAIL K T',
  public_repos: 11,
  followers: 5,
  avatar_url: 'https://avatars.githubusercontent.com/u/195453600?v=4'
}

const INITIAL_COMMITS = [
  { sha: 'a518bfb', repo: 'ameersuhaildev', message: 'chore: remove unused redundant backup images & clean repository', time: '1d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/a518bfb' },
  { sha: '61ec5fa', repo: 'ameersuhaildev', message: 'feat: add interactive floating liquid touch hint badge', time: '1d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/61ec5fa' },
  { sha: '5557dbb', repo: 'ameersuhaildev', message: 'feat: add bottom CTA banner to view all 20+ certificates on GitHub', time: '1d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/5557dbb' },
  { sha: 'ccbe031', repo: 'ameersuhaildev', message: 'fix: 1:1 image mask alignment in CognitionHero & mobile text wrap', time: '1d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/ccbe031' },
  { sha: 'c7c5307', repo: 'ameersuhaildev', message: 'style: increase mobile liquid touch radius to 150', time: '1d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/c7c5307' },
  { sha: '3460d3d', repo: 'ameersuhaildev', message: 'feat: update banner headline to Option 1 Modern AI-First Engineer', time: '1d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/3460d3d' },
  { sha: '3fe18c8', repo: 'ameersuhaildev', message: 'perf: pre-mount portfolio for zero transition lag', time: '1d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/3fe18c8' },
  { sha: '851d6e5', repo: 'ameersuhaildev', message: 'feat: complete portfolio updates, certificates integration & projects', time: '2d ago', url: 'https://github.com/Ameersuhail799/ameersuhaildev/commit/851d6e5' },
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

// Orange-brown theme color gradient (Theme-Aware empty cell)
const getContributionColor = (score) => {
  if (!score || score <= 0) return 'rgba(120, 120, 140, 0.18)'
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
            setCommits(parsedCommits.slice(0, 8))
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
      { label: 'Public repos', value: profile?.public_repos ?? 11, icon: <FiGitBranch /> },
      { label: 'Followers', value: profile?.followers ?? 5, icon: <FiUsers /> },
      { label: 'Recent commits', value: commits.length || 8, icon: <FiGitCommit /> },
    ]
  }, [profile, commits])

  return (
    <div
      className="github-activity rounded-[22px] border border-white/15 bg-[var(--bg-card)] p-5 text-[var(--text-primary)] shadow-[0_28px_70px_rgba(0,0,0,0.4)] sm:p-6"
      data-aos="fade-up"
    >
      {/* ── Top Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-[58px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-white/15 bg-white/5">
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : <FaGithub className="text-[var(--text-primary)]" />}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-coffee animate-pulse" />
              <p className="font-poppins text-xs font-bold uppercase text-coffee tracking-wider">
                GitHub Activity
              </p>
            </div>
            <h3 className="mt-1 font-soldier text-xl sm:text-2xl md:text-[34px] font-bold uppercase leading-tight text-[var(--text-primary)] break-words">
              {profile?.name || GITHUB_USERNAME}
            </h3>
          </div>
        </div>

        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noreferrer"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--text-primary)] transition hover:bg-coffee hover:text-white hover:border-coffee"
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
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3"
          >
            <span className="mb-2 flex size-7 items-center justify-center rounded-xl bg-coffee/20 text-coffee text-sm">
              {stat.icon}
            </span>
            <strong className="block font-poppins text-[20px] leading-none text-[var(--text-primary)]">{stat.value}</strong>
            <span className="mt-1 block font-poppins text-[11px] font-semibold text-[var(--text-secondary)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Orange-Brown Theme Contribution Grid (Apr - Aug) ── */}
      <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4 text-[var(--text-secondary)]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-poppins text-xs font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <FiCalendar className="text-coffee" /> Contributions in Apr - Aug
          </span>
          <span className="font-poppins text-[10px] text-coffee bg-coffee/10 border border-coffee/25 px-2.5 py-0.5 rounded-full">
            Realtime GitHub Sync
          </span>
        </div>

        {/* Grid Viewport */}
        <div className="relative overflow-x-auto pb-2 custom-scrollbar">
          {/* Tooltip Popup */}
          {hoveredDay && (
            <div className="absolute top-0 right-2 z-20 font-poppins text-[11px] bg-[var(--bg-card)] text-[var(--text-primary)] border border-white/15 px-2.5 py-1 rounded-md shadow-lg pointer-events-none">
              {hoveredDay.score > 0
                ? `${hoveredDay.score} contribution${hoveredDay.score > 1 ? 's' : ''} on ${hoveredDay.formattedDate}`
                : `No contributions on ${hoveredDay.formattedDate}`}
            </div>
          )}

          <div className="inline-block min-w-full">
            {/* Month Header Row */}
            <div className="flex text-[11px] font-poppins text-[var(--text-secondary)] mb-1.5 pl-8">
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
              <div className="flex flex-col gap-[3px] text-[10px] font-poppins text-[var(--text-secondary)] pr-2 shrink-0 pt-0.5">
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
                        className="size-[11px] sm:size-[13px] rounded-[2px] cursor-pointer transition-transform hover:scale-125 border border-black/15"
                        style={{ backgroundColor: getContributionColor(day.score) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Legend */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-poppins text-[var(--text-secondary)]">
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
        <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-poppins text-xs font-bold uppercase text-coffee tracking-wider flex items-center gap-2">
              <FiGitCommit /> Live Recent Commits
            </span>
            <span className="font-poppins text-[10px] uppercase tracking-widest text-[var(--text-secondary)] opacity-70">
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
                className="group flex items-center justify-between gap-3 p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-coffee/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="shrink-0 font-mono text-[10px] font-bold text-coffee bg-coffee/10 border border-coffee/20 px-2 py-0.5 rounded-md">
                    {commit.repo}
                  </span>
                  <span className="font-poppins text-xs text-[var(--text-primary)] font-medium truncate group-hover:text-coffee transition-colors">
                    {commit.message}
                  </span>
                </div>
                <span className="shrink-0 font-poppins text-[10px] text-[var(--text-secondary)] opacity-70 group-hover:opacity-100">
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
