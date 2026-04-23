// Returns array of animation steps for sorting algorithms

export function getBubbleSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1], array: [...a], line: 3 })
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({ type: 'swap', indices: [j, j + 1], array: [...a], line: 4 })
      }
    }
    steps.push({ type: 'sorted', index: n - i - 1, array: [...a], line: 2 })
  }
  steps.push({ type: 'sorted', index: 0, array: [...a], line: 6 })
  steps.push({ type: 'done', array: [...a], line: -1 })
  return steps
}

export function getSelectionSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: 'compare', indices: [minIdx, j], array: [...a], line: 3 })
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push({ type: 'swap', indices: [i, minIdx], array: [...a], line: 5 })
    }
    steps.push({ type: 'sorted', index: i, array: [...a], line: 6 })
  }
  steps.push({ type: 'sorted', index: n - 1, array: [...a], line: 6 })
  steps.push({ type: 'done', array: [...a], line: -1 })
  return steps
}

export function getInsertionSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  steps.push({ type: 'sorted', index: 0, array: [...a], line: 1 })
  for (let i = 1; i < n; i++) {
    let key = a[i]
    let j = i - 1
    steps.push({ type: 'compare', indices: [i, j], array: [...a], line: 3 })
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j]
      steps.push({ type: 'swap', indices: [j, j + 1], array: [...a], line: 5 })
      j--
    }
    a[j + 1] = key
    steps.push({ type: 'sorted', index: i, array: [...a], line: 6 })
  }
  steps.push({ type: 'done', array: [...a], line: -1 })
  return steps
}

export function getMergeSortSteps(arr) {
  const steps = []
  const a = [...arr]

  function merge(arr, l, m, r) {
    const left = arr.slice(l, m + 1)
    const right = arr.slice(m + 1, r + 1)
    let i = 0, j = 0, k = l
    while (i < left.length && j < right.length) {
      steps.push({ type: 'compare', indices: [l + i, m + 1 + j], array: [...arr], line: 5 })
      if (left[i] <= right[j]) { arr[k++] = left[i++] }
      else { arr[k++] = right[j++] }
      steps.push({ type: 'swap', indices: [k - 1], array: [...arr], line: 6 })
    }
    while (i < left.length) { arr[k++] = left[i++] }
    while (j < right.length) { arr[k++] = right[j++] }
    for (let x = l; x <= r; x++) steps.push({ type: 'sorted', index: x, array: [...arr], line: 8 })
  }

  function mergeSort(arr, l, r) {
    if (l >= r) return
    const m = Math.floor((l + r) / 2)
    mergeSort(arr, l, m)
    mergeSort(arr, m + 1, r)
    merge(arr, l, m, r)
  }

  mergeSort(a, 0, a.length - 1)
  steps.push({ type: 'done', array: [...a], line: -1 })
  return steps
}

export function getQuickSortSteps(arr) {
  const steps = []
  const a = [...arr]

  function partition(arr, low, high) {
    const pivot = arr[high]
    let i = low - 1
    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high], array: [...arr], line: 4 })
      if (arr[j] < pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        steps.push({ type: 'swap', indices: [i, j], array: [...arr], line: 6 })
      }
    }
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    steps.push({ type: 'swap', indices: [i + 1, high], array: [...arr], line: 8 })
    steps.push({ type: 'sorted', index: i + 1, array: [...arr], line: 9 })
    return i + 1
  }

  function quickSort(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high)
      quickSort(arr, low, pi - 1)
      quickSort(arr, pi + 1, high)
    }
  }

  quickSort(a, 0, a.length - 1)
  steps.push({ type: 'done', array: [...a], line: -1 })
  return steps
}

export function getLinearSearchSteps(arr, target) {
  const steps = []
  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: 'compare', indices: [i], array: [...arr], line: 2 })
    if (arr[i] === target) {
      steps.push({ type: 'found', index: i, array: [...arr], line: 3 })
      steps.push({ type: 'done', array: [...arr], line: -1 })
      return steps
    }
  }
  steps.push({ type: 'notfound', array: [...arr], line: 5 })
  steps.push({ type: 'done', array: [...arr], line: -1 })
  return steps
}

export function getBinarySearchSteps(arr, target) {
  const steps = []
  const sorted = [...arr].sort((a, b) => a - b)
  let low = 0, high = sorted.length - 1
  steps.push({ type: 'info', msg: 'Array sorted for binary search', array: [...sorted], line: 1 })
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    steps.push({ type: 'compare', indices: [low, mid, high], array: [...sorted], line: 3 })
    if (sorted[mid] === target) {
      steps.push({ type: 'found', index: mid, array: [...sorted], line: 4 })
      steps.push({ type: 'done', array: [...sorted], line: -1 })
      return steps
    } else if (sorted[mid] < target) {
      low = mid + 1
      steps.push({ type: 'info', msg: `Target > mid, search right`, array: [...sorted], line: 6 })
    } else {
      high = mid - 1
      steps.push({ type: 'info', msg: `Target < mid, search left`, array: [...sorted], line: 8 })
    }
  }
  steps.push({ type: 'notfound', array: [...sorted], line: 10 })
  steps.push({ type: 'done', array: [...sorted], line: -1 })
  return steps
}
