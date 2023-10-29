package lists

import "errors"

var ErrBufferEmpty = errors.New("Read failed: buffer is empty")
var ErrBufferFull = errors.New("Write failed: buffer is full")

// RingBuffer represents a ring buffer struct
type RingBuffer[T any] struct {
	capacity int
	length   int
	writePtr int
	readPtr  int
	data     []*T
}

// NewRingBuffer returns a new ring buffer with a given capacity
func NewRingBuffer[T any](capacity int) *RingBuffer[T] {
	return &RingBuffer[T]{
		capacity: capacity,
		length:   0,
		writePtr: 0,
		readPtr:  0,
		data:     make([]*T, capacity),
	}
}

// Read reads the next value from the buffer provided it is not empty, then increments the read pointer
func (buf *RingBuffer[T]) Read() (T, error) {
	if buf.length == 0 {
		return *new(T), ErrBufferEmpty
	}
	buf.length--
	idx := buf.readPtr
	buf.readPtr = (buf.readPtr + 1) % buf.capacity

	return *buf.data[idx], nil
}

// Write writes a value into the buffer provided it is not full, then increments the write pointer
func (buf *RingBuffer[T]) Write(value T) error {
	if buf.length == buf.capacity {
		return ErrBufferFull
	}
	buf.length++
	buf.data[buf.writePtr] = &value
	buf.writePtr = (buf.writePtr + 1) % buf.capacity

	return nil
}

// Peek returns the value that will be read next from the buffer without incrementing the read pointer
func (buf *RingBuffer[T]) Peek() (T, error) {
	if buf.length == 0 {
		return *new(T), ErrBufferEmpty
	}
	return *buf.data[buf.readPtr], nil
}

// Length returns the length of the buffer
func (buf *RingBuffer[T]) Length() int {
	return buf.length
}
