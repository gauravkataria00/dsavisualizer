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
    <div className="cyber-panel p-4 flex flex-col gap-3">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Category */}
        <div className="w-full sm:w-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
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
        <div className="w-full lg:w-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
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
          <div className="w-full sm:w-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
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
        <div className="w-full sm:w-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
          <span className="text-xs text-slate-500 font-mono">SIZE: {arraySize}</span>
          <input
            type="range" min={5} max={50} value={arraySize}
            onChange={e => { setArraySize(+e.target.value); onGenerate(+e.target.value) }}
            className="w-24"
            disabled={isRunning}
          />
        </div>

        {/* Speed */}
        <div className="w-full sm:w-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
          <span className="text-xs text-slate-500 font-mono">SPEED</span>
          <input
            type="range" min={50} max={1000} value={1050 - speed}
            onChange={e => setSpeed(1050 - e.target.value)}
            className="w-24"
          />
          <span className="text-xs text-cyber-cyan font-mono">{speed < 200 ? 'FAST' : speed < 600 ? 'MED' : 'SLOW'}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 justify-start border-t border-white/10 pt-3">
        <button
          onClick={() => setStepMode(!stepMode)}
          className={`cyber-btn control-btn text-xs sm:text-sm ${stepMode ? 'active' : ''}`}
          disabled={isRunning}
        >
          <span className="control-btn-icon">{stepMode ? '🧩' : '🧠'}</span>
          <span>{stepMode ? 'STEP MODE ON' : 'STEP MODE OFF'}</span>
        </button>
        <button
          onClick={() => onGenerate()}
          className="cyber-btn cyber-btn-pink control-btn text-xs sm:text-sm"
          disabled={isRunning}
        >
          <span className="control-btn-icon">🎲</span>
          <span>GENERATE</span>
        </button>
        {!isRunning ? (
          <button onClick={onStart} className="cyber-btn cyber-btn-green control-btn text-xs sm:text-sm">
            <span className="control-btn-icon">▶</span>
            <span>START</span>
          </button>
        ) : (
          <button
            onClick={onPause}
            className={`cyber-btn cyber-btn-green control-btn text-xs sm:text-sm ${!isPaused ? 'active-running' : ''}`}
          >
            <span className="control-btn-icon">{isPaused ? '▶' : '⏸'}</span>
            <span>{isPaused ? 'RESUME' : 'RUNNING'}</span>
          </button>
        )}
        <button onClick={onReset} className="cyber-btn control-btn text-xs sm:text-sm" disabled={isRunning}>
          <span className="control-btn-icon">↺</span>
          <span>RESET</span>
        </button>
        <button onClick={onRestartCurrent} className="cyber-btn control-btn text-xs sm:text-sm" disabled={isRunning}>
          <span className="control-btn-icon">⟲</span>
          <span>RESTART CURRENT</span>
        </button>
        <button
          onClick={onNextStep}
          className="cyber-btn cyber-btn-green control-btn text-xs sm:text-sm"
          disabled={!isRunning || !stepMode}
        >
          <span className="control-btn-icon">⏭</span>
          <span>NEXT STEP</span>
        </button>
      </div>
    </div>
  )
}
