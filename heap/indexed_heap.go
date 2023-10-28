package heap

import . "golang.org/x/exp/constraints"

// node represents a node of the heap, containing getter values for the key and value attributes as well as a setter for the value attribute
type node[K Ordered, V Ordered] interface {
	Key() K
	Value() V
	SetValue(V)
}

// IndexedMinHeap is a struct representing a an indexed MinHeap which uses a map to keep track of where specific elements are currently located inside of the heap
type IndexedMinHeap[K Ordered, V Ordered] struct {
	length  int
	data    []node[K, V]
	indexer map[K]int
}

// NewIndexedMinHeap is a constructor function for an indexed MinHeap
func NewIndexedMinHeap[K Ordered, V Ordered]() *IndexedMinHeap[K, V] {
	return &IndexedMinHeap[K, V]{
		length:  0,
		data:    []node[K, V]{},
		indexer: map[K]int{},
	}
}

// Length returns the number of items in the heap
func (heap *IndexedMinHeap[K, V]) Length() int {
	return heap.length
}

// Insert inserts a new value into the heap
func (heap *IndexedMinHeap[K, V]) Insert(value node[K, V]) {
	heap.data = append(heap.data, value)
	heap.indexer[value.Key()] = heap.length
	heap.heapifyUp(heap.length)
	heap.length++
}

// Get takes in a key and returns the heap node mapped to the key
func (heap *IndexedMinHeap[K, V]) Get(key K) (node[K, V], error) {
	idx, exists := heap.indexer[key]
	if !exists {
		return *new(node[K, V]), ErrNodeNotInHeap
	}
	return heap.data[idx], nil
}

// Update takes in a key and a value, updates the value of a heap node mapped to the key, then sorts the heap
func (heap *IndexedMinHeap[K, V]) Update(key K, value V) {
	idx, exists := heap.indexer[key]
	if !exists {
		return
	}

	node := heap.data[idx]
	oldValue := node.Value()
	node.SetValue(value)

	if value < oldValue {
		heap.heapifyUp(idx)
	} else if value > oldValue {
		heap.heapifyDown(idx)
	}
}

// Delete deletes a value from the root of the heap
func (heap *IndexedMinHeap[K, V]) Delete() (node[K, V], error) {
	if heap.length == 0 {
		return *new(node[K, V]), ErrDeleteFromEmptyHeap
	}

	out := heap.data[0]
	delete(heap.indexer, out.Key())
	heap.length--

	if heap.length == 0 {
		heap.data = []node[K, V]{}
		return out, nil
	}

	heap.data[0] = heap.data[heap.length]
	heap.data = heap.data[:heap.length]
	heap.indexer[heap.data[0].Key()] = 0
	heap.heapifyDown(0)

	return out, nil
}

// heapifyUp starts at the end of the heap and recursively bubbles the smallest value inside the heap to the top
func (heap *IndexedMinHeap[K, V]) heapifyUp(idx int) {
	if idx == 0 {
		return
	}

	pIdx := parent(idx)
	node := heap.data[idx]
	parent := heap.data[pIdx]

	if parent.Value() > node.Value() {
		heap.data[idx] = parent
		heap.data[pIdx] = node
		heap.indexer[parent.Key()] = idx
		heap.indexer[node.Key()] = pIdx
		heap.heapifyUp(pIdx)
	}
}

// heapifyDown starts at the top of the heap and recursively bubbles a value to its appropriate position inside the heap
func (heap *IndexedMinHeap[K, V]) heapifyDown(idx int) {
	lIdx := leftChild(idx)
	rIdx := rightChild(idx)

	if idx >= heap.length || lIdx >= heap.length {
		return
	}

	node := heap.data[idx]
	lChild := heap.data[lIdx]

	if rIdx == heap.length {
		if node.Value() > lChild.Value() {
			heap.data[idx] = lChild
			heap.data[lIdx] = node
			heap.indexer[lChild.Key()] = idx
			heap.indexer[node.Key()] = lIdx
		}
		return
	}

	rChild := heap.data[rIdx]

	if lChild.Value() > rChild.Value() && node.Value() > rChild.Value() {
		heap.data[idx] = rChild
		heap.data[rIdx] = node
		heap.indexer[rChild.Key()] = idx
		heap.indexer[node.Key()] = rIdx
		heap.heapifyDown(rIdx)
	} else if node.Value() > lChild.Value() {
		heap.data[idx] = lChild
		heap.data[lIdx] = node
		heap.indexer[lChild.Key()] = idx
		heap.indexer[node.Key()] = lIdx
		heap.heapifyDown(lIdx)
	}
}
