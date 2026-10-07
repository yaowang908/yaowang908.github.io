import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(process.argv[2] ?? '.')
const paths = ['portfolio.excalidraw', 'portfolio-mobile.excalidraw']
const scenes = []
for (const name of paths) {
  const path = resolve(root, 'public', name)
  const scene = JSON.parse(await readFile(path, 'utf8'))
  if (scene.type !== 'excalidraw' || !Array.isArray(scene.elements)) {
    throw new Error(`${path} is not an Excalidraw drawing`)
  }
  const elements = new Map()
  for (const element of scene.elements) {
    if (element.isDeleted) continue
    if (elements.has(element.id)) throw new Error(`${path} has duplicate ID ${element.id}`)
    elements.set(element.id, element)
  }
  scenes.push({ elements, files: scene.files ?? {} })
}

const normalize = (text) => (text ?? '').replace(/\s+/g, ' ').trim()
const [desktop, mobile] = scenes
const ids = new Set([...desktop.elements.keys(), ...mobile.elements.keys()])
const problems = []
for (const id of ids) {
  const left = desktop.elements.get(id)
  const right = mobile.elements.get(id)
  const hasContent = (element) => element && (element.type === 'text' || element.link || element.fileId)
  if (!hasContent(left) && !hasContent(right)) continue
  if (!left || !right) {
    problems.push(`${id}: content element missing from ${left ? 'mobile' : 'desktop'}`)
    continue
  }
  if (left.type !== right.type) problems.push(`${id}: element types differ`)
  if (normalize(left.text) !== normalize(right.text)) problems.push(`${id}: text differs`)
  if ((left.link ?? null) !== (right.link ?? null)) problems.push(`${id}: links differ`)
  if ((left.fileId ?? null) !== (right.fileId ?? null)) problems.push(`${id}: image references differ`)
  if (left.fileId) {
    const a = desktop.files[left.fileId]
    const b = mobile.files[right.fileId]
    if (!a || !b || a.dataURL !== b.dataURL || a.mimeType !== b.mimeType) {
      problems.push(`${id}: embedded image data missing or different`)
    }
  }
}
if (problems.length) throw new Error(`Portfolio scenes are out of sync:\n${problems.join('\n')}`)
process.stdout.write('Desktop and mobile scene content match (layout and line breaks may differ).\n')
