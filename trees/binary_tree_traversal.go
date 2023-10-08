package trees

import "github.com/xduricai/dsa/lists"

// InOrderTraversal returns an in-order slice of values in a binary tree
func InOrderTraversal[T any](node *BinaryNode[T], path []T) []T {
	if node == nil {
		return path
	}

	path = InOrderTraversal(node.Left, path)
	path = append(path, node.value)
	path = InOrderTraversal(node.Right, path)

	return path
}

// PreOrderTraversal returns a pre-order slice of values in a binary tree
func PreOrderTraversal[T any](node *BinaryNode[T], path []T) []T {
	if node == nil {
		return path
	}

	path = append(path, node.value)
	path = PreOrderTraversal(node.Left, path)
	path = PreOrderTraversal(node.Right, path)

	return path
}

// PostOrderTraversal returns a post-order slice of values in a binary tree
func PostOrderTraversal[T any](node *BinaryNode[T], path []T) []T {
	if node == nil {
		return path
	}

	path = PostOrderTraversal(node.Left, path)
	path = PostOrderTraversal(node.Right, path)
	path = append(path, node.value)

	return path
}

// DFS searches for a value in a binary tree using the deptth-first search algorithm and returns a bool value signifying whether the target value is present
func DFS[T comparable](node *BinaryNode[T], target T) bool {
	if node == nil {
		return false
	}

	if node.value == target {
		return true
	}

	return DFS[T](node.Left, target) || DFS[T](node.Right, target)
}

// BFS searches for a value in a binary tree using the breadth-first search algorithm and returns a bool value signifying whether the target value is present
func BFS[T comparable](root *BinaryNode[T], target T) bool {
	q := lists.NewQueue[*BinaryNode[T]]()
	q.Enqueue(root)

	for q.Length() > 0 {
		next, _ := q.Deque()

		if next.value == target {
			return true
		}

		if next.Left != nil {
			q.Enqueue(next.Left)
		}
		if next.Right != nil {
			q.Enqueue(next.Right)
		}
	}

	return false
}

// Compare compares two binary trees and returns true if both trees have the same shape and values
func Compare[T comparable](a *BinaryNode[T], b *BinaryNode[T]) bool {
	if a == nil && b == nil {
		return true
	}

	if a == nil || b == nil {
		return false
	}

	if a.value != b.value {
		return false
	}

	return Compare[T](a.Left, b.Left) && Compare[T](a.Right, b.Right)
}
