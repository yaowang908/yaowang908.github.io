/** Published scenes share content but retain independent drawing layouts. */
export type PortfolioScenePath = '/portfolio.excalidraw' | '/portfolio-mobile.excalidraw'

/** Choose once at page load so later resizing cannot discard visitor edits. */
export function getPublishedScenePath(viewportWidth: number): PortfolioScenePath {
  return viewportWidth < 768 ? '/portfolio-mobile.excalidraw' : '/portfolio.excalidraw'
}

/** Fetch a fresh author-owned scene; visitor changes are never persisted. */
export async function fetchPublishedScene(
  signal?: AbortSignal,
  scenePath: PortfolioScenePath = '/portfolio.excalidraw',
): Promise<Blob> {
  const response = await fetch(scenePath, { cache: 'no-store', signal })
  if (!response.ok) {
    throw new Error(`Fetching ${scenePath} failed (HTTP ${response.status})`)
  }

  const blob = await response.blob()
  const data: unknown = JSON.parse(await blob.text())
  if (
    typeof data !== 'object' || data === null ||
    !('type' in data) || data.type !== 'excalidraw' ||
    !('elements' in data) || !Array.isArray(data.elements)
  ) {
    throw new Error(`${scenePath} is not an Excalidraw drawing`)
  }
  return blob
}
