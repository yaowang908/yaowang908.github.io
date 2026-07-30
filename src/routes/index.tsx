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
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExtensionOutlined from '@mui/icons-material/ExtensionOutlined'
import GitHub from '@mui/icons-material/GitHub'
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined'
import Menu from '@mui/icons-material/Menu'
import NoteAddOutlined from '@mui/icons-material/NoteAddOutlined'
import PersonOutline from '@mui/icons-material/PersonOutline'
import Search from '@mui/icons-material/Search'

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

type NoteId = `note:${string}`
type WorkspaceFileId = FileId | NoteId

type LocalNote = {
  id: NoteId
  title: string
  content: string
  updatedAt: number
}

type SearchableFile = {
  id: WorkspaceFileId
  label: string
  kind: string
  path: string
}

const files: FileMeta[] = [
  { id: 'about.tsx', kind: 'TS', language: 'TypeScript React', path: 'src/about.tsx', lines: 19 },
  { id: 'projects.json', kind: '{}', language: 'JSON', path: 'data/projects.json', lines: 31 },
  { id: 'skills.css', kind: '#', language: 'CSS', path: 'src/skills.css', lines: 12 },
  { id: 'homelab.yaml', kind: 'Y', language: 'YAML', path: 'ops/homelab.yaml', lines: 13 },
  { id: 'contact.md', kind: 'M', language: 'Markdown', path: 'docs/contact.md', lines: 12 },
]

const fileById = Object.fromEntries(files.map((file) => [file.id, file])) as Record<FileId, FileMeta>

const notesStorageKey = 'yao-portfolio-local-notes-v1'
const terminalHelp = 'Commands: help, open <file>, note, projects, contact, clear'

function isNoteId(file: WorkspaceFileId): file is NoteId {
  return file.startsWith('note:')
}

function noteFileName(note?: LocalNote) {
  return `${note?.title.trim() || 'Untitled note'}.md`
}

function loadLocalNotes(): LocalNote[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = JSON.parse(window.localStorage.getItem(notesStorageKey) || '[]')
    if (!Array.isArray(stored)) return []

    return stored.filter((note): note is LocalNote => (
      typeof note?.id === 'string'
      && note.id.startsWith('note:')
      && typeof note.title === 'string'
      && typeof note.content === 'string'
      && typeof note.updatedAt === 'number'
    ))
  } catch {
    return []
  }
}

function Home() {
  const [activeFile, setActiveFile] = useState<WorkspaceFileId>('about.tsx')
  const [openTabs, setOpenTabs] = useState<WorkspaceFileId[]>(['about.tsx', 'projects.json'])
  const [notes, setNotes] = useState<LocalNote[]>(loadLocalNotes)
  const [storageError, setStorageError] = useState(false)
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

  useEffect(() => {
    try {
      window.localStorage.setItem(notesStorageKey, JSON.stringify(notes))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [notes])

  const activeNote = isNoteId(activeFile)
    ? notes.find((note) => note.id === activeFile)
    : undefined

  const workspaceFiles = useMemo<SearchableFile[]>(() => [
    ...files.map((file) => ({
      id: file.id,
      label: file.id,
      kind: file.kind,
      path: file.path,
    })),
    ...notes.map((note) => ({
      id: note.id,
      label: noteFileName(note),
      kind: 'N',
      path: `notes/${noteFileName(note)}`,
    })),
  ], [notes])

  const workspaceFile = (file: WorkspaceFileId) => workspaceFiles.find((entry) => entry.id === file)

  const openFile = (file: WorkspaceFileId) => {
    setActiveFile(file)
    setOpenTabs((tabs) => (tabs.includes(file) ? tabs : [...tabs, file]))
    setPaletteOpen(false)
    setPaletteQuery('')
  }

  const closeTab = (file: WorkspaceFileId) => {
    setOpenTabs((tabs) => {
      if (tabs.length === 1) return tabs
      const index = tabs.indexOf(file)
      const next = tabs.filter((tab) => tab !== file)
      if (activeFile === file) setActiveFile(next[Math.max(0, index - 1)])
      return next
    })
  }

  const createNote = () => {
    let number = notes.length + 1
    while (notes.some((note) => note.title === `Note ${number}`)) number += 1

    const uniqueId = typeof window.crypto?.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    const note: LocalNote = {
      id: `note:${uniqueId}`,
      title: `Note ${number}`,
      content: '',
      updatedAt: Date.now(),
    }

    setNotes((current) => [...current, note])
    openFile(note.id)
  }

  const updateNote = (id: NoteId, changes: Pick<LocalNote, 'title' | 'content'>) => {
    setNotes((current) => current.map((note) => (
      note.id === id
        ? { ...note, ...changes, updatedAt: Date.now() }
        : note
    )))
  }

  const deleteNote = (id: NoteId) => {
    const note = notes.find((item) => item.id === id)
    if (!window.confirm(`Delete "${noteFileName(note)}" from this browser?`)) return

    setNotes((current) => current.filter((item) => item.id !== id))
    setOpenTabs((tabs) => {
      const index = tabs.indexOf(id)
      const next = tabs.filter((tab) => tab !== id)

      if (next.length === 0) {
        setActiveFile('about.tsx')
        return ['about.tsx']
      }

      if (activeFile === id) setActiveFile(next[Math.max(0, index - 1)])
      return next
    })
  }

  const filteredFiles = useMemo(() => {
    const query = paletteQuery.trim().toLowerCase()
    return query
      ? workspaceFiles.filter((file) => `${file.label} ${file.path}`.toLowerCase().includes(query))
      : workspaceFiles
  }, [paletteQuery, workspaceFiles])

  const submitCommand = (event: FormEvent) => {
    event.preventDefault()
    const input = command.trim()
    if (!input) return

    const [verb, ...argumentsList] = input.toLowerCase().split(/\s+/)
    const target = argumentsList.join(' ')
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
    } else if (verb === 'note') {
      createNote()
      output = 'Created a note stored in this browser.'
    } else if (verb === 'open') {
      const match = workspaceFiles.find(
        (file) => file.label.toLowerCase() === target
          || file.label.toLowerCase().startsWith(target)
          || file.path.toLowerCase().includes(target)
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
          </div>
        </nav>

        <aside className={`explorer ${sidebarOpen ? 'open' : ''}`} aria-label='Explorer'>
          <div className='pane-title'>
            <span>Explorer</span>
            <button
              className='new-note'
              aria-label='Create a local note'
              title='New local note'
              onClick={createNote}
            >
              <NoteAddOutlined />
            </button>
          </div>
          <ExplorerGroup label='Open editors'>
            {openTabs.map((file) => (
              <ExplorerFile
                key={file}
                label={workspaceFile(file)?.label || 'Untitled note.md'}
                kind={workspaceFile(file)?.kind || 'N'}
                active={activeFile === file}
                onClick={() => openFile(file)}
              />
            ))}
          </ExplorerGroup>
          <ExplorerGroup label='Portfolio · read only'>
            {files.map((file) => (
              <ExplorerFile
                key={file.id}
                label={file.id}
                kind={file.kind}
                active={activeFile === file.id}
                onClick={() => openFile(file.id)}
              />
            ))}
          </ExplorerGroup>
          <ExplorerGroup label='Notes · local'>
            {notes.length > 0 ? notes.map((note) => (
              <ExplorerFile
                key={note.id}
                label={noteFileName(note)}
                kind='N'
                active={activeFile === note.id}
                onClick={() => openFile(note.id)}
              />
            )) : (
              <p className='explorer-empty'>Create a note with the button above. It stays in this browser.</p>
            )}
          </ExplorerGroup>
        </aside>

        <section className='editor-area' aria-label='Editor'>
          <div className='tab-strip' role='tablist' aria-label='Open files'>
            <div className='tabs-scroll'>
              {openTabs.map((file) => (
                <div
                  key={file}
                  className={`editor-tab ${activeFile === file ? 'active' : ''}`}
                >
                  <button
                    className='tab-select'
                    role='tab'
                    aria-selected={activeFile === file}
                    onClick={() => openFile(file)}
                  >
                    <FileKind kind={workspaceFile(file)?.kind || 'N'} />
                    <span>{workspaceFile(file)?.label || 'Untitled note.md'}</span>
                  </button>
                  <button
                    className='tab-close'
                    aria-label={`Close ${workspaceFile(file)?.label || 'note'}`}
                    title={`Close ${workspaceFile(file)?.label || 'note'}`}
                    onClick={() => closeTab(file)}
                  >
                    <Close />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='breadcrumbs'>
            <span>portfolio</span><ChevronRight />
            <span>{workspaceFile(activeFile)?.path.split('/')[0]}</span><ChevronRight />
            <strong>{workspaceFile(activeFile)?.label}</strong>
          </div>

          <div className={`editor-document ${activeNote ? 'note-document' : ''}`} key={activeFile}>
            {activeNote ? (
              <NoteEditor
                note={activeNote}
                onChange={(changes) => updateNote(activeNote.id, changes)}
                onDelete={() => deleteNote(activeNote.id)}
              />
            ) : (
              <FileDocument file={activeFile as FileId} />
            )}
          </div>

          <section className={`terminal-dock ${terminalOpen ? 'open' : ''}`} aria-label='Terminal panel'>
            <div className='terminal-tabs'>
              <span className='terminal-title'>Terminal</span>
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
        <span className='status-spacer' />
        <span className={storageError && activeNote ? 'status-error' : ''}>
          {activeNote ? (storageError ? 'Local save failed' : 'Saved locally') : 'Read only'}
        </span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>{activeNote ? 'Markdown' : fileById[activeFile as FileId].language}</span>
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
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && filteredFiles[0]) openFile(filteredFiles[0].id)
                }}
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
                  <span><strong>{file.label}</strong><small>{file.path}</small></span>
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
  children,
}: {
  label: string
  children: ReactNode
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <section className='explorer-group'>
      <button
        className='group-heading'
        aria-expanded={expanded}
        onClick={() => setExpanded((open) => !open)}
      >
        {expanded ? <ExpandMore /> : <ChevronRight />}
        <span>{label}</span>
      </button>
      {expanded && <div>{children}</div>}
    </section>
  )
}

function ExplorerFile({
  label,
  kind,
  active,
  onClick,
}: {
  label: string
  kind: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button className={`explorer-file ${active ? 'active' : ''}`} onClick={onClick}>
      <FileKind kind={kind} />
      <span>{label}</span>
    </button>
  )
}

function NoteEditor({
  note,
  onChange,
  onDelete,
}: {
  note: LocalNote
  onChange: (changes: Pick<LocalNote, 'title' | 'content'>) => void
  onDelete: () => void
}) {
  return (
    <section className='note-editor' aria-label='Local note editor'>
      <div className='note-meta'>
        <div>
          <strong>Local note</strong>
          <span>Autosaves in this browser only.</span>
        </div>
        <button className='delete-note' onClick={onDelete}>
          <DeleteOutline />
          <span>Delete</span>
        </button>
      </div>
      <input
        className='note-title'
        value={note.title}
        onChange={(event) => onChange({ title: event.target.value, content: note.content })}
        onBlur={() => {
          if (!note.title.trim()) onChange({ title: 'Untitled note', content: note.content })
        }}
        placeholder='Note title'
        aria-label='Note title'
        spellCheck
      />
      <textarea
        className='note-content'
        value={note.content}
        onChange={(event) => onChange({ title: note.title, content: event.target.value })}
        placeholder='Write a note…'
        aria-label='Note content'
        spellCheck
      />
    </section>
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
      <><EmailOutlined className='inline-icon' /> <EmailReveal /></>
      <><GitHub className='inline-icon' /> <a href='https://github.com/yaowang908'>github.com/yaowang908</a></>
      {' '}
      <>{t.comment('## Good context to include')}</>
      <>- What you are building</>
      <>- Where the technical constraint is</>
      <>- What a useful first conversation would cover</>
    </CodeLines>
  )
}

function EmailReveal() {
  const [address, setAddress] = useState<string | null>(null)

  if (!address) {
    return (
      <button
        className='email-reveal'
        data-address='ZW1haWxAeWFvdy5tZQ=='
        onClick={(event) => {
          const encoded = event.currentTarget.dataset.address
          if (encoded) setAddress(window.atob(encoded))
        }}
      >
        Reveal email address
      </button>
    )
  }

  return <a href={`mailto:${address}`}>{address}</a>
}
