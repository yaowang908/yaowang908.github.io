import { cp, mkdir } from 'node:fs/promises'

const target = new URL('../public/excalidraw-assets/', import.meta.url)
await mkdir(target, { recursive: true })
await cp(
  new URL('../node_modules/@excalidraw/excalidraw/dist/prod/fonts/', import.meta.url),
  new URL('fonts/', target),
  { recursive: true },
)
