import {
  Children,
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createFileRoute } from '@tanstack/react-router'
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Close from '@mui/icons-material/Close'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExtensionOutlined from '@mui/icons-material/ExtensionOutlined'
import GitHub from '@mui/icons-material/GitHub'
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined'
import Menu from '@mui/icons-material/Menu'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import PersonOutline from '@mui/icons-material/PersonOutline'
import Search from '@mui/icons-material/Search'
import SettingsOutlined from '@mui/icons-material/SettingsOutlined'
import VerticalSplit from '@mui/icons-material/VerticalSplit'

export const Route = createFileRoute('/')({
  component: Home,
})

type FileId =
  | 'about.tsx'
  | 'projects.json'
  | 'skills.css'
  | 'homelab.yaml'
  | 'contact.md'

type FileMeta = {
  id: FileId
  kind: string
  language: string
  path: string
  lines: number
}

const files: FileMeta[] = [
  { id: 'about.tsx', kind: 'TS', language: 'TypeScript React', path: 'src/about.tsx', lines: 19 },
  { id: 'projects.json', kind: '{}', language: 'JSON', path: 'data/projects.json', lines: 31 },
  { id: 'skills.css', kind: '#', language: 'CSS', path: 'src/skills.css', lines: 12 },
  { id: 'homelab.yaml', kind: 'Y', language: 'YAML', path: 'ops/homelab.yaml', lines: 13 },
  { id: 'contact.md', kind: 'M', language: 'Markdown', path: 'docs/contact.md', lines: 12 },
]

const fileById = Object.fromEntries(files.map((file) => [file.id, file])) as Record<FileId, FileMeta>

const terminalHelp = 'Commands: help, open <file>, projects, contact, clear'

function Home() {
  const [activeFile, setActiveFile] = useState<FileId>('about.tsx')
  const [openTabs, setOpenTabs] = useState<FileId[]>(['about.tsx', 'projects.json'])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [command, setCommand] = useState('')
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Portfolio workspace loaded.',
    terminalHelp,
  ])
  const paletteInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.title = 'Yao Wang — portfolio.code-workspace'

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((current) => !current)
      }
      if (event.key === 'Escape') setPaletteOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (paletteOpen) paletteInput.current?.focus()
  }, [paletteOpen])

  const openFile = (file: FileId) => {
    setActiveFile(file)
    setOpenTabs((tabs) => (tabs.includes(file) ? tabs : [...tabs, file]))
    setPaletteOpen(false)
    setPaletteQuery('')
  }

  const closeTab = (file: FileId) => {
    setOpenTabs((tabs) => {
      if (tabs.length === 1) return tabs
      const index = tabs.indexOf(file)
      const next = tabs.filter((tab) => tab !== file)
      if (activeFile === file) setActiveFile(next[Math.max(0, index - 1)])
      return next
    })
  }

  const filteredFiles = useMemo(() => {
    const query = paletteQuery.trim().toLowerCase()
    return query
      ? files.filter((file) => `${file.id} ${file.path}`.toLowerCase().includes(query))
      : files
  }, [paletteQuery])

  const submitCommand = (event: FormEvent) => {
    event.preventDefault()
    const input = command.trim()
    if (!input) return

    const [verb, target = ''] = input.toLowerCase().split(/\s+/, 2)
    let output = ''

    if (verb === 'clear') {
      setTerminalLines([])
      setCommand('')
      return
    }

    if (verb === 'help') {
      output = terminalHelp
    } else if (verb === 'projects') {
      openFile('projects.json')
      output = 'Opened data/projects.json'
    } else if (verb === 'contact') {
      openFile('contact.md')
      output = 'Opened docs/contact.md'
    } else if (verb === 'open') {
      const match = files.find(
        (file) => file.id === target || file.id.startsWith(target) || file.path.includes(target)
      )
      if (match) {
        openFile(match.id)
        output = `Opened ${match.path}`
      } else {
        output = `No file matches "${target}".`
      }
    } else {
      output = `Command not found: ${verb}. Run "help".`
    }

    setTerminalLines((lines) => [...lines, `yao@portfolio % ${input}`, output])
    setCommand('')
  }

  return (
    <main className='workspace'>
      <header className='titlebar'>
        <button
          className='titlebar-menu'
          aria-label={sidebarOpen ? 'Hide Explorer' : 'Show Explorer'}
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <Menu />
        </button>
        <span className='titlebar-name'>portfolio.code-workspace</span>
        <button className='command-trigger' onClick={() => setPaletteOpen(true)}>
          <Search />
          <span>Search files</span>
          <kbd>⌘ K</kbd>
        </button>
        <span className='titlebar-owner'>Yao Wang</span>
      </header>

      <div className='workbench'>
        <nav className='activity-bar' aria-label='Workspace tools'>
          <div className='activity-primary'>
            <button
              className={sidebarOpen ? 'active' : ''}
              aria-label='Explorer'
              title='Explorer'
              onClick={() => setSidebarOpen((open) => !open)}
            >
              <InsertDriveFileOutlined />
            </button>
            <button aria-label='Search files' title='Search files' onClick={() => setPaletteOpen(true)}>
              <Search />
            </button>
            <a
              href='https://github.com/yaowang908'
              aria-label='View source control on GitHub'
              title='Source control'
            >
              <AccountTreeOutlined />
            </a>
            <button aria-label='Open skills file' title='Skills' onClick={() => openFile('skills.css')}>
              <ExtensionOutlined />
            </button>
          </div>
          <div className='activity-secondary'>
            <button aria-label='Open contact file' title='Contact' onClick={() => openFile('contact.md')}>
              <PersonOutline />
            </button>
            <button aria-label='Workspace settings' title='Workspace settings' onClick={() => openFile('about.tsx')}>
              <SettingsOutlined />
            </button>
          </div>
        </nav>

        <aside className={`explorer ${sidebarOpen ? 'open' : ''}`} aria-label='Explorer'>
          <div className='pane-title'>
            <span>Explorer</span>
            <MoreHoriz aria-hidden='true' />
          </div>
          <ExplorerGroup label='Open editors' expanded>
            {openTabs.map((file) => (
              <ExplorerFile
                key={file}
                file={fileById[file]}
                active={activeFile === file}
                onClick={() => openFile(file)}
              />
            ))}
          </ExplorerGroup>
          <ExplorerGroup label='Portfolio' expanded>
            {files.map((file) => (
              <ExplorerFile
                key={file.id}
                file={file}
                active={activeFile === file.id}
                onClick={() => openFile(file.id)}
              />
            ))}
          </ExplorerGroup>
          <div className='outline-block'>
            <div className='group-heading'><ChevronRight /><span>Outline</span></div>
            <div className='group-heading'><ChevronRight /><span>Timeline</span></div>
          </div>
        </aside>

        <section className='editor-area' aria-label='Editor'>
          <div className='tab-strip' role='tablist' aria-label='Open files'>
            <div className='tabs-scroll'>
              {openTabs.map((file) => (
                <button
                  key={file}
                  role='tab'
                  aria-selected={activeFile === file}
                  className={`editor-tab ${activeFile === file ? 'active' : ''}`}
                  onClick={() => openFile(file)}
                >
                  <FileKind kind={fileById[file].kind} />
                  <span>{file}</span>
                  <Close
                    className='tab-close'
                    onClick={(event) => {
                      event.stopPropagation()
                      closeTab(file)
                    }}
                  />
                </button>
              ))}
            </div>
            <div className='editor-actions'>
              <button aria-label='Split editor' title='Split editor'><VerticalSplit /></button>
              <button aria-label='More editor actions' title='More actions'><MoreHoriz /></button>
            </div>
          </div>

          <div className='breadcrumbs'>
            <span>portfolio</span><ChevronRight />
            <span>{fileById[activeFile].path.split('/')[0]}</span><ChevronRight />
            <strong>{activeFile}</strong>
          </div>

          <div className='editor-document' key={activeFile}>
            <FileDocument file={activeFile} />
          </div>

          <section className={`terminal-dock ${terminalOpen ? 'open' : ''}`} aria-label='Terminal panel'>
            <div className='terminal-tabs'>
              <button onClick={() => setTerminalOpen((open) => !open)}>Problems</button>
              <button onClick={() => setTerminalOpen((open) => !open)}>Output</button>
              <button className='active' onClick={() => setTerminalOpen((open) => !open)}>Terminal</button>
              <span className='terminal-spacer' />
              <button
                className='terminal-toggle'
                aria-label={terminalOpen ? 'Collapse terminal' : 'Expand terminal'}
                onClick={() => setTerminalOpen((open) => !open)}
              >
                {terminalOpen ? '−' : '+'}
              </button>
            </div>
            {terminalOpen && (
              <div className='terminal-content'>
                <div className='terminal-output' aria-live='polite'>
                  {terminalLines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
                </div>
                <form className='terminal-input' onSubmit={submitCommand}>
                  <label htmlFor='terminal-command'>yao@portfolio %</label>
                  <input
                    id='terminal-command'
                    value={command}
                    onChange={(event) => setCommand(event.target.value)}
                    autoComplete='off'
                    spellCheck={false}
                    aria-label='Terminal command'
                  />
                </form>
              </div>
            )}
          </section>
        </section>
      </div>

      <footer className='statusbar'>
        <a href='https://github.com/yaowang908/yaowang908.github.io' className='status-branch'>
          <AccountTreeOutlined />
          <span>codex/multi-aesthetic-redesign</span>
        </a>
        <span className='status-check'>0 errors</span>
        <span className='status-spacer' />
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>{fileById[activeFile].language}</span>
        <a href='https://github.com/yaowang908' aria-label='Yao Wang on GitHub'><GitHub /></a>
      </footer>

      {paletteOpen && (
        <div className='palette-backdrop' onMouseDown={() => setPaletteOpen(false)}>
          <section className='command-palette' aria-label='Search files' onMouseDown={(event) => event.stopPropagation()}>
            <div className='palette-input'>
              <Search />
              <input
                ref={paletteInput}
                value={paletteQuery}
                onChange={(event) => setPaletteQuery(event.target.value)}
                placeholder='Search files by name'
                aria-label='Search files by name'
              />
              <kbd>Esc</kbd>
            </div>
            <div className='palette-results'>
              {filteredFiles.map((file, index) => (
                <button
                  key={file.id}
                  className={index === 0 ? 'selected' : ''}
                  onClick={() => openFile(file.id)}
                >
                  <FileKind kind={file.kind} />
                  <span><strong>{file.id}</strong><small>{file.path}</small></span>
                </button>
              ))}
              {filteredFiles.length === 0 && <p>No matching files.</p>}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

function ExplorerGroup({
  label,
  expanded,
  children,
}: {
  label: string
  expanded?: boolean
  children: ReactNode
}) {
  return (
    <section className='explorer-group'>
      <div className='group-heading'>
        {expanded ? <ExpandMore /> : <ChevronRight />}
        <span>{label}</span>
      </div>
      {expanded && <div>{children}</div>}
    </section>
  )
}

function ExplorerFile({
  file,
  active,
  onClick,
}: {
  file: FileMeta
  active: boolean
  onClick: () => void
}) {
  return (
    <button className={`explorer-file ${active ? 'active' : ''}`} onClick={onClick}>
      <FileKind kind={file.kind} />
      <span>{file.id}</span>
    </button>
  )
}

function FileKind({ kind }: { kind: string }) {
  const className = kind === '{}' ? 'json' : kind.toLowerCase()
  return <span className={`file-kind kind-${className}`}>{kind}</span>
}

function CodeLines({ children }: { children: ReactNode }) {
  const lines = Children.toArray(children)
  return (
    <div className='code-lines'>
      {lines.map((line, index) => (
        <div className='code-line' key={index}>
          <span className='line-number'>{index + 1}</span>
          <code>{line || ' '}</code>
        </div>
      ))}
    </div>
  )
}

const t = {
  keyword: (value: string) => <span className='syntax-keyword'>{value}</span>,
  variable: (value: string) => <span className='syntax-variable'>{value}</span>,
  string: (value: string) => <span className='syntax-string'>{value}</span>,
  property: (value: string) => <span className='syntax-property'>{value}</span>,
  comment: (value: string) => <span className='syntax-comment'>{value}</span>,
  number: (value: string) => <span className='syntax-number'>{value}</span>,
}

function FileDocument({ file }: { file: FileId }) {
  if (file === 'projects.json') return <ProjectsDocument />
  if (file === 'skills.css') return <SkillsDocument />
  if (file === 'homelab.yaml') return <HomelabDocument />
  if (file === 'contact.md') return <ContactDocument />
  return <AboutDocument />
}

function AboutDocument() {
  return (
    <CodeLines>
      <>{t.keyword('import')} {`{ FullStackArchitect }`} {t.keyword('from')} {t.string("'./portfolio'")}</>
      {' '}
      {t.comment('/**')}
      {t.comment(' * Yao Wang builds product interfaces and the systems behind them.')}
      {t.comment(' * Current interests: automation, AI orchestration, and homelab operations.')}
      {t.comment(' */')}
      <>{t.keyword('export const')} {t.variable('yao')} = {'{'}</>
      <>  {t.property('name')}: {t.string("'Yao Wang'")},</>
      <>  {t.property('role')}: {t.string("'Full-Stack Architect'")},</>
      <>  {t.property('focus')}: [</>
      <>    {t.string("'Product engineering'")},</>
      <>    {t.string("'AI orchestration'")},</>
      <>    {t.string("'Automation'")},</>
      <>    {t.string("'Infrastructure'")},</>
      <>  ],</>
      <>  {t.property('builds')}: {t.string("'Useful software with operable foundations'")},</>
      {'}'}
      {' '}
      <>{t.keyword('export default')} {t.variable('FullStackArchitect')}.create({t.variable('yao')})</>
    </CodeLines>
  )
}

function ProjectsDocument() {
  return (
    <CodeLines>
      {'{'}
      <>  {t.property('"owner"')}: {t.string('"Yao Wang"')},</>
      <>  {t.property('"selected"')}: [</>
      <>    {'{'}</>
      <>      {t.property('"name"')}: {t.string('"New Tab"')},</>
      <>      {t.property('"kind"')}: {t.string('"browser productivity"')},</>
      <>      {t.property('"repository"')}: <a href='https://github.com/yaowang908/chrome-extension-newtab'>{t.string('"github.com/yaowang908/chrome-extension-newtab"')}</a></>
      <>    {'},'}</>
      <>    {'{'}</>
      <>      {t.property('"name"')}: {t.string('"Time Zone Organizer"')},</>
      <>      {t.property('"kind"')}: {t.string('"time coordination"')},</>
      <>      {t.property('"repository"')}: <a href='https://github.com/yaowang908/time-zone-organizer'>{t.string('"github.com/yaowang908/time-zone-organizer"')}</a></>
      <>    {'},'}</>
      <>    {'{'}</>
      <>      {t.property('"name"')}: {t.string('"React Adaptable Carousel"')},</>
      <>      {t.property('"kind"')}: {t.string('"React library"')},</>
      <>      {t.property('"repository"')}: <a href='https://github.com/yaowang908/react-adaptable-carousel'>{t.string('"github.com/yaowang908/react-adaptable-carousel"')}</a></>
      <>    {'},'}</>
      <>    {'{'}</>
      <>      {t.property('"name"')}: {t.string('"2048"')},</>
      <>      {t.property('"kind"')}: {t.string('"interaction study"')},</>
      <>      {t.property('"repository"')}: <a href='https://github.com/yaowang908/2048'>{t.string('"github.com/yaowang908/2048"')}</a></>
      <>    {'}'}</>
      <>  ]</>
      {'}'}
    </CodeLines>
  )
}

function SkillsDocument() {
  return (
    <CodeLines>
      <>{t.variable(':root')} {'{'}</>
      <>  {t.property('--languages')}: {t.string('"TypeScript, JavaScript, HTML, CSS"')};</>
      <>  {t.property('--interfaces')}: {t.string('"React, responsive systems, accessible UI"')};</>
      <>  {t.property('--runtime')}: {t.string('"Node.js, Cloudflare Workers"')};</>
      <>  {t.property('--infrastructure')}: {t.string('"Docker, Linux, self-hosted services"')};</>
      <>  {t.property('--networking')}: {t.string('"Tailscale, private service access"')};</>
      <>  {t.property('--workflow')}: {t.string('"Git, automation, CI"')};</>
      <>  {t.property('--current-interest')}: {t.string('"AI tool orchestration"')};</>
      {'}'}
      {' '}
      {t.comment('/* Tools change. The practice is designing clear, maintainable systems. */')}
    </CodeLines>
  )
}

function HomelabDocument() {
  return (
    <CodeLines>
      <>{t.property('homelab')}:</>
      <>  {t.property('purpose')}: {t.string('"systems learning and self-hosting"')}</>
      <>  {t.property('network')}: {t.string('"Tailscale"')}</>
      <>  {t.property('workloads')}:</>
      <>    - {t.string('"containerized services"')}</>
      <>    - {t.string('"workflow automation"')}</>
      <>    - {t.string('"observability experiments"')}</>
      <>  {t.property('principles')}:</>
      <>    - {t.string('"private by default"')}</>
      <>    - {t.string('"documented changes"')}</>
      <>    - {t.string('"recovery before novelty"')}</>
      {' '}
      {t.comment('# Hardware and topology details are intentionally not published.')}
    </CodeLines>
  )
}

function ContactDocument() {
  return (
    <CodeLines>
      <span className='markdown-heading'># Contact</span>
      {' '}
      <>The shortest route is email.</>
      {' '}
      <><EmailOutlined className='inline-icon' /> <a href='mailto:yaowang831@gmail.com'>yaowang831@gmail.com</a></>
      <><GitHub className='inline-icon' /> <a href='https://github.com/yaowang908'>github.com/yaowang908</a></>
      {' '}
      <>{t.comment('## Good context to include')}</>
      <>- What you are building</>
      <>- Where the technical constraint is</>
      <>- What a useful first conversation would cover</>
    </CodeLines>
  )
}
