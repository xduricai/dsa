package trees

import (
	"errors"

	. "golang.org/x/exp/constraints"
)

var ErrValueNotInTree = errors.New("Specified value is not present in the tree")
var ErrOnlyValueInTree = errors.New("Cannot delete the only value inside the tree")

// BinarySearchNode represents a node in a binary search tree (BST)
type BinarySearchNode[T Ordered] struct {
	value T
	Left  *BinarySearchNode[T]
	Right *BinarySearchNode[T]
}

// NewBinarySearchNode returns a new BinarySearchNode containing the given value
func NewBinarySearchNode[T Ordered](value T) *BinarySearchNode[T] {
	return &BinarySearchNode[T]{
		value: value,
		Left:  nil,
		Right: nil,
	}
}

// Value returns the value of a given node
func (node *BinarySearchNode[T]) Value() T {
	return node.value
}

// Find checks whether a value is present in the binary search tree
func (node *BinarySearchNode[T]) Find(value T) bool {
	if value == node.value {
		return true
	}
	if value <= node.value && node.Left != nil {
		return node.Left.Find(value)
	}
	if value > node.value && node.Right != nil {
		return node.Right.Find(value)
	}

	return false
}

// Insert inserts a value into the binary search tree
func (node *BinarySearchNode[T]) Insert(value T) {
	if value <= node.value {
		if node.Left != nil {
			node.Left.Insert(value)
		} else {
			node.Left = NewBinarySearchNode[T](value)
		}
	} else {
		if node.Right != nil {
			node.Right.Insert(value)
		} else {
			node.Right = NewBinarySearchNode[T](value)
		}
	}
}

// Delete is a wrapper method for node deletion
func (node *BinarySearchNode[T]) Delete(value T) error {
	return node.deleteNode(nil, value)
}

// deleteNode removes the first node with a given value from the binary search tree
func (node *BinarySearchNode[T]) deleteNode(parent *BinarySearchNode[T], value T) error {
	if value < node.value {
		if node.Left == nil {
			return ErrValueNotInTree
		}
		return node.Left.deleteNode(node, value)
	}
	if value > node.value {
		if node.Right == nil {
			return ErrValueNotInTree
		}
		return node.Right.deleteNode(node, value)
	}

	if node.Left == nil && node.Right == nil {
		if parent == nil {
			return ErrOnlyValueInTree
		}

		if node.value <= parent.value {
			parent.Left = nil
		} else {
			parent.Right = nil
		}
		return nil
	}

	if node.Left == nil {
		if node.value <= parent.value {
			parent.Left = node.Right
		} else {
			parent.Right = node.Right
		}
		return nil
	}

	if node.Right == nil {
		if node.value <= parent.value {
			parent.Left = node.Left
		} else {
			parent.Right = node.Left
		}
		return nil
	}

	parent = node
	current := node.Right

	for current.Left != nil {
		parent = current
		current = current.Left
	}

	parent.Left = current.Right
	node.value = current.value
	return nil
}
