import { afterEach, describe, expect, mock, spyOn, test } from 'bun:test'
import { fetchPublishedScene, getPublishedScenePath } from '../src/lib/publishedScene'

afterEach(() => mock.restore())

describe('published scene loading', () => {
  test.each([0, 390, 767])('selects the mobile scene at width %i', (width) => {
    expect(getPublishedScenePath(width)).toBe('/portfolio-mobile.excalidraw')
  })

  test.each([768, 1280])('selects the desktop scene at width %i', (width) => {
    expect(getPublishedScenePath(width)).toBe('/portfolio.excalidraw')
  })

  test('loads the actual mobile authoring file without caching', async () => {
    const text = await Bun.file('public/portfolio-mobile.excalidraw').text()
    const request = spyOn(globalThis, 'fetch').mockResolvedValue(new Response(text))
    const blob = await fetchPublishedScene(undefined, getPublishedScenePath(390))
    expect(await blob.text()).toBe(text)
    expect(request).toHaveBeenCalledWith('/portfolio-mobile.excalidraw', {
      cache: 'no-store', signal: undefined,
    })
  })
  test('loads the actual authoring file and embedded assets without caching', async () => {
    const text = await Bun.file('public/portfolio.excalidraw').text()
    const request = spyOn(globalThis, 'fetch').mockResolvedValue(new Response(text))
    const controller = new AbortController()
    const blob = await fetchPublishedScene(controller.signal)

    expect(await blob.text()).toBe(text)
    expect(request).toHaveBeenCalledWith('/portfolio.excalidraw', {
      cache: 'no-store', signal: controller.signal,
    })
  })

  test('a later load gets the newly published revision', async () => {
    const request = spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({ type: 'excalidraw', elements: [] })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ type: 'excalidraw', elements: [{ id: 'new' }] })))
    const first = JSON.parse(await (await fetchPublishedScene()).text())
    const second = JSON.parse(await (await fetchPublishedScene()).text())
    expect(first.elements).toHaveLength(0)
    expect(second.elements).toEqual([{ id: 'new' }])
    expect(request).toHaveBeenCalledTimes(2)
  })

  test('reports a missing published scene with HTTP context', async () => {
    spyOn(globalThis, 'fetch').mockResolvedValue(new Response('Missing', { status: 404 }))
    await expect(fetchPublishedScene()).rejects.toThrow('HTTP 404')
  })

  test.each(['null', '{}', '{"type":"excalidraw","elements":{}}'])('rejects an invalid scene: %s', async (text) => {
    spyOn(globalThis, 'fetch').mockResolvedValue(new Response(text))
    await expect(fetchPublishedScene()).rejects.toThrow('not an Excalidraw drawing')
  })

  test('rejects HTML returned by an incorrect SPA fallback', async () => {
    spyOn(globalThis, 'fetch').mockResolvedValue(new Response('<html>Oops</html>'))
    await expect(fetchPublishedScene()).rejects.toThrow()
  })

  test('preserves the cause of network failures', async () => {
    spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Connection refused'))
    await expect(fetchPublishedScene()).rejects.toThrow('Connection refused')
  })
})
