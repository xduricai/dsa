package list

import (
	"errors"
	"fmt"
)

// LinkedList represents a wrapper for a linked list struct
type LinkedList[T any] struct {
	head   *NodeDL[T]
	tail   *NodeDL[T]
	length int
}

// NewList is a constructor-style method for a linked list struct
func NewList[T any]() *LinkedList[T] {
	return &LinkedList[T]{
		head:   nil,
		tail:   nil,
		length: 0,
	}
}

// getNodeAt is a utility method for fetching a list node at a specified index
func (list *LinkedList[T]) getNodeAt(index int) *NodeDL[T] {
	current := list.head
	for count := 0; count < index; count++ {
		current = current.next
	}
	return current
}

// Length returns the length of the list
func (list *LinkedList[T]) Length() int {
	return list.length
}

// Append appends an element to the end of the list
func (list *LinkedList[T]) Append(value T) {
	list.length++
	node := newNodeDL[T](value)

	if list.head == nil {
		list.head = node
	} else {
		list.tail.next = node
		node.previous = list.tail
	}
	list.tail = node
}

// Prepend prepends a value to the start of the list
func (list *LinkedList[T]) Prepend(value T) {
	list.length++
	node := newNodeDL[T](value)

	if list.head == nil {
		list.tail = node
	} else {
		node.next = list.head
		list.head.previous = node
	}
	list.head = node
}

// InsertAt inserts a value at a specified index of the list
func (list *LinkedList[T]) InsertAt(value T, index int) error {
	if index < 0 || index > list.length {
		return errors.New("Index outside of list bounds")
	}
	if index == 0 {
		list.Prepend(value)
		return nil
	}
	if index == list.length {
		list.Append(value)
		return nil
	}

	list.length++
	target := list.getNodeAt(index)
	node := newNodeDL[T](value)

	target.previous.next = node
	node.previous = target.previous
	node.next = target
	target.previous = node

	return nil
}

// Pop removes the last element of the list and returns it
func (list *LinkedList[T]) Pop() (T, error) {
	if list.length == 0 {
		return *new(T), errors.New("Cannot pop from an empty list")
	}

	list.length--
	value := list.tail.value
	list.tail = list.tail.previous

	if list.length == 0 {
		list.head = nil
	} else {
		list.tail.next = nil
	}

	return value, nil
}

// Remove removes the first element of the list and returns it

func (list *LinkedList[T]) Remove() (T, error) {
	if list.length == 0 {
		return *new(T), errors.New("Cannot remove from an empty list")
	}

	list.length--
	value := list.head.value
	list.head = list.head.next

	if list.length == 0 {
		list.tail = nil
	} else {
		list.head.previous = nil
	}

	return value, nil
}

// RemoveAt removes an element of the list at the specified index and returns it
func (list *LinkedList[T]) RemoveAt(index int) (T, error) {
	if index < 0 || index >= list.length {
		return *new(T), errors.New("Index outside of list bounds")
	}
	if index == 0 {
		return list.Remove()
	}
	if index == list.length-1 {
		return list.Pop()
	}

	list.length--
	target := list.getNodeAt(index)
	target.previous.next = target.next
	target.next.previous = target.previous

	return target.value, nil
}

// Get fetches an element at a specified index from the list
func (list *LinkedList[T]) Get(index int) (T, error) {
	if index < 0 || index > list.length {
		return *new(T), errors.New("Index outside of list bounds")
	}

	target := list.getNodeAt(index)
	return target.value, nil
}

// String is a stringer method for printing the linked list
func (list *LinkedList[T]) String() string {
	message := fmt.Sprintf("List of length: %d\n", list.length)
	message += "["

	for node := list.head; node != nil; node = node.next {
		message += fmt.Sprintf("%v", node.value)
		if node.next != nil {
			message += ", "
		}
	}

	message += "]"
	return message
}
