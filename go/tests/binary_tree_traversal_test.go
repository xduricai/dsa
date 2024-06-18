package tests

import (
	"testing"

	"github.com/xduricai/dsa/go/trees"
)

func getTree() *trees.BinaryNode[int] {
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

	return tree
}

func TestInOrderTraversal(t *testing.T) {
	tree := getTree()
	inOrder := []int{5, 7, 10, 15, 20, 29, 30, 45, 50, 100}
	inOrderResult := trees.InOrderTraversal[int](tree, []int{})

	for i := 0; i < len(inOrder); i++ {
		if inOrder[i] != inOrderResult[i] {
			t.Errorf("inOrder failed")
			break
		}
	}
}

func TestPreOrderTraversal(t *testing.T) {
	tree := getTree()
	preOrder := []int{20, 10, 5, 7, 15, 50, 30, 29, 45, 100}
	preOrderResult := trees.PreOrderTraversal[int](tree, []int{})

	for i := 0; i < len(preOrder); i++ {
		if preOrder[i] != preOrderResult[i] {
			t.Errorf("preOrder failed")
			break
		}
	}
}

func TestPostOrderTraversal(t *testing.T) {
	tree := getTree()
	postOrder := []int{7, 5, 15, 10, 29, 45, 30, 100, 50, 20}
	postOrderResult := trees.PostOrderTraversal[int](tree, []int{})

	for i := 0; i < len(postOrder); i++ {
		if postOrder[i] != postOrderResult[i] {
			t.Errorf("postOrder failed")
			break
		}
	}
}

func TestBFS(t *testing.T) {
	tree := getTree()

	bfs1 := trees.BFS[int](tree, 45)
	bfs2 := trees.BFS[int](tree, 7)
	bfs3 := trees.BFS[int](tree, 9999)

	if !bfs1 || !bfs2 || bfs3 {
		t.Errorf("BFS failed")
	}
}

func TestDFS(t *testing.T) {
	tree := getTree()

	dfs1 := trees.DFS[int](tree, 45)
	dfs2 := trees.DFS[int](tree, 7)
	dfs3 := trees.DFS[int](tree, 15)
	dfs4 := trees.DFS[int](tree, 9999)

	if !dfs1 || !dfs2 || !dfs3 || dfs4 {
		t.Errorf("DFS failed")
	}
}

func TestCompare(t *testing.T) {
	treeA := getTree()
	treeB := getTree()

	if !trees.Compare[int](treeA, treeB) {
		t.Errorf("Tree comparison failed for identical trees")
	}

	treeB.Right.Set(60)

	if trees.Compare[int](treeA, treeB) {
		t.Errorf("Tree comparison failed for differing trees")
	}

	treeB.Right.Right.Left = trees.NewBinaryNode[int](99)

	if trees.Compare[int](treeA, treeB) {
		t.Errorf("Tree comparison failed for differing trees")
	}
}
