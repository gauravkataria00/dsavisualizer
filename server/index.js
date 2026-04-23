import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Generate random array
app.get('/api/array', (req, res) => {
  const size = Math.min(Math.max(parseInt(req.query.size) || 20, 5), 100)
  const min = parseInt(req.query.min) || 10
  const max = parseInt(req.query.max) || 99
  const array = Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  )
  res.json({ array, size })
})

// Algorithm info
app.get('/api/algorithms', (req, res) => {
  res.json({
    sorting: ['bubble', 'selection', 'insertion', 'merge', 'quick'],
    searching: ['linear', 'binary'],
  })
})

// Sort endpoint (server-side for verification)
app.post('/api/sort', (req, res) => {
  const { array, algorithm } = req.body
  if (!array || !Array.isArray(array)) {
    return res.status(400).json({ error: 'Invalid array' })
  }

  let sorted = [...array]
  let comparisons = 0
  let swaps = 0

  switch (algorithm) {
    case 'bubble':
      for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
          comparisons++
          if (sorted[j] > sorted[j + 1]) {
            ;[sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]]
            swaps++
          }
        }
      }
      break
    case 'quick':
      sorted.sort((a, b) => { comparisons++; return a - b })
      break
    default:
      sorted.sort((a, b) => a - b)
  }

  res.json({ sorted, comparisons, swaps, algorithm })
})

// Search endpoint
app.post('/api/search', (req, res) => {
  const { array, target, algorithm } = req.body
  if (!array || !Array.isArray(array)) {
    return res.status(400).json({ error: 'Invalid array' })
  }

  let index = -1
  let comparisons = 0

  if (algorithm === 'binary') {
    const sorted = [...array].sort((a, b) => a - b)
    let low = 0, high = sorted.length - 1
    while (low <= high) {
      comparisons++
      const mid = Math.floor((low + high) / 2)
      if (sorted[mid] === target) { index = mid; break }
      else if (sorted[mid] < target) low = mid + 1
      else high = mid - 1
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      comparisons++
      if (array[i] === target) { index = i; break }
    }
  }

  res.json({ index, found: index !== -1, comparisons, algorithm, target })
})

app.listen(PORT, () => {
  console.log(`\n🚀 DSA Visualizer API running at http://localhost:${PORT}`)
  console.log(`   GET  /api/array?size=20&min=10&max=99`)
  console.log(`   GET  /api/algorithms`)
  console.log(`   POST /api/sort   { array, algorithm }`)
  console.log(`   POST /api/search { array, target, algorithm }\n`)
})
