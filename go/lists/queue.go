package lists

import "fmt"

// Queue represents a wrapper for a queue struct
type Queue[T any] struct {
	head   *Node[T]
	tail   *Node[T]
	length int
}

// NewQueue is a constructor method that returns a new queue struct
func NewQueue[T any]() *Queue[T] {
	return &Queue[T]{
		head:   nil,
		tail:   nil,
		length: 0,
	}
}

// Enqueue adds an element to the end of the queue
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

// Dequeue removes the first element of the queue
func (queue *Queue[T]) Dequeue() (T, error) {
	if queue.head == nil {
		return *new(T), ErrEmptyQueue
	}
	if queue.length == 1 {
		queue.tail = nil
	}

	queue.length--
	value := queue.head.value
	queue.head = queue.head.next

	return value, nil
}

// Peak returns the first element of the queue
func (queue *Queue[T]) Peek() (T, error) {
	if queue.head == nil {
		return *new(T), ErrEmptyQueue
	}

	return queue.head.value, nil
}

// Length returns the length of the queue
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
