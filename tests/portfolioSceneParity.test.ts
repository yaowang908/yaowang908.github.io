import { describe, expect, test } from 'bun:test'
import { mkdtempSync, mkdirSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

type FixtureElement = { id: string; type: string; text?: string; link?: string; x?: number; fileId?: string }

function check(left: FixtureElement[], right: FixtureElement[]) {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-parity-'))
  const publicPath = join(root, 'public')
  mkdirSync(publicPath)
  const files = ['portfolio.excalidraw', 'portfolio-mobile.excalidraw']
  try {
    for (const [index, name] of files.entries()) {
      writeFileSync(join(publicPath, name), JSON.stringify({ type: 'excalidraw', elements: index === 0 ? left : right, files: {} }))
    }
    const result = Bun.spawnSync([process.execPath, resolve('scripts/check-portfolio-scenes.mjs'), root])
    return { status: result.exitCode, error: result.stderr.toString() }
  } finally {
    for (const name of files) unlinkSync(join(publicPath, name))
    rmdirSync(publicPath)
    rmdirSync(root)
  }
}

describe('portfolio content parity', () => {
  test('allows different line wrapping and geometry', () => {
    expect(check(
      [{ id: 'bio', type: 'text', text: 'Build reusable skills', x: 20 }],
      [{ id: 'bio', type: 'text', text: 'Build reusable\nskills', x: 80 }],
    ).status).toBe(0)
  })

  test('detects changed wording', () => {
    const result = check([{ id: 'bio', type: 'text', text: 'Skills' }], [{ id: 'bio', type: 'text', text: 'Tools' }])
    expect(result.status).not.toBe(0)
    expect(result.error).toContain('bio: text differs')
  })

  test('detects changed links', () => {
    const result = check([{ id: 'project', type: 'text', link: 'https://a.example' }], [{ id: 'project', type: 'text', link: 'https://b.example' }])
    expect(result.status).not.toBe(0)
    expect(result.error).toContain('project: links differ')
  })

  test('detects a project added to only one variant', () => {
    expect(check([{ id: 'new-project', type: 'text', text: 'New project' }], []).error).toContain('missing from mobile')
  })

  test('rejects broken embedded image references', () => {
    expect(check([{ id: 'photo', type: 'image', fileId: 'missing' }], [{ id: 'photo', type: 'image', fileId: 'missing' }]).error).toContain('embedded image data missing')
  })
})
