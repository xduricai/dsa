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

func TestListReversal(t *testing.T) {
	values := []int{999, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 111}
	ll := lists.NewList[int]()

	for i := 0; i < 10; i++ {
		ll.Append(i + 1)
	}
	ll.Reverse()
	ll.Prepend(999)
	ll.Append(111)

	for i := range values {
		value, err := ll.Get(i)

		if values[i] != value || err != nil {
			t.Errorf("List reversal failed")
			break
		}
	}
}
