import { useState } from 'react'
import {
  Search, Activity, TrendingUp, TrendingDown, Target,
  Eye, BarChart3, Bell, ChevronRight, Check, Clock,
  ArrowUpRight, MessageSquare, Quote, Plus, Filter, Sparkles
} from 'lucide-react'
import {
  platforms, competitors, monthlyTrend, queryCategories,
  recentQueries, nextActions
} from './data.js'

const navItems = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'queries', label: 'Queries', icon: Search },
  { id: 'competitors', label: 'Competitors', icon: Target },
  { id: 'actions', label: 'Actions', icon: Check },
]

function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <Sparkles size={18} />
        </div>
        <div className="brand-text">
          <div className="brand-name">Lumen</div>
          <div className="brand-sub">AI Visibility</div>
        </div>
      </div>

      <div className="client-card">
        <div className="client-avatar">AD</div>
        <div className="client-info">
          <div className="client-name">ABC Dental</div>
          <div className="client-meta">Austin, TX</div>
        </div>
      </div>

      <nav className="nav">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {isActive && <div className="nav-indicator" />}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="plan-card">
          <div className="plan-label">Current Plan</div>
          <div className="plan-name">Growth</div>
          <div className="plan-meta">$1,500 / month</div>
          <button className="plan-btn">Upgrade</button>
        </div>
      </div>
    </aside>
  )
}

function TopBar({ title, subtitle }) {
  return (
    <header className="topbar">
      <div>
        <h1 className="topbar-title">{title}</h1>
        <p className="topbar-sub">{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <div className="date-pill">
          <Clock size={14} />
          <span>Aug 2026 Report</span>
        </div>
        <button className="icon-btn">
          <Bell size={18} />
          <span className="notif-dot" />
        </button>
        <button className="primary-btn">
          <Plus size={16} />
          New Query
        </button>
      </div>
    </header>
  )
}

function ScoreCard({ label, value, unit, delta, positive, icon: Icon, accent }) {
  return (
    <div className="score-card">
      <div className="score-card-top">
        <div className={`score-icon ${accent}`}>
          <Icon size={18} />
        </div>
        <div className={`score-delta ${positive ? 'pos' : 'neg'}`}>
          {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {delta}
        </div>
      </div>
      <div className="score-value">
        {value}<span className="score-unit">{unit}</span>
      </div>
      <div className="score-label">{label}</div>
    </div>
  )
}

function VisibilityGauge({ score }) {
  const radius = 52
  const circ = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ
  return (
    <div className="gauge-wrap">
      <svg className="gauge" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} className="gauge-bg" strokeWidth="10" fill="none" />
        <circle
          cx="60" cy="60" r={radius}
          className="gauge-fg"
          strokeWidth="10" fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="gauge-center">
        <div className="gauge-score">{score}</div>
        <div className="gauge-unit">/ 100</div>
      </div>
    </div>
  )
}

function PlatformBars() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Platform Visibility</h3>
        <span className="card-badge">4 platforms</span>
      </div>
      <div className="platform-list">
        {platforms.map(p => (
          <div key={p.id} className="platform-row">
            <div className="platform-info">
              <span className="platform-dot" style={{ background: p.color }} />
              <span className="platform-name">{p.label}</span>
            </div>
            <div className="platform-bar-wrap">
              <div className="platform-bar" style={{
                width: `${p.score}%`,
                background: `linear-gradient(90deg, ${p.color}aa, ${p.color})`
              }} />
            </div>
            <span className="platform-score">{p.score}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrendChart() {
  const maxScore = 100
  const w = 520
  const h = 200
  const pad = { top: 20, right: 20, bottom: 30, left: 30 }
  const innerW = w - pad.left - pad.right
  const innerH = h - pad.top - pad.bottom

  const points = monthlyTrend.map((d, i) => ({
    x: pad.left + (i / (monthlyTrend.length - 1)) * innerW,
    y: pad.top + innerH - (d.score / maxScore) * innerH,
    score: d.score,
    month: d.month,
  }))

  const linePath = points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ')

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${pad.top + innerH} L ${points[0].x} ${pad.top + innerH} Z`

  return (
    <div className="card trend-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Visibility Trend</h3>
          <p className="card-sub">Monthly AI Visibility Score over 8 months</p>
        </div>
        <div className="trend-stat">
          <ArrowUpRight size={16} />
          <span>+54 pts since Jan</span>
        </div>
      </div>
      <svg className="trend-chart" viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f74f0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2f74f0" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map(v => {
          const y = pad.top + innerH - (v / maxScore) * innerH
          return (
            <g key={v}>
              <line x1={pad.left} y1={y} x2={w - pad.right} y2={y}
                className="grid-line" />
              <text x={pad.left - 8} y={y + 4} className="axis-text">{v}</text>
            </g>
          )
        })}
        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} className="trend-line" fill="none"
          stroke="#2f74f0" strokeWidth="2.5" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" className="trend-dot" fill="#fff"
              stroke="#2f74f0" strokeWidth="2.5" />
            <text x={p.x} y={h - 10} className="axis-text"
              textAnchor="middle">{p.month}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function CompetitorList() {
  const sorted = [...competitors].sort((a, b) => b.score - a.score)
  const maxScore = Math.max(...sorted.map(c => c.score))
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Competitor Ranking</h3>
        <span className="card-badge">{sorted.length} tracked</span>
      </div>
      <div className="competitor-list">
        {sorted.map((c, idx) => (
          <div key={c.name} className={`competitor-row ${c.isClient ? 'is-client' : ''}`}>
            <div className="rank-num">{idx + 1}</div>
            <div className="competitor-main">
              <div className="competitor-name">
                {c.name}
                {c.isClient && <span className="you-tag">You</span>}
              </div>
              <div className="competitor-bar-wrap">
                <div className="competitor-bar" style={{
                  width: `${(c.score / maxScore) * 100}%`,
                  background: c.isClient
                    ? 'linear-gradient(90deg, #2f74f0, #1a56d6)'
                    : 'linear-gradient(90deg, #e2e6ed, #c9cfd9)'
                }} />
              </div>
            </div>
            <div className="competitor-score">{c.score}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QueryCategoryTable() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Query Categories</h3>
        <button className="ghost-btn">
          <Filter size={14} />
          Filter
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Category</th>
            <th className="num">Tracked</th>
            <th className="num">Mentioned</th>
            <th className="num">Mention Rate</th>
            <th className="num">Trend</th>
          </tr>
        </thead>
        <tbody>
          {queryCategories.map(c => {
            const rate = Math.round((c.mentioned / c.tracked) * 100)
            return (
              <tr key={c.category}>
                <td className="cat-cell">{c.category}</td>
                <td className="num">{c.tracked}</td>
                <td className="num">{c.mentioned}</td>
                <td className="num">
                  <div className="rate-cell">
                    <div className="rate-bar-wrap">
                      <div className="rate-bar" style={{ width: `${rate}%` }} />
                    </div>
                    <span>{rate}%</span>
                  </div>
                </td>
                <td className="num">
                  <span className="delta-pill pos">{c.delta}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function QueryFeed() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Query Results</h3>
        <span className="card-badge">{recentQueries.length} queries</span>
      </div>
      <div className="query-list">
        {recentQueries.map(q => (
          <div key={q.id} className="query-row">
            <div className={`query-status ${q.mentioned ? 'mentioned' : 'not-mentioned'}`}>
              {q.mentioned ? <MessageSquare size={14} /> : <Eye size={14} />}
            </div>
            <div className="query-main">
              <div className="query-question">"{q.question}"</div>
              <div className="query-meta">
                <span className="platform-tag">{q.platform}</span>
                {q.mentioned && (
                  <>
                    <span className="meta-tag mention">Mentioned</span>
                    {q.citation && <span className="meta-tag citation">
                      <Quote size={11} /> Cited
                    </span>}
                  </>
                )}
                {!q.mentioned && <span className="meta-tag missed">Not mentioned</span>}
              </div>
            </div>
            <ChevronRight size={16} className="query-arrow" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ActionsList() {
  const priorityColors = {
    high: 'var(--c-error-500)',
    medium: 'var(--c-warning-500)',
    low: 'var(--c-neutral-400)',
  }
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Next Month's Actions</h3>
        <span className="card-badge">{nextActions.length} tasks</span>
      </div>
      <div className="actions-list">
        {nextActions.map(a => (
          <div key={a.id} className="action-row">
            <div className="action-check">
              {a.status === 'in-progress' ? (
                <Clock size={16} />
              ) : (
                <div className="check-empty" />
              )}
            </div>
            <div className="action-main">
              <div className="action-task">{a.task}</div>
              <div className="action-meta">
                <span className="priority-dot" style={{ color: priorityColors[a.priority] }}>
                  {a.priority}
                </span>
                <span className="status-tag">{a.status.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OverviewView() {
  return (
    <>
      <div className="score-row">
        <ScoreCard label="AI Visibility Score" value="72" unit="/100" delta="+12%" positive icon={Eye} accent="primary" />
        <ScoreCard label="Mention Rate" value="72" unit="/100" delta="+11%" positive icon={MessageSquare} accent="accent" />
        <ScoreCard label="Citation Rate" value="54" unit="/100" delta="+8%" positive icon={Quote} accent="warning" />
        <ScoreCard label="Queries Tracked" value="100" unit="" delta="+25" positive icon={Search} accent="neutral" />
      </div>

      <div className="grid-2">
        <div className="card gauge-card">
          <div className="card-header">
            <h3 className="card-title">Overall Visibility</h3>
            <span className="card-badge badge-pos">+12% MoM</span>
          </div>
          <VisibilityGauge score={72} />
          <div className="gauge-summary">
            <div className="gauge-stat">
              <span className="gauge-stat-val">72</span>
              <span className="gauge-stat-lbl">Mentions</span>
            </div>
            <div className="gauge-divider" />
            <div className="gauge-stat">
              <span className="gauge-stat-val">54</span>
              <span className="gauge-stat-lbl">Citations</span>
            </div>
            <div className="gauge-divider" />
            <div className="gauge-stat">
              <span className="gauge-stat-val">81</span>
              <span className="gauge-stat-lbl">Top Comp.</span>
            </div>
          </div>
        </div>
        <PlatformBars />
      </div>

      <TrendChart />

      <div className="grid-2">
        <CompetitorList />
        <QueryCategoryTable />
      </div>

      <div className="grid-2">
        <QueryFeed />
        <ActionsList />
      </div>
    </>
  )
}

function QueriesView() {
  return (
    <>
      <QueryCategoryTable />
      <QueryFeed />
    </>
  )
}

function CompetitorsView() {
  return (
    <>
      <CompetitorList />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Competitor Comparison</h3>
          <span className="card-badge">Last 30 days</span>
        </div>
        <div className="comp-comparison">
          {competitors.sort((a, b) => b.score - a.score).map(c => (
            <div key={c.name} className={`comp-card ${c.isClient ? 'is-client' : ''}`}>
              <div className="comp-card-name">{c.name}</div>
              <div className="comp-card-score">{c.score}</div>
              <div className="comp-card-bar">
                <div className="comp-card-fill" style={{
                  width: `${c.score}%`,
                  background: c.isClient
                    ? 'linear-gradient(90deg, #2f74f0, #1a56d6)'
                    : 'linear-gradient(90deg, #9aa3b2, #6b7280)'
                }} />
              </div>
              {c.isClient && <div className="comp-card-tag">Your client</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function ActionsView() {
  return (
    <>
      <ActionsList />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Improvements</h3>
          <span className="card-badge badge-pos">3 completed</span>
        </div>
        <div className="improvements">
          <div className="imp-row">
            <div className="imp-icon done"><Check size={16} /></div>
            <div className="imp-text">
              <div className="imp-title">Implant content page rewritten</div>
              <div className="imp-sub">Mentions for implant queries rose from 5 to 17</div>
            </div>
            <span className="delta-pill pos">+12 mentions</span>
          </div>
          <div className="imp-row">
            <div className="imp-icon done"><Check size={16} /></div>
            <div className="imp-text">
              <div className="imp-title">Doctor bio pages expanded</div>
              <div className="imp-sub">Added credentials, experience, and specialty details</div>
            </div>
            <span className="delta-pill pos">+6 mentions</span>
          </div>
          <div className="imp-row">
            <div className="imp-icon done"><Check size={16} /></div>
            <div className="imp-text">
              <div className="imp-title">Google Business Profile updated</div>
              <div className="imp-sub">Consistent NAP data across 3 major directories</div>
            </div>
            <span className="delta-pill pos">+4 mentions</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const [active, setActive] = useState('overview')

  const titles = {
    overview: { title: 'Dashboard Overview', subtitle: 'ABC Dental — AI Search Visibility Report for August 2026' },
    queries: { title: 'Query Tracking', subtitle: 'Monitor how AI systems mention your business across tracked queries' },
    competitors: { title: 'Competitor Analysis', subtitle: 'Compare your AI visibility against tracked competitors' },
    actions: { title: 'Action Plan', subtitle: 'Tasks and improvements to grow your AI search visibility' },
  }

  const t = titles[active]

  return (
    <div className="app">
      <Sidebar active={active} setActive={setActive} />
      <main className="main">
        <TopBar title={t.title} subtitle={t.subtitle} />
        <div className="content">
          {active === 'overview' && <OverviewView />}
          {active === 'queries' && <QueriesView />}
          {active === 'competitors' && <CompetitorsView />}
          {active === 'actions' && <ActionsView />}
        </div>
      </main>
    </div>
  )
}
