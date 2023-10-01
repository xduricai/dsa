package lists

import "errors"

var ErrIndexOutOfBounds = errors.New("Index is outside of bounds")
var ErrEmptyList = errors.New("Cannot pop/remove from an empty list")
var ErrEmptyQueue = errors.New("Cannot deque/peek on an empty queue")
var ErrEmptyStack = errors.New("Cannot pop/peek on an empty stack")
