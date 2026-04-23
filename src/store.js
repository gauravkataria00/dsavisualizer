import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // Algorithm state
  algorithm: 'bubble',
  category: 'sorting',
  isRunning: false,
  isPaused: false,
  speed: 500, // ms delay
  array: [],
  arraySize: 20,
  
  // Visualization state
  comparingIndices: [],
  swappingIndices: [],
  sortedIndices: [],
  foundIndex: -1,
  currentStep: 0,
  totalSteps: 0,
  
  // Log
  logs: [],
  
  // Code highlight
  activeLine: -1,
  
  // Stats
  comparisons: 0,
  swaps: 0,

  // Live explanation
  explanation: 'Click START to begin visualization',
  
  // Actions
  setAlgorithm: (algorithm) => set({ algorithm }),
  setCategory: (category) => set({ category }),
  setSpeed: (speed) => set({ speed }),
  setArraySize: (size) => set({ arraySize: size }),
  setIsRunning: (v) => set({ isRunning: v }),
  setIsPaused: (v) => set({ isPaused: v }),
  
  generateArray: (size) => {
    const s = size || get().arraySize
    const arr = Array.from({ length: s }, () => Math.floor(Math.random() * 90) + 10)
    set({ 
      array: arr, 
      comparingIndices: [], 
      swappingIndices: [], 
      sortedIndices: [],
      foundIndex: -1,
      logs: [],
      comparisons: 0,
      swaps: 0,
      currentStep: 0,
      totalSteps: 0,
      activeLine: -1,
      explanation: 'New array generated. Click START to visualize.'
    })
  },
  
  setArray: (arr) => set({ array: arr }),
  setComparingIndices: (i) => set({ comparingIndices: i }),
  setSwappingIndices: (i) => set({ swappingIndices: i }),
  setSortedIndices: (i) => set({ sortedIndices: i }),
  setFoundIndex: (i) => set({ foundIndex: i }),
  setActiveLine: (i) => set({ activeLine: i }),
  setCurrentStep: (v) => set({ currentStep: v }),
  setTotalSteps: (v) => set({ totalSteps: v }),
  setExplanation: (msg) => set({ explanation: msg }),
  
  addLog: (msg, type = 'info') => set(s => ({ 
    logs: [...s.logs.slice(-30), { msg, type, id: Date.now() + Math.random() }] 
  })),
  
  incrementComparisons: () => set(s => ({ comparisons: s.comparisons + 1 })),
  incrementSwaps: () => set(s => ({ swaps: s.swaps + 1 })),
  
  reset: () => set({
    isRunning: false, isPaused: false,
    comparingIndices: [], swappingIndices: [], sortedIndices: [],
    foundIndex: -1, logs: [], comparisons: 0, swaps: 0, currentStep: 0, totalSteps: 0, activeLine: -1,
    explanation: 'Visualization reset. Click START to run again.'
  }),
}))
