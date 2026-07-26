import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

type ViewKey = 'system' | 'cli' | 'neural' | 'homelab'
type ProjectType = 'all' | 'product' | 'library' | 'experiment'

const views: { key: ViewKey; label: string; code: string }[] = [
  { key: 'system', label: 'System map', code: 'SYS' },
  { key: 'cli', label: 'Terminal', code: 'CLI' },
  { key: 'neural', label: 'Neural core', code: 'AI' },
  { key: 'homelab', label: 'Homelab', code: 'NET' },
]

const projectData = [
  {
    name: 'New Tab',
    type: 'product' as const,
    description: 'A focused Chrome start screen that turns a blank tab into a useful workspace.',
    stack: ['TypeScript', 'React', 'Extension API'],
    href: 'https://github.com/yaowang908/chrome-extension-newtab',
    signal: 'browser / productivity',
  },
  {
    name: 'Time Zone Organizer',
    type: 'product' as const,
    description: 'A visual way to coordinate people and working hours across time zones.',
    stack: ['React', 'DateTime', 'UX'],
    href: 'https://github.com/yaowang908/time-zone-organizer',
    signal: 'time / coordination',
  },
  {
    name: 'React Adaptable Carousel',
    type: 'library' as const,
    description: 'A reusable carousel engineered for responsive content and flexible layouts.',
    stack: ['React', 'Library', 'Responsive'],
    href: 'https://github.com/yaowang908/react-adaptable-carousel',
    signal: 'ui / package',
  },
  {
    name: '2048',
    type: 'experiment' as const,
    description: 'The classic grid puzzle rebuilt as a compact interaction and state-management study.',
    stack: ['JavaScript', 'Game logic', 'CSS'],
    href: 'https://github.com/yaowang908/2048',
    signal: 'logic / interaction',
  },
]

const commandResponses: Record<string, string> = {
  help: 'Available: about, projects, stack, contact, clear',
  about: 'Yao is a full-stack architect who connects product UI, automation, AI, and infrastructure.',
  projects: '4 selected builds mounted below. Scroll to /work or run `stack`.',
  stack: 'TypeScript · React · Node.js · Cloudflare · Docker · Tailscale · AI orchestration',
  contact: 'Opening a channel: github.com/yaowang908',
}

function Home() {
  const [activeView, setActiveView] = useState<ViewKey>('system')
  const [projectType, setProjectType] = useState<ProjectType>('all')
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<string[]>([
    'boot sequence complete',
    'portfolio graph mounted at /yao',
    'type `help` to inspect available commands',
  ])
  const [assistantNote, setAssistantNote] = useState(
    'This portfolio is structured like Yao works: product decisions stay connected to the systems that support them.'
  )
  const terminalEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Yao Wang — Full-Stack Architect'
  }, [])

  useEffect(() => {
    terminalEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [history])

  const filteredProjects = useMemo(
    () =>
      projectType === 'all'
        ? projectData
        : projectData.filter((project) => project.type === projectType),
    [projectType]
  )

  const submitCommand = (event: FormEvent) => {
    event.preventDefault()
    const normalized = command.trim().toLowerCase()
    if (!normalized) return
    if (normalized === 'clear') {
      setHistory([])
    } else {
      setHistory((current) => [
        ...current,
        `$ ${command}`,
        commandResponses[normalized] ?? `command not found: ${normalized}. Try \`help\`.`,
      ])
    }
    setCommand('')
  }

  return (
    <main className='portfolio-shell'>
      <header className='topbar'>
        <a className='identity' href='#top' aria-label='Yao Wang, home'>
          <span className='identity-mark'>YW</span>
          <span>
            <strong>Yao Wang</strong>
            <small>Full-Stack Architect</small>
          </span>
        </a>
        <nav className='topnav' aria-label='Primary navigation'>
          <a href='#work'>Work</a>
          <a href='#systems'>Systems</a>
          <a href='#about'>About</a>
        </nav>
        <a className='availability' href='mailto:yaowang831@gmail.com'>
          <span className='pulse-dot' /> Open to signals
        </a>
      </header>

      <section className='hero' id='top'>
        <div className='hero-copy'>
          <p className='eyebrow'><span>~/yao/portfolio</span> main · operational</p>
          <h1>I build the systems <em>behind</em> the interface.</h1>
          <p className='hero-lede'>
            Full-stack architect working across product engineering, automation,
            AI orchestration, and the infrastructure that keeps it all running.
          </p>
          <div className='hero-actions'>
            <a className='primary-action' href='#work'>Inspect selected work <span>↘</span></a>
            <a className='text-action' href='https://github.com/yaowang908'>GitHub ↗</a>
          </div>
          <dl className='signal-strip' aria-label='Areas of expertise'>
            <div><dt>FOCUS</dt><dd>Product systems</dd></div>
            <div><dt>MODE</dt><dd>Build + automate</dd></div>
            <div><dt>UPTIME</dt><dd>Always learning</dd></div>
          </dl>
        </div>

        <div className='atlas-window' aria-label='Interactive architecture atlas'>
          <div className='window-bar'>
            <div className='window-dots' aria-hidden='true'><i /><i /><i /></div>
            <span>architecture.atlas</span>
            <span className='window-status'>LIVE</span>
          </div>
          <div className='atlas-body'>
            <div className='atlas-rail' role='tablist' aria-label='Architecture view'>
              {views.map((view) => (
                <button
                  key={view.key}
                  role='tab'
                  aria-selected={activeView === view.key}
                  className={activeView === view.key ? 'active' : ''}
                  onClick={() => setActiveView(view.key)}
                >
                  <b>{view.code}</b><span>{view.label}</span>
                </button>
              ))}
            </div>
            <div className={`system-map map-${activeView}`}>
              <div className='map-meta'>
                <span>VIEW / {activeView.toUpperCase()}</span>
                <span>04 NODES · 05 LINKS</span>
              </div>
              <div className='connector line-a' />
              <div className='connector line-b' />
              <div className='connector line-c' />
              <div className='connector line-d' />
              <button className='map-node node-product' onClick={() => setAssistantNote('Product is the entry point: clear interaction, useful constraints, and fast feedback.')}>
                <small>01 / interface</small><strong>Product</strong><span>React · TypeScript</span>
              </button>
              <button className='map-node node-core' onClick={() => setAssistantNote('The orchestration core connects user intent to tools, services, and observable outcomes.')}>
                <span className='core-orbit' /><small>02 / orchestration</small><strong>Core</strong><span>Node · Workers · AI</span>
              </button>
              <button className='map-node node-automation' onClick={() => setAssistantNote('Automation removes repetitive operations while preserving an intentional control surface.')}>
                <small>03 / workflow</small><strong>Automate</strong><span>Events · Agents</span>
              </button>
              <button className='map-node node-infra' onClick={() => setAssistantNote('Infrastructure is treated as a product: legible, resilient, and designed to be operated.')}>
                <small>04 / infrastructure</small><strong>Operate</strong><span>Docker · Tailscale</span>
              </button>
              <div className='map-caption'>
                <span className='pulse-dot' /> Select a node to query the architecture
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='console-section' aria-label='System console and neural assistant'>
        <div className='terminal-panel'>
          <div className='panel-label'><span>Terminal</span><small>zsh — 80×24</small></div>
          <div className='terminal-history' aria-live='polite'>
            {history.map((line, index) => (
              <div className={line.startsWith('$') ? 'terminal-command' : ''} key={`${line}-${index}`}>
                {line}
              </div>
            ))}
            <div ref={terminalEnd} />
          </div>
          <form className='command-line' onSubmit={submitCommand}>
            <label htmlFor='command-input'>yao@atlas <span>~</span> %</label>
            <input
              id='command-input'
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder='type a command…'
              autoComplete='off'
            />
          </form>
        </div>
        <aside className='assistant-panel'>
          <div className='panel-label'><span>Neural assistant</span><small>CONTEXT ONLINE</small></div>
          <div className='assistant-message'>
            <span className='assistant-symbol'>✦</span>
            <p>{assistantNote}</p>
          </div>
          <div className='prompt-list'>
            <span>Suggested queries</span>
            {[
              ['Why full-stack?', 'Full-stack means owning the seams: not every layer at once, but every handoff that shapes the outcome.'],
              ['What drives the work?', 'Curiosity, leverage, and the satisfaction of turning a complex system into something people can understand.'],
              ['Best collaboration mode?', 'Small loops, visible decisions, working software, and direct conversations with the people using it.'],
            ].map(([label, response]) => (
              <button key={label} onClick={() => setAssistantNote(response)}>{label}<span>↗</span></button>
            ))}
          </div>
        </aside>
      </section>

      <section className='work-section' id='work'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>/selected_work</p>
            <h2>Built to be used,<br />not just shipped.</h2>
          </div>
          <p>A selection of products, reusable tools, and experiments that turn technical possibility into practical utility.</p>
        </div>
        <div className='filter-row' aria-label='Filter projects'>
          {(['all', 'product', 'library', 'experiment'] as ProjectType[]).map((type) => (
            <button
              key={type}
              className={projectType === type ? 'active' : ''}
              onClick={() => setProjectType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className='project-grid'>
          {filteredProjects.map((project, index) => (
            <a className='project-card' href={project.href} key={project.name}>
              <div className='project-index'>0{index + 1}</div>
              <div className='project-signal'><span className='pulse-dot' /> {project.signal}</div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className='project-stack'>
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className='card-action'>View repository <span>↗</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className='systems-section' id='systems'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>/network_topology</p>
            <h2>Homegrown infrastructure.</h2>
          </div>
          <p>The homelab is where software meets the physical world: a living testbed for networking, self-hosting, observability, and resilient systems.</p>
        </div>
        <div className='network-board'>
          <div className='network-header'>
            <span>TAILNET / HOME-OPS</span>
            <span><i className='pulse-dot' /> 6 DEVICES ONLINE</span>
          </div>
          <div className='network-grid'>
            <div className='net-line net-line-1' /><div className='net-line net-line-2' />
            <div className='net-line net-line-3' /><div className='net-line net-line-4' />
            {[
              ['gateway', '100.64.0.1', 'edge'],
              ['atlas', '100.64.0.8', 'compute'],
              ['vault', '100.64.0.12', 'storage'],
              ['forge', '100.64.0.21', 'ci / build'],
              ['watch', '100.64.0.34', 'observe'],
              ['remote', '100.64.0.55', 'access'],
            ].map(([name, ip, role]) => (
              <div className={`network-node node-${name}`} key={name}>
                <i /><div><strong>{name}</strong><span>{role}</span></div><code>{ip}</code>
              </div>
            ))}
          </div>
          <div className='network-footer'>
            <span>Encrypted mesh · MagicDNS · ACL policy active</span>
            <span>latency 12ms</span>
          </div>
        </div>
      </section>

      <section className='about-section' id='about'>
        <p className='eyebrow'>/operator_note</p>
        <blockquote>“The best systems feel obvious on the surface because someone cared deeply about what happens underneath.”</blockquote>
        <div className='about-meta'>
          <p>I move comfortably between interface details and architecture diagrams, looking for the simplest reliable path from idea to operation.</p>
          <a href='mailto:yaowang831@gmail.com'>Start a conversation <span>↗</span></a>
        </div>
      </section>

      <footer className='site-footer'>
        <div><span className='identity-mark'>YW</span><strong>Designing across the stack.</strong></div>
        <div className='footer-links'>
          <a href='https://github.com/yaowang908'>GitHub</a>
          <a href='mailto:yaowang831@gmail.com'>Email</a>
          <a href='#top'>Back to top ↑</a>
        </div>
        <small>© {new Date().getFullYear()} Yao Wang · BUILT WITH INTENT</small>
      </footer>
    </main>
  )
}
