package tests

import (
	"testing"

	"github.com/xduricai/dsa/go/other"
)

func TestMaximumSubarray(t *testing.T) {
	slice := []int{-3, -8, 1, -2, 1, 5, -3, -4, 3, 10, -2, 4, 1}
	expected := 16
	res := other.MaximumSubarray(&slice)

	if res != expected {
		t.Errorf("Maximum Subarray failed")
	}

	slice = []int{-3, -8, -1, -2, -5, -3, -4, -3, -10, -2, -4}
	expected = -1
	res = other.MaximumSubarray(&slice)

	if res != expected {
		t.Errorf("Maximum Subarray failed")
	}
}
