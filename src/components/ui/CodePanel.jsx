import { useStore } from '../../store'
import { ALGORITHMS } from '../../utils/algorithmData'

export default function CodePanel() {
  const { algorithm, category, activeLine } = useStore()
  const algoData = ALGORITHMS[category]?.[algorithm]

  if (!algoData) return null

  return (
    <div className="cyber-panel p-4 h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
        <span className="font-display text-sm text-cyber-cyan tracking-widest">CODE</span>
      </div>
      
      <div className="code-display">
        {algoData.code.map((line, i) => (
          <div
            key={i}
            className={`code-line ${activeLine === i ? 'active' : ''}`}
          >
            <span className="text-cyber-border mr-3 select-none">{String(i + 1).padStart(2, '0')}</span>
            <span>{line}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-cyber-border">
        <p className="text-sm text-slate-300/80 font-body leading-relaxed">
          {algoData.description}
        </p>
      </div>
    </div>
  )
}
