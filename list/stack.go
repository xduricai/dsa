package list

import (
	"errors"
	"fmt"
)

// Stack represents a wrapper for a stack struct
type Stack[T any] struct {
	head   *Node[T]
	length int
}

// NewStack is a constructor method that returns a new stack struct
func NewStack[T any]() *Stack[T] {
	return &Stack[T]{
		head:   nil,
		length: 0,
	}
}

// Push adds an element to the top of the stack
func (stack *Stack[T]) Push(value T) {
	stack.length++
	node := newNode[T](value)
	node.next = stack.head
	stack.head = node
}

// Pop removes the top element of the stack
func (stack *Stack[T]) Pop() (T, error) {
	if stack.length == 0 {
		return *new(T), errors.New("Cannot pop from an empty stack")
	}

	stack.length--
	value := stack.head.value
	stack.head = stack.head.next
	return value, nil
}

// Peak returns the first element of the stack
func (stack *Stack[T]) Peek() (T, error) {
	if stack.head == nil {
		return *new(T), errors.New("Stack is empty")
	}

	return stack.head.value, nil
}

// Length returns the length of the stack
func (stack *Stack[T]) Length() int {
	return stack.length
}

// String is a stringer method for printing the stack
func (stack *Stack[T]) String() string {
	message := fmt.Sprintf("Stack of length: %d\n", stack.length)
	message += "["

	for node := stack.head; node != nil; node = node.next {
		message += fmt.Sprintf("%v", node.value)
		if node.next != nil {
			message += ", "
		}
	}

	message += "]"
	return message
}
