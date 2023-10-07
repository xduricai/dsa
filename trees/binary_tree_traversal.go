package trees

import "github.com/xduricai/dsa/lists"

// InOrderSearch returns an in-order slice of values in a binary tree
func InOrderSearch[T any](node *BinaryNode[T], path []T) []T {
	if node == nil {
		return path
	}

	path = InOrderSearch(node.Left, path)
	path = append(path, node.value)
	path = InOrderSearch(node.Right, path)

	return path
}

// PreOrderSearch returns a pre-order slice of values in a binary tree
func PreOrderSearch[T any](node *BinaryNode[T], path []T) []T {
	if node == nil {
		return path
	}

	path = append(path, node.value)
	path = PreOrderSearch(node.Left, path)
	path = PreOrderSearch(node.Right, path)

	return path
}

// PostOrderSearch returns a post-order slice of values in a binary tree
func PostOrderSearch[T any](node *BinaryNode[T], path []T) []T {
	if node == nil {
		return path
	}

	path = PostOrderSearch(node.Left, path)
	path = PostOrderSearch(node.Right, path)
	path = append(path, node.value)

	return path
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
