package trees

// BinaryNode represents a node in a binary tree
type BinaryNode[T any] struct {
	value T
	Left  *BinaryNode[T]
	Right *BinaryNode[T]
}

// NewBinaryNode returns a new BinaryNode containing the given value
func NewBinaryNode[T any](value T) *BinaryNode[T] {
	return &BinaryNode[T]{
		value: value,
		Left:  nil,
		Right: nil,
	}
}

// Set overwrites the value in a given node
func (node *BinaryNode[T]) Set(value T) {
	node.value = value
}

// Value returns the value of a given node
func (node *BinaryNode[T]) Value() T {
	return node.value
}
