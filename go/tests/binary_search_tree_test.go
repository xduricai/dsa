package tests

import (
	"testing"

	"github.com/xduricai/dsa/go/trees"
)

func TestBST(t *testing.T) {
	tree := trees.NewBinarySearchNode[int](5)

	err := tree.Delete(5)
	if err == nil {
		t.Errorf("Delete failed for tree with root only")
	}

	tree.Left = trees.NewBinarySearchNode[int](3)
	tree.Left.Left = trees.NewBinarySearchNode[int](2)
	tree.Left.Right = trees.NewBinarySearchNode[int](4)

	tree.Right = trees.NewBinarySearchNode[int](18)
	tree.Right.Left = trees.NewBinarySearchNode[int](16)
	tree.Right.Right = trees.NewBinarySearchNode[int](19)
	tree.Right.Left.Right = trees.NewBinarySearchNode[int](17)

	if !tree.Find(17) {
		t.Errorf("Find failed for value in tree")
	}
	if tree.Find(999) {
		t.Errorf("Find failed for value not in tree")
	}

	err = tree.Delete(999)
	if err == nil {
		t.Errorf("Delete failed for element not in tree")
	}

	tree.Insert(1)
	tree.Insert(3)
	if tree.Left.Left.Left.Value() != 1 || tree.Left.Left.Right.Value() != 3 {
		t.Errorf("Insert failed")
	}

	err = tree.Delete(5)
	if err != nil {
		t.Errorf("Delete failed for element in tree")
	}

	if tree.Value() != 16 || tree.Right.Value() != 18 || tree.Right.Left.Value() != 17 || tree.Right.Right.Value() != 19 {
		t.Errorf("Delete failed, incorrect resulting tree structure")
	}

	err = tree.Delete(17)
	if err != nil {
		t.Errorf("Delete failed for element in tree")
	}

	if tree.Right.Value() != 18 || tree.Right.Left != nil {
		t.Errorf("Delete failed, incorrect resulting tree structure")
	}

	err = tree.Delete(18)
	if err != nil {
		t.Errorf("Delete failed for element in tree")
	}

	if tree.Right.Value() != 19 || tree.Right.Left != nil || tree.Right.Right != nil {
		t.Errorf("Delete failed, incorrect resulting tree structure")
	}
}
