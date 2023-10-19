package tests

import (
	"testing"

	"github.com/xduricai/dsa/lists"
)

func TestQueue(t *testing.T) {
	q := lists.NewQueue[int]()

	val, err := q.Dequeue()
	if err == nil {
		t.Errorf("Dequeuing an empty queue did not throw an error")
	}

	val, err = q.Peek()
	if err == nil {
		t.Errorf("Peeking an empty queue did not throw an error")
	}

	q.Enqueue(123)
	val, err = q.Peek()
	if val != 123 {
		t.Errorf("Incorrect value when peeking")
	}
	if q.Length() != 1 {
		t.Errorf("Incorrect queue length")
	}

	val, err = q.Dequeue()
	if val != 123 {
		t.Errorf("Incorrect value when popping")
	}

	q.Enqueue(45)
	q.Enqueue(67)
	q.Enqueue(89)

	val, err = q.Peek()
	if val != 45 {
		t.Errorf("Incorrect value when peeking")
	}
	if q.Length() != 3 {
		t.Errorf("Incorrect queue length")
	}

	val, err = q.Dequeue()
	if val != 45 {
		t.Errorf("Incorrect value when dequeuing")
	}
	val, err = q.Peek()
	if val != 67 {
		t.Errorf("Incorrect value when peeking")
	}
	if q.Length() != 2 {
		t.Errorf("Incorrect queue length")
	}
}
