package heap

import (
	"errors"

	. "golang.org/x/exp/constraints"
)

var ErrDeleteFromEmptyHeap = errors.New("Cannot delete from an empty heap")

// MinHeap is a struct representing a MinHeap
type MinHeap[T Ordered] struct {
	length      int
	data        []T
	greaterThan func(T, T) bool
}

// NewMinHeap is a constructor function for a MinHeap, it takes in a function which decides which compares 2 values of type T
func NewMinHeap[T Ordered](greaterThan func(T, T) bool) *MinHeap[T] {
	return &MinHeap[T]{
		length:      0,
		data:        []T{},
		greaterThan: greaterThan,
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

// Delete deletes the last value in the MinHeap
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
		if heap.greaterThan(value, lValue) {
			heap.data[idx] = lValue
			heap.data[lIdx] = value
		}
		return
	}

	rValue := heap.data[rIdx]

	if heap.greaterThan(lValue, rValue) && heap.greaterThan(value, rValue) {
		heap.data[idx] = rValue
		heap.data[rIdx] = value
		heap.heapifyDown(rIdx)
	} else if heap.greaterThan(value, lValue) {
		heap.data[idx] = lValue
		heap.data[lIdx] = value
		heap.heapifyDown(lIdx)
	}
}

// parent uses an index of an item in the heap to calculate the index of its parent
func parent(idx int) int {
	return (idx - 1) / 2
}

// leftChild uses an index of an item in the heap to calculate the index of its left child
func leftChild(idx int) int {
	return idx*2 + 1
}

// rightChild uses an index of an item in the heap to calculate the index of its right child
func rightChild(idx int) int {
	return idx*2 + 2
}
