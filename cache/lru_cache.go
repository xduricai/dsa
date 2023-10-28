package cache

import (
	"errors"

	. "golang.org/x/exp/constraints"
)

var ErrKeyNotInCache = errors.New("A value mapped to the given key is not present in the cache")

// Node represents a doubly-linked list node used by the cache
type Node[T Ordered] struct {
	value    T
	next     *Node[T]
	previous *Node[T]
}

// LRU represents a least-recently-used cache
type LRU[K Ordered, V Ordered] struct {
	length        int
	capacity      int
	head          *Node[V]
	tail          *Node[V]
	lookup        map[K]*Node[V]
	reverseLookup map[*Node[V]]K
}

// NewNode returns a new Node containing a given value
func NewNode[T Ordered](value T) *Node[T] {
	return &Node[T]{
		value:    value,
		next:     nil,
		previous: nil,
	}
}

// NewLRU returns a new LRU Cache struct with a given capacity
func NewLRU[K Ordered, V Ordered](capacity int) *LRU[K, V] {
	return &LRU[K, V]{
		length:        0,
		capacity:      capacity,
		head:          nil,
		tail:          nil,
		lookup:        map[K]*Node[V]{},
		reverseLookup: map[*Node[V]]K{},
	}
}

func (cache *LRU[K, V]) Update(key K, value V) {
	node, exists := cache.lookup[key]

	if exists {
		cache.detach(node)
		cache.prepend(node)
		node.value = value
		return
	}

	node = NewNode[V](value)
	cache.lookup[key] = node
	cache.reverseLookup[node] = key
	cache.prepend(node)
	cache.trimCache()
}

// Get fetches a value from the cache and updates the position of the node inside of the cache
func (cache *LRU[K, V]) Get(key K) (V, error) {
	node, exists := cache.lookup[key]

	if !exists {
		return *new(V), ErrKeyNotInCache
	}
	cache.detach(node)
	cache.prepend(node)

	return node.value, nil
}

// Length returns the number of nodes in the cache
func (cache *LRU[K, V]) Length() int {
	return cache.length
}

// Capacity returns the capacity of the cache
func (cache *LRU[K, V]) Capacity() int {
	return cache.capacity
}

// detach detaches a node form the linked list
func (cache *LRU[K, V]) detach(node *Node[V]) {
	if node.next != nil {
		node.next.previous = node.previous
	}
	if node.previous != nil {
		node.previous.next = node.next
	}
	if node == cache.head {
		cache.head = node.next
	}
	if node == cache.tail {
		cache.tail = node.previous
	}

	node.next = nil
	node.previous = nil
	cache.length--
}

// prepend adds a node to the start of the linked list and updates the head
func (cache *LRU[K, V]) prepend(node *Node[V]) {
	cache.length++

	if cache.head == nil {
		cache.head = node
		cache.tail = node
		return
	}

	node.next = cache.head
	cache.head.previous = node
	cache.head = node
}

// trimCache checks the length of the cache and removes a node if it exceeds capacity
func (cache *LRU[K, V]) trimCache() {
	if cache.length <= cache.capacity {
		return
	}
	tail := cache.tail
	key := cache.reverseLookup[tail]

	delete(cache.lookup, key)
	delete(cache.reverseLookup, tail)
	cache.detach(tail)
}
