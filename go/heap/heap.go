package heap

import . "golang.org/x/exp/constraints"

// MinHeap is a struct representing a MinHeap
type MinHeap[T Ordered] struct {
	length int
	data   []T
}

// NewMinHeap is a constructor function for a MinHeap, it takes in a function which decides which compares 2 values of type T
func NewMinHeap[T Ordered]() *MinHeap[T] {
	return &MinHeap[T]{
		length: 0,
		data:   []T{},
	}
}

// Length returns the number of items in the heap
func (heap *MinHeap[T]) Length() int {
	return heap.length
}

// Insert inserts a new value into the MinHeap
func (heap *MinHeap[T]) Insert(value T) {
	heap.data = append(heap.data, value)
	heap.heapifyUp(heap.length)
	heap.length++
}

// Delete deletes the first value in the MinHeap
func (heap *MinHeap[T]) Delete() (T, error) {
	if heap.length == 0 {
		return *new(T), ErrDeleteFromEmptyHeap
	}

	out := heap.data[0]
	heap.length--

	if heap.length == 0 {
		heap.data = []T{}
		return out, nil
	}

	heap.data[0] = heap.data[heap.length]
	heap.data = heap.data[:heap.length]
	heap.heapifyDown(0)

	return out, nil
}

// heapifyUp starts at the end of the heap and recursively bubbles the smallest value inside the heap to the top
func (heap *MinHeap[T]) heapifyUp(idx int) {
	if idx == 0 {
		return
	}

	pIdx := parent(idx)
	value := heap.data[idx]
	parentValue := heap.data[pIdx]

	if parentValue > value {
		heap.data[idx] = parentValue
		heap.data[pIdx] = value
		heap.heapifyUp(pIdx)
	}
}

// heapifyDown starts at the top of the heap and recursively bubbles a value to its appropriate position inside the heap
func (heap *MinHeap[T]) heapifyDown(idx int) {
	lIdx := leftChild(idx)
	rIdx := rightChild(idx)

	if idx >= heap.length || lIdx >= heap.length {
		return
	}

	value := heap.data[idx]
	lValue := heap.data[lIdx]

	if rIdx == heap.length {
		if value > lValue {
			heap.data[idx] = lValue
			heap.data[lIdx] = value
		}
		return
	}

	rValue := heap.data[rIdx]

	if lValue > rValue && value > rValue {
		heap.data[idx] = rValue
		heap.data[rIdx] = value
		heap.heapifyDown(rIdx)
	} else if value > lValue {
		heap.data[idx] = lValue
		heap.data[lIdx] = value
		heap.heapifyDown(lIdx)
	}
}
