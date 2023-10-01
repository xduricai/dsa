package tests

import (
	"testing"

	"github.com/xduricai/dsa/lists"
)

func TestList(t *testing.T) {
	ll := lists.NewList[int]()

	ll.InsertAt(123, 0)
	val, _ := ll.Get(0)
	if val != 123 {
		t.Errorf("Incorrect value at specified index")
	}

	ll.Prepend(456)
	val, _ = ll.Get(0)
	if val != 456 {
		t.Errorf("Incorrect value at specified index")
	}

	ll.Append(789)
	val, _ = ll.Get(1)
	if val != 123 {
		t.Errorf("Incorrect value at specified index")
	}
	val, _ = ll.Get(2)
	if val != 789 {
		t.Errorf("Incorrect value at specified index")
	}

	ll.InsertAt(999, 3)
	val, _ = ll.Get(3)
	if val != 999 {
		t.Errorf("Incorrect value at specified index")
	}

	if ll.Length() != 4 {
		t.Errorf("Incorrect list length")
	}

	val, _ = ll.RemoveAt(3)
	if val != 999 {
		t.Errorf("Incorrect value at specified index")
	}

	val, _ = ll.RemoveAt(0)
	if val != 456 {
		t.Errorf("Incorrect value at specified index")
	}

	if ll.Length() != 2 {
		t.Errorf("Incorrect list length")
	}

	val, _ = ll.Pop()
	if val != 789 {
		t.Errorf("Incorrect value at specified index")
	}
	val, _ = ll.Remove()
	if val != 123 {
		t.Errorf("Incorrect value at specified index")
	}

	ll.Prepend(123)
	ll.Pop()
	ll.Append(456)
	ll.Remove()

	if ll.Length() != 0 {
		t.Errorf("Incorrect list length")
	}
}
