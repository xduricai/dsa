package heap

import "errors"

var ErrNodeNotInHeap = errors.New("A node with the given key is not present in the heap")
var ErrDeleteFromEmptyHeap = errors.New("Cannot delete from an empty heap")

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
