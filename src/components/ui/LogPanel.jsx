import { useStore } from '../../store'
import { useEffect, useRef } from 'react'

export default function LogPanel() {
  const { logs } = useStore()
  const endRef = useRef()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="cyber-panel p-3 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
        <span className="font-display text-xs text-cyber-green tracking-widest">LOG</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-0.5">
        {logs.length === 0 && (
          <p className="text-xs text-slate-600 font-mono italic p-2">
            &gt; Awaiting execution...
          </p>
        )}
        {logs.map((log) => (
          <div key={log.id} className={`log-entry ${log.type}`}>
            &gt; {log.msg}
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  )
}
