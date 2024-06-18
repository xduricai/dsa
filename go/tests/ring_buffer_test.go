package tests

import (
	"testing"

	"github.com/xduricai/dsa/go/lists"
)

func TestRingBuffer(t *testing.T) {
	buffer := lists.NewRingBuffer[int](4)

	_, err := buffer.Peek()
	if err == nil {
		t.Errorf("Ring buffer failed, peeking an empty buffer did not return an error")
	}
	_, err = buffer.Read()
	if err == nil {
		t.Errorf("Ring buffer failed, reading from an empty buffer did not return an error")
	}

	for i := 1; i < 5; i++ {
		err = buffer.Write(i)
		if err != nil {
			t.Errorf("Ring buffer failed, writing into a non-full buffer returned an error")
		}
	}

	err = buffer.Write(5)
	if err == nil {
		t.Errorf("Ring buffer failed, writing into a full buffer did not return an error")
	}

	for i := 1; i < 5; i++ {
		val, err := buffer.Read()
		if err != nil {
			t.Errorf("Ring buffer failed, reading from a non-empty buffer returned an error")
		}
		if val != i {
			t.Errorf("Ring buffer failed, reading from the buffer returned an incorrect value")
		}
	}

	_, err = buffer.Read()
	if err == nil {
		t.Errorf("Ring buffer failed, reading from an empty buffer did not return an error")
	}
	err = buffer.Write(5)
	if err != nil {
		t.Errorf("Ring buffer failed, writing into a non-full buffer returned an error")
	}
	val, err := buffer.Read()
	if err != nil {
		t.Errorf("Ring buffer failed, reading from an empty buffer did not return an error")
	}
	if val != 5 {
		t.Errorf("Ring buffer failed, reading from the buffer returned an incorrect value")
	}
}
