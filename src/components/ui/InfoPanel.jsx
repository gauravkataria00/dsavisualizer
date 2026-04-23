import { useStore } from '../../store'
import { ALGORITHMS } from '../../utils/algorithmData'

export default function InfoPanel() {
  const { algorithm, category, comparisons, swaps, currentStep, totalSteps, explanation } = useStore()
  const algoData = ALGORITHMS[category]?.[algorithm]

  if (!algoData) return null

  const tc = algoData.timeComplexity

  return (
    <div className="cyber-panel p-4 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-cyber-pink animate-pulse" />
        <span className="font-display text-xs text-cyber-pink tracking-widest">COMPLEXITY</span>
      </div>

      <div className="space-y-2 mb-4">
        <ComplexRow label="BEST" value={tc.best} color="text-cyber-green" />
        <ComplexRow label="AVG" value={tc.avg} color="text-cyber-yellow" />
        <ComplexRow label="WORST" value={tc.worst} color="text-cyber-pink" />
        <ComplexRow label="SPACE" value={algoData.spaceComplexity} color="text-cyber-purple" />
      </div>

      <div className="border-t border-cyber-border pt-3 mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400 font-mono">STABLE</span>
          <span className={algoData.stable ? 'text-cyber-green' : 'text-cyber-pink'}>
            {algoData.stable ? 'YES' : 'NO'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-cyber-yellow animate-pulse" />
        <span className="font-display text-xs text-cyber-yellow tracking-widest">STATS</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatBox label="COMPARISONS" value={comparisons} color="text-cyber-yellow" />
        <StatBox label="SWAPS" value={swaps} color="text-cyber-pink" />
      </div>

      <div className="mt-3 bg-cyber-bg border border-cyber-border rounded p-2 text-center">
        <div className="text-lg font-display font-bold text-cyber-cyan">
          {currentStep} / {totalSteps}
        </div>
        <div className="text-xs text-slate-500 font-mono mt-1">CURRENT STEP / TOTAL STEPS</div>
      </div>

      <div className="border-t border-cyber-border pt-3 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
          <span className="font-display text-xs text-cyber-cyan tracking-widest">LIVE EXPLANATION</span>
        </div>
        <p className="text-xs text-slate-300 font-mono leading-relaxed min-h-10">
          {explanation}
        </p>
      </div>
    </div>
  )
}

function ComplexRow({ label, value, color }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-slate-500 font-mono">{label}</span>
      <span className={`text-xs font-mono font-bold ${color}`}>{value}</span>
    </div>
  )
}

function StatBox({ label, value, color }) {
  return (
    <div className="bg-cyber-bg border border-cyber-border rounded p-2 text-center">
      <div className={`text-xl font-display font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 font-mono mt-1">{label}</div>
    </div>
  )
}
