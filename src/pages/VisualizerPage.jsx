import { useEffect, useRef, useState, useCallback } from 'react'
import { useStore } from '../store'
import {
  getBubbleSortSteps, getSelectionSortSteps, getInsertionSortSteps,
  getMergeSortSteps, getQuickSortSteps,
  getLinearSearchSteps, getBinarySearchSteps
} from '../utils/algorithms'
import { ALGORITHMS } from '../utils/algorithmData'
import BarVisualizer from '../components/visualizers/BarVisualizer'
import ControlPanel from '../components/ui/ControlPanel'
import CodePanel from '../components/ui/CodePanel'
import InfoPanel from '../components/ui/InfoPanel'
import LogPanel from '../components/ui/LogPanel'

const ALG_STEPS = {
  bubble: getBubbleSortSteps,
  selection: getSelectionSortSteps,
  insertion: getInsertionSortSteps,
  merge: getMergeSortSteps,
  quick: getQuickSortSteps,
  linear: getLinearSearchSteps,
  binary: getBinarySearchSteps,
}

export default function VisualizerPage() {
  const store = useStore()
  const {
    algorithm, category, array,
    setArray, setComparingIndices, setSwappingIndices,
    setSortedIndices, setFoundIndex, setActiveLine,
    setCurrentStep, setTotalSteps,
    addLog, incrementComparisons, incrementSwaps,
    setIsRunning, setIsPaused, reset, generateArray,
    setExplanation,
    explanation,
    isRunning, isPaused
  } = store

  const isPausedRef = useRef(false)
  const stopRef = useRef(false)
  const stepAdvanceRef = useRef(null)
  const stepModeRef = useRef(false)
  const [searchTarget, setSearchTarget] = useState(50)
  const [stepMode, setStepMode] = useState(false)
  const [showCodePanel, setShowCodePanel] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    generateArray()
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const applyResponsiveState = () => {
      const mobile = media.matches
      setIsMobile(mobile)
      setShowControls(!mobile)
      setShowCodePanel(!mobile)
    }

    applyResponsiveState()
    media.addEventListener('change', applyResponsiveState)
    return () => media.removeEventListener('change', applyResponsiveState)
  }, [])

  useEffect(() => {
    stepModeRef.current = stepMode
  }, [stepMode])

  const delay = (ms) => new Promise(resolve => {
    const check = () => {
      if (stopRef.current) resolve()
      else if (isPausedRef.current) setTimeout(check, 100)
      else setTimeout(resolve, ms)
    }
    check()
  })

  const waitForNextStep = () => new Promise(resolve => {
    stepAdvanceRef.current = resolve
  })

  const releaseStepWaiter = () => {
    if (stepAdvanceRef.current) {
      stepAdvanceRef.current()
      stepAdvanceRef.current = null
    }
  }

  const runVisualization = useCallback(async (sourceArray) => {
    const baseArray = sourceArray ? [...sourceArray] : [...useStore.getState().array]
    if (!baseArray.length) return

    const currentState = useStore.getState()
    const activeAlgorithm = currentState.algorithm
    const activeCategory = currentState.category
    const activeCodeLines = ALGORITHMS[activeCategory]?.[activeAlgorithm]?.code || []
    const compareLineIndex = activeCodeLines.findIndex((line) => line.includes('if ('))
    const swapLineIndex = activeCodeLines.findIndex(
      (line) => line.includes('swap(') || line.includes('arr[j+1] = arr[j--]') || line.includes('arr[j+1] = arr[j]')
    )

    stopRef.current = false
    isPausedRef.current = false
    setIsRunning(true)
    setIsPaused(false)
    setExplanation(stepModeRef.current ? 'Step mode active. Click NEXT STEP to continue.' : 'Visualization started')

    const stepFn = ALG_STEPS[activeAlgorithm]
    if (!stepFn) return

    const steps = activeCategory === 'searching'
      ? stepFn([...baseArray], searchTarget)
      : stepFn([...baseArray])

    setTotalSteps(steps.length)
    setCurrentStep(0)

    const sortedSet = new Set()

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      const step = steps[stepIndex]
      if (stopRef.current) break

      if (stepModeRef.current) {
        setExplanation('Step mode active. Click NEXT STEP to continue.')
        await waitForNextStep()
      } else {
        await delay(useStore.getState().speed)
      }

      if (stopRef.current) break

      const prevArray = useStore.getState().array
      const resolvedLine =
        step.type === 'compare' && compareLineIndex !== -1
          ? compareLineIndex
          : step.type === 'swap' && swapLineIndex !== -1
            ? swapLineIndex
            : step.line

      setCurrentStep(stepIndex + 1)
      setArray([...step.array])
      setActiveLine(resolvedLine)

      if (step.type === 'compare') {
        const [i, j] = step.indices || []
        const x = Number.isInteger(i) ? prevArray[i] : undefined
        const y = Number.isInteger(j) ? prevArray[j] : undefined
        setComparingIndices(step.indices || [])
        setSwappingIndices([])
        incrementComparisons()
        if (x !== undefined && y !== undefined) {
          setExplanation(`Comparing ${x} and ${y}`)
        } else if (x !== undefined) {
          setExplanation(`Comparing ${x}`)
        } else {
          setExplanation('Comparing elements')
        }
        addLog(`Comparing indices [${(step.indices || []).join(', ')}]`, 'compare')
      } else if (step.type === 'swap') {
        const [i, j] = step.indices || []
        const x = Number.isInteger(i) ? prevArray[i] : undefined
        const y = Number.isInteger(j) ? prevArray[j] : undefined
        setSwappingIndices(step.indices || [step.index])
        setComparingIndices([])
        incrementSwaps()
        if (x !== undefined && y !== undefined) {
          setExplanation(`Swapping ${x} and ${y} because ${x} > ${y}`)
        } else {
          setExplanation('Swapping elements to maintain order')
        }
        addLog(`Swapping indices [${(step.indices || []).join(', ')}]`, 'swap')
      } else if (step.type === 'sorted') {
        sortedSet.add(step.index)
        setSortedIndices([...sortedSet])
        setComparingIndices([])
        setSwappingIndices([])
        setExplanation('Element is in correct position')
      } else if (step.type === 'found') {
        setFoundIndex(step.index)
        setComparingIndices([])
        setExplanation(`Target found at index ${step.index}`)
        addLog(`✓ Found target at index ${step.index}!`, 'found')
      } else if (step.type === 'notfound') {
        setExplanation('Target not found in array')
        addLog('✗ Target not found in array', 'swap')
      } else if (step.type === 'info') {
        setExplanation(step.msg)
        addLog(step.msg, 'info')
      } else if (step.type === 'done') {
        setComparingIndices([])
        setSwappingIndices([])
        if (activeCategory === 'sorting') {
          setSortedIndices(step.array.map((_, i) => i))
          setExplanation('Sorting complete')
          addLog('✓ Sorting complete!', 'found')
        } else {
          setExplanation('Search complete')
        }
      }
    }

    releaseStepWaiter()
    setIsRunning(false)
    setIsPaused(false)
    setActiveLine(-1)
  }, [searchTarget, setActiveLine, setArray, setComparingIndices, setCurrentStep, setExplanation, setFoundIndex, setIsPaused, setIsRunning, setSortedIndices, setSwappingIndices, setTotalSteps, addLog, incrementComparisons, incrementSwaps])

  const handleStart = () => {
    reset()
    setExplanation('Preparing visualization...')
    setTimeout(() => runVisualization(), 100)
  }

  const handlePause = () => {
    const newPaused = !isPausedRef.current
    isPausedRef.current = newPaused
    setIsPaused(newPaused)
    setExplanation(newPaused ? 'Visualization paused' : 'Visualization resumed')
  }

  const handleReset = () => {
    stopRef.current = true
    isPausedRef.current = false
    releaseStepWaiter()
    setTimeout(() => {
      reset()
      generateArray()
    }, 100)
  }

  const handleGenerate = (size) => {
    const safeSize = Number.isFinite(Number(size)) ? Number(size) : useStore.getState().arraySize
    stopRef.current = true
    releaseStepWaiter()
    setTimeout(() => {
      reset()
      generateArray(safeSize)
    }, 100)
  }

  const handleNextStep = () => {
    if (!isRunning || !stepModeRef.current) return
    releaseStepWaiter()
  }

  const handleRestartCurrent = () => {
    const currentArray = [...useStore.getState().array]
    if (!currentArray.length) return

    stopRef.current = true
    isPausedRef.current = false
    releaseStepWaiter()

    setTimeout(() => {
      reset()
      setArray(currentArray)
      setExplanation('Restarted from current array')
      setTimeout(() => runVisualization(currentArray), 50)
    }, 100)
  }

  const algoData = ALGORITHMS[category]?.[algorithm]

  return (
    <div className="min-h-screen grid-bg scan-overlay flex flex-col" style={{ background: 'var(--cyber-bg)' }}>
      {/* Header */}
      <header className="border-b border-cyber-border px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-cyber-cyan glow-cyan tracking-widest">
            DSA VISUALIZER
          </h1>
          <p className="text-sm text-slate-300/80 font-mono mt-1">3D Algorithm Explorer v2.0</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="text-center">
            <div className="font-display text-xl font-bold text-cyber-pink">
              {algoData?.name || '—'}
            </div>
            <div className="text-xs text-slate-300/70 font-mono">ACTIVE ALGORITHM</div>
          </div>

          <button
            onClick={() => setShowCodePanel(!showCodePanel)}
            className={`cyber-btn text-xs ${showCodePanel ? 'active gradient-active' : ''}`}
          >
            {showCodePanel ? 'HIDE CODE' : 'SHOW CODE'}
          </button>

          <div className="flex gap-1">
            <StatusDot color="cyan" active={isRunning && !useStore.getState().isPaused} label="RUNNING" />
            <StatusDot color="yellow" active={useStore.getState().isPaused} label="PAUSED" />
            <StatusDot color="green" active={!isRunning} label="IDLE" />
          </div>

          <button
            onClick={() => setShowControls(!showControls)}
            className="cyber-btn text-xs md:hidden"
          >
            {showControls ? 'HIDE CONTROLS' : 'SHOW CONTROLS'}
          </button>
        </div>
      </header>

      {/* Controls */}
      {showControls && (
        <div className="px-3 sm:px-4 py-2 border-b border-cyber-border">
          <ControlPanel
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onGenerate={handleGenerate}
            onRestartCurrent={handleRestartCurrent}
            onNextStep={handleNextStep}
            stepMode={stepMode}
            setStepMode={setStepMode}
            searchTarget={searchTarget}
            setSearchTarget={setSearchTarget}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-3 sm:p-4 min-h-0">
        {/* Dominant visualization column */}
        <div className="lg:w-[70%] w-full flex flex-col gap-4 min-h-0">
          <div className="cyber-panel overflow-hidden" style={{ minHeight: isMobile ? '320px' : '420px' }}>
            <div className="w-full h-full">
              <BarVisualizer isMobile={isMobile} />
            </div>
          </div>

          <div className="cyber-panel p-4 border-t border-cyber-border gradient-active">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="font-display text-sm text-cyber-cyan tracking-widest">LIVE EXPLANATION</span>
            </div>
            <p className="text-sm text-slate-200/90 font-mono leading-relaxed min-h-12">
              {explanation}
            </p>
          </div>
        </div>

        {/* Secondary column */}
        <div className="lg:w-[30%] w-full flex flex-col gap-4 min-h-0">
          {showCodePanel && (
            <div className="min-h-0" style={{ maxHeight: '340px' }}>
              <CodePanel />
            </div>
          )}
          <div>
            <InfoPanel />
          </div>
          <div style={{ minHeight: '170px' }}>
            <LogPanel />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-2 border-t border-cyber-border flex gap-6 items-center">
        <span className="text-xs text-slate-600 font-mono">LEGEND:</span>
        <LegendItem color="#00f5ff" label="DEFAULT" />
        <LegendItem color="#ffd700" label="COMPARING" />
        <LegendItem color="#ff0080" label="SWAPPING" />
        <LegendItem color="#00ff88" label="SORTED" />
      </div>
    </div>
  )
}

function StatusDot({ color, active, label }) {
  const colors = {
    cyan: 'bg-cyber-cyan',
    yellow: 'bg-cyber-yellow',
    green: 'bg-cyber-green',
    pink: 'bg-cyber-pink'
  }
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 border border-cyber-border rounded text-xs">
      <div className={`w-1.5 h-1.5 rounded-full ${colors[color]} ${active ? 'animate-pulse' : 'opacity-20'}`} />
      <span className={`font-mono text-xs ${active ? 'text-slate-300' : 'text-slate-600'}`}>{label}</span>
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-3 h-3 rounded" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-xs text-slate-500 font-mono">{label}</span>
    </div>
  )
}
