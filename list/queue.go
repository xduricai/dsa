package list

import (
	"errors"
	"fmt"
)

type Queue[T any] struct {
	head   *Node[T]
	tail   *Node[T]
	length int
}

func NewQueue[T any]() *Queue[T] {
	return &Queue[T]{
		head:   nil,
		tail:   nil,
		length: 0,
	}
}

func (queue *Queue[T]) Enqueue(value T) {
	node := newNode[T](value)

	if queue.length == 0 {
		queue.head = node
	} else {
		queue.tail.next = node
	}

	queue.length++
	queue.tail = node
}

func (queue *Queue[T]) Deque() (T, error) {
	if queue.head == nil {
		return *new(T), errors.New("Cannot deque from an empty queue")
	}
	if queue.length == 1 {
		queue.tail = nil
	}

	queue.length--
	value := queue.head.value
	queue.head = queue.head.next

	return value, nil
}

func (queue *Queue[T]) Peek() (T, error) {
	if queue.head == nil {
		return *new(T), errors.New("Queue is empty")
	}

	return queue.head.value, nil
}

func (queue *Queue[T]) Length() int {
	return queue.length
}

// String is a stringer method for printing the queue
func (queue *Queue[T]) String() string {
	message := fmt.Sprintf("Queue of length: %d\n", queue.length)
	message += "["

	for node := queue.head; node != nil; node = node.next {
		message += fmt.Sprintf("%v", node.value)
		if node.next != nil {
			message += ", "
		}
	}

	message += "]"
	return message
}
