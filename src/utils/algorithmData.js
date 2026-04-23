export const ALGORITHMS = {
  sorting: {
    bubble: {
      name: 'Bubble Sort',
      timeComplexity: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      code: [
        'function bubbleSort(arr) {',
        '  for (let i = 0; i < n-1; i++) {',
        '    for (let j = 0; j < n-i-1; j++) {',
        '      if (arr[j] > arr[j+1])',
        '        swap(arr[j], arr[j+1])',
        '    }',
        '  }',
        '}'
      ]
    },
    selection: {
      name: 'Selection Sort',
      timeComplexity: { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stable: false,
      description: 'Finds the minimum element from the unsorted portion and places it at the beginning.',
      code: [
        'function selectionSort(arr) {',
        '  for (let i = 0; i < n-1; i++) {',
        '    let minIdx = i',
        '    for (let j = i+1; j < n; j++)',
        '      if (arr[j] < arr[minIdx]) minIdx = j',
        '    swap(arr[i], arr[minIdx])',
        '    markSorted(i)',
        '  }',
        '}'
      ]
    },
    insertion: {
      name: 'Insertion Sort',
      timeComplexity: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Builds the sorted array one element at a time by inserting each element into its correct position.',
      code: [
        'function insertionSort(arr) {',
        '  for (let i = 1; i < n; i++) {',
        '    let key = arr[i]',
        '    let j = i - 1',
        '    while (j >= 0 && arr[j] > key)',
        '      arr[j+1] = arr[j--]',
        '    arr[j+1] = key',
        '  }',
        '}'
      ]
    },
    merge: {
      name: 'Merge Sort',
      timeComplexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(n)',
      stable: true,
      description: 'Divides the array into halves, sorts each half, then merges them back together.',
      code: [
        'function mergeSort(arr, l, r) {',
        '  if (l >= r) return',
        '  let m = Math.floor((l+r)/2)',
        '  mergeSort(arr, l, m)',
        '  mergeSort(arr, m+1, r)',
        '  merge(arr, l, m, r)',
        '  markMerged(l, r)',
        '}'
      ]
    },
    quick: {
      name: 'Quick Sort',
      timeComplexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)' },
      spaceComplexity: 'O(log n)',
      stable: false,
      description: 'Picks a pivot element and partitions the array around it, recursively sorting each partition.',
      code: [
        'function quickSort(arr, low, high) {',
        '  if (low < high) {',
        '    let pi = partition(arr, low, high)',
        '    if (arr[j] < pivot) {',
        '      i++',
        '      swap(arr[i], arr[j])',
        '    }',
        '    swap(arr[i+1], arr[high])',
        '    markPivot(i+1)',
        '  }',
        '}'
      ]
    },
  },
  searching: {
    linear: {
      name: 'Linear Search',
      timeComplexity: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Sequentially checks each element until a match is found or the list ends.',
      code: [
        'function linearSearch(arr, target) {',
        '  for (let i = 0; i < n; i++) {',
        '    if (arr[i] === target)',
        '      return i   // Found!',
        '  }',
        '  return -1   // Not found',
        '}'
      ]
    },
    binary: {
      name: 'Binary Search',
      timeComplexity: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Efficiently searches a sorted array by repeatedly halving the search space.',
      code: [
        'function binarySearch(arr, target) {',
        '  let low=0, high=n-1',
        '  while (low <= high) {',
        '    let mid = (low+high) >> 1',
        '    if (arr[mid]===target) return mid',
        '    if (arr[mid] < target)',
        '      low = mid + 1',
        '    else',
        '      high = mid - 1',
        '  }',
        '  return -1',
        '}'
      ]
    }
  }
}
