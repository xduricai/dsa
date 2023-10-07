package tests

import (
	"testing"

	"github.com/xduricai/dsa/trees"
)

func TestBinaryTreeTraversal(t *testing.T) {
	tree := trees.NewBinaryNode[int](20)

	tree.Left = trees.NewBinaryNode[int](10)
	tree.Left.Right = trees.NewBinaryNode[int](15)
	tree.Left.Left = trees.NewBinaryNode[int](5)
	tree.Left.Left.Right = trees.NewBinaryNode[int](7)

	tree.Right = trees.NewBinaryNode[int](50)
	tree.Right.Right = trees.NewBinaryNode[int](100)
	tree.Right.Left = trees.NewBinaryNode[int](30)
	tree.Right.Left.Left = trees.NewBinaryNode[int](29)
	tree.Right.Left.Right = trees.NewBinaryNode[int](45)

	inOrder := []int{5, 7, 10, 15, 20, 29, 30, 45, 50, 100}
	preOrder := []int{20, 10, 5, 7, 15, 50, 30, 29, 45, 100}
	postOrder := []int{7, 5, 15, 10, 29, 45, 30, 100, 50, 20}

	inOrderResult := trees.InOrderSearch[int](tree, []int{})
	preOrderResult := trees.PreOrderSearch[int](tree, []int{})
	postOrderResult := trees.PostOrderSearch[int](tree, []int{})

	for i := 0; i < len(inOrder); i++ {
		if inOrder[i] != inOrderResult[i] {
			t.Errorf("inOrder failed")
			break
		}
	}

	for i := 0; i < len(preOrder); i++ {
		if preOrder[i] != preOrderResult[i] {
			t.Errorf("preOrder failed")
			break
		}
	}

	for i := 0; i < len(postOrder); i++ {
		if postOrder[i] != postOrderResult[i] {
			t.Errorf("postOrder failed")
			break
		}
	}
}
