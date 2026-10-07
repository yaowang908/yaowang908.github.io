import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Excalidraw, getCommonBounds, loadFromBlob, zoomToFitBounds } from '@excalidraw/excalidraw'
import type { ExcalidrawImperativeAPI, ExcalidrawInitialDataState } from '@excalidraw/excalidraw/types'
import '@excalidraw/excalidraw/index.css'
import { fetchPublishedScene, getPublishedScenePath } from '../lib/publishedScene'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [scene, setScene] = useState<ExcalidrawInitialDataState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(false)
  const [scenePath] = useState(() => getPublishedScenePath(window.innerWidth))
  const editor = useRef<ExcalidrawImperativeAPI | null>(null)
  const fitted = useRef(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadScene() {
      try {
        const blob = await fetchPublishedScene(controller.signal, scenePath)
        const restored = await loadFromBlob(blob, null, null)
        if (controller.signal.aborted) return
        setScene({
          elements: restored.elements,
          files: restored.files,
          appState: {
            ...restored.appState,
            theme: 'dark',
            activeTool: { type: 'hand', customType: null, lastActiveTool: null, locked: false },
            viewModeEnabled: false,
            zenModeEnabled: false,
            selectedElementIds: {},
          },
          scrollToContent: true,
        })
      } catch (cause) {
        if (controller.signal.aborted) return
        const detail = cause instanceof Error ? cause.message : String(cause)
        setError(`The portfolio drawing could not be loaded: ${detail}`)
      }
    }

    void loadScene()
    return () => controller.abort()
  }, [scenePath])

  if (error) {
    return <main className='scene-message' role='alert'>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try again</button>
    </main>
  }

  if (!scene) {
    return <main className='scene-message' role='status'>Loading the drawing…</main>
  }

  return (
    <main
      className='portfolio-canvas'
      data-controls={showControls ? 'visible' : 'hidden'}
      aria-label='Yao Wang’s editable portfolio'
    >
      <Excalidraw
        initialData={scene}
        name='Yao Wang portfolio'
        zenModeEnabled={!showControls}
        excalidrawAPI={(api) => { editor.current = api }}
        onChange={(elements) => {
          // Initial scene restoration happens after the editor API is created.
          if (fitted.current || elements.length === 0 || !editor.current) return
          const appState = editor.current.getAppState()
          if (appState.width <= 0 || appState.height <= 0) return
          fitted.current = true
          const bounds = getCommonBounds(elements)
          const isMobileScene = scenePath === '/portfolio-mobile.excalidraw'
          const fittedScene = zoomToFitBounds({
            // Fit mobile width, then pan down the taller drawing to read it.
            bounds: isMobileScene ? [bounds[0], bounds[1], bounds[2], bounds[1] + 200] : bounds,
            appState,
            canvasOffsets: { top: 88, bottom: 64, left: isMobileScene ? 8 : 24, right: isMobileScene ? 8 : 24 },
            fitToViewport: true,
            viewportZoomFactor: 1,
            maxZoom: 1,
          })
          if (isMobileScene) {
            fittedScene.appState.scrollY = 80 / fittedScene.appState.zoom.value - bounds[1]
          }
          editor.current.updateScene({ appState: fittedScene.appState })
        }}
        UIOptions={{ canvasActions: { loadScene: false, toggleTheme: true } }}
      />
      <button
        className='controls-toggle'
        aria-expanded={showControls}
        onClick={() => setShowControls((visible) => !visible)}
      >
        {showControls ? 'Hide tools' : 'Edit canvas'}
      </button>
    </main>
  )
}
