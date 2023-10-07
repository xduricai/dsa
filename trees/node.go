package trees

type BinaryNode[T any] struct {
	value T
	Left  *BinaryNode[T]
	Right *BinaryNode[T]
}

func NewBinaryNode[T any](value T) *BinaryNode[T] {
	return &BinaryNode[T]{
		value: value,
		Left:  nil,
		Right: nil,
	}
}
