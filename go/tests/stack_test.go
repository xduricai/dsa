package tests

import (
	"testing"

	"github.com/xduricai/dsa/go/lists"
)

func TestStack(t *testing.T) {
	s := lists.NewStack[int]()

	val, err := s.Pop()
	if err == nil {
		t.Errorf("Popping on an empty stack did not throw an error")
	}

	val, err = s.Peek()
	if err == nil {
		t.Errorf("Peeking an empty stack did not throw an error")
	}

	s.Push(123)
	val, err = s.Peek()
	if val != 123 {
		t.Errorf("Incorrect value when peeking")
	}

	val, _ = s.Pop()
	if val != 123 {
		t.Errorf("Incorrect value when popping")
	}

	s.Push(45)
	s.Push(67)
	s.Push(89)

	if s.Length() != 3 {
		t.Errorf("Incorrect stack length")
	}

	val, err = s.Peek()
	if val != 89 {
		t.Errorf("Incorrect value when peeking")
	}

	val, err = s.Pop()
	if val != 89 {
		t.Errorf("Incorrect value when popping")
	}

	s.Push(11)
	s.Push(22)
	s.Push(33)

	val, err = s.Pop()
	if val != 33 {
		t.Errorf("Incorrect value when popping")
	}
	if s.Length() != 4 {
		t.Errorf("Incorrect stack length")
	}
}
