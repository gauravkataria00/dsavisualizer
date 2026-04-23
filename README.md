# 🚀 DSA Visualizer 3D

A cyberpunk-themed 3D Data Structures & Algorithms visualizer built with **React + Vite + Tailwind + Three.js + Node.js**.

---

## ✨ Features

- **3D animated bar charts** via React Three Fiber (WebGL)
- **5 Sorting algorithms**: Bubble, Selection, Insertion, Merge, Quick Sort
- **2 Searching algorithms**: Linear Search, Binary Search
- Real-time **step-by-step code highlighting**
- Live **complexity analysis** panel
- **Operation log** with color-coded events
- **Adjustable speed & array size**
- Pause / Resume support
- Node.js **REST API backend** for server-side operations

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Install dependencies
```bash
npm install
```

### 2. Run both frontend + backend together
```bash
npm start
```

Or separately:
```bash
# Frontend (Vite dev server at http://localhost:5173)
npm run dev

# Backend (Express API at http://localhost:3001)
npm run server
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/array?size=20` | Generate random array |
| GET | `/api/algorithms` | List all algorithms |
| POST | `/api/sort` | Sort array server-side |
| POST | `/api/search` | Search array server-side |

### Example API Usage

```bash
# Generate array
curl http://localhost:3001/api/array?size=15

# Sort with bubble sort
curl -X POST http://localhost:3001/api/sort \
  -H "Content-Type: application/json" \
  -d '{"array":[5,3,8,1,9,2],"algorithm":"bubble"}'

# Binary search
curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{"array":[5,3,8,1,9,2],"target":8,"algorithm":"binary"}'
```

---

## 🎮 How to Use

1. **Select a Category** — Sorting or Searching
2. **Pick an Algorithm** — from the control bar
3. **Set Array Size & Speed** — using the sliders
4. **Click GENERATE** — to create a new random array
5. **Click ▶ START** — to begin visualization
6. **Rotate the 3D view** — click and drag on the canvas
7. **Pause / Resume** — mid-animation
8. **Reset** — stops and generates a fresh array

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| 3D Graphics | Three.js + React Three Fiber + Drei |
| State | Zustand |
| Backend | Node.js + Express |
| Fonts | Orbitron, Syne, JetBrains Mono |

---

## 📁 Project Structure

```
dsa-visualizer/
├── src/
│   ├── components/
│   │   ├── visualizers/
│   │   │   └── BarVisualizer.jsx    # 3D Three.js bars
│   │   └── ui/
│   │       ├── ControlPanel.jsx     # Algorithm controls
│   │       ├── CodePanel.jsx        # Live code highlight
│   │       ├── InfoPanel.jsx        # Complexity info
│   │       └── LogPanel.jsx         # Operation log
│   ├── pages/
│   │   └── VisualizerPage.jsx       # Main page + orchestration
│   ├── utils/
│   │   ├── algorithms.js            # All algorithm step generators
│   │   └── algorithmData.js         # Metadata, code snippets
│   ├── store.js                     # Zustand global state
│   ├── App.jsx
│   └── main.jsx
├── server/
│   └── index.js                     # Express REST API
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```
