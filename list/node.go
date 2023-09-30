package list

import "fmt"

// Node represents a node in a linked list
type Node[T any] struct {
	value T
	next  *Node[T]
}

// NodeDL represents a node in a doubly-linked list
type NodeDL[T any] struct {
	value    T
	next     *NodeDL[T]
	previous *NodeDL[T]
}

// newNode is a utility method for creating new linked list nodes
func newNode[T any](value T) *Node[T] {
	return &Node[T]{
		value: value,
		next:  nil,
	}
}

// newNodeDL is a utility method for creating new doubly-linked list nodes
func newNodeDL[T any](value T) *NodeDL[T] {
	return &NodeDL[T]{
		value:    value,
		next:     nil,
		previous: nil,
	}
}

// String is a stringer method for printing the value of the node
func (node *Node[T]) String() string {
	return fmt.Sprintf("Node value:\n %s\n", node.value)
}

// String is a stringer method for printing the value of the node
func (node *NodeDL[T]) String() string {
	return fmt.Sprintf("Node value:\n %s\n", node.value)
}
