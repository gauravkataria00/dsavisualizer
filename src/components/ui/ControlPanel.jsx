import { useStore } from '../../store'
import { ALGORITHMS } from '../../utils/algorithmData'

export default function ControlPanel({
  onStart,
  onPause,
  onReset,
  onGenerate,
  onRestartCurrent,
  onNextStep,
  stepMode,
  setStepMode,
  searchTarget,
  setSearchTarget
}) {
  const {
    algorithm, setAlgorithm,
    category, setCategory,
    speed, setSpeed,
    arraySize, setArraySize,
    isRunning, isPaused,
  } = useStore()

  const algos = ALGORITHMS[category] || {}

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    const first = Object.keys(ALGORITHMS[cat])[0]
    setAlgorithm(first)
  }

  return (
    <div className="cyber-panel p-4 flex flex-wrap gap-4 items-center">
      {/* Category */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-mono">CATEGORY</span>
        <div className="flex gap-1">
          {['sorting', 'searching'].map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`cyber-btn text-xs ${category === cat ? 'active' : ''}`}
              disabled={isRunning}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-mono">ALGO</span>
        <div className="flex gap-1 flex-wrap">
          {Object.entries(algos).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setAlgorithm(key)}
              className={`cyber-btn text-xs ${algorithm === key ? 'active' : ''}`}
              disabled={isRunning}
            >
              {val.name.replace(' Sort', '').replace(' Search', '').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Search target */}
      {category === 'searching' && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">TARGET</span>
          <input
            type="number"
            value={searchTarget}
            onChange={e => setSearchTarget(Number(e.target.value))}
            className="w-16 bg-cyber-bg border border-cyber-border text-cyber-cyan font-mono text-xs px-2 py-1 outline-none"
            disabled={isRunning}
          />
        </div>
      )}

      {/* Size */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-mono">SIZE: {arraySize}</span>
        <input
          type="range" min={5} max={50} value={arraySize}
          onChange={e => { setArraySize(+e.target.value); onGenerate(+e.target.value) }}
          className="w-24"
          disabled={isRunning}
        />
      </div>

      {/* Speed */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-mono">SPEED</span>
        <input
          type="range" min={50} max={1000} value={1050 - speed}
          onChange={e => setSpeed(1050 - e.target.value)}
          className="w-24"
        />
        <span className="text-xs text-cyber-cyan font-mono">{speed < 200 ? 'FAST' : speed < 600 ? 'MED' : 'SLOW'}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => setStepMode(!stepMode)}
          className={`cyber-btn ${stepMode ? 'active' : ''}`}
          disabled={isRunning}
        >
          STEP MODE {stepMode ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={() => onGenerate()}
          className="cyber-btn cyber-btn-pink"
          disabled={isRunning}
        >
          GENERATE
        </button>
        {!isRunning ? (
          <button onClick={onStart} className="cyber-btn cyber-btn-green">
            ▶ START
          </button>
        ) : (
          <button onClick={onPause} className="cyber-btn cyber-btn-green">
            {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
          </button>
        )}
        <button onClick={onReset} className="cyber-btn">
          ⟳ RESET
        </button>
        <button onClick={onRestartCurrent} className="cyber-btn" disabled={isRunning}>
          ↻ RESTART CURRENT
        </button>
        <button
          onClick={onNextStep}
          className="cyber-btn cyber-btn-green"
          disabled={!isRunning || !stepMode || isPaused}
        >
          ⏭ NEXT STEP
        </button>
      </div>
    </div>
  )
}
