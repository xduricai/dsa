package tests

import (
	"testing"

	"github.com/xduricai/dsa/trees"
)

func TestTrie(t *testing.T) {
	trie := trees.NewTrieNode()

	err := trie.Insert("cat")
	if err != nil {
		t.Errorf("Trie failed when inserting lower-case word")
	}
	err = trie.Insert("caTS")
	if err != nil {
		t.Errorf("Trie failed when inserting mixed-case word")
	}
	err = trie.Insert("1234")
	if err == nil {
		t.Errorf("Trie failed when inserting invalid word")
	}
	err = trie.Delete("1234")
	if err == nil {
		t.Errorf("Trie failed when deleting word not in trie")
	}
	trie.Insert("cow")
	err = trie.Delete("cow")
	if err != nil {
		t.Errorf("Trie failed when deleting word")
	}
	if trie.Contains("cow") {
		t.Errorf("Trie failed to delete word")
	}

	trie.Insert("care")
	trie.Insert("car")
	trie.Insert("category")
	trie.Insert("door")
	trie.Insert("caress")
	trie.Insert("cute")

	if trie.Count() != 8 {
		t.Errorf("Trie failed retrieving word count")
	}

	res := trie.GetStartingWith("caret")
	if len(res) != 0 {
		t.Errorf("Tree failed when retrieving words with prefix")
	}

	res = trie.GetAll()
	res2 := trie.GetStartingWith("")
	expected := []string{"car", "care", "caress", "cat", "category", "cats", "cute", "door"}

	if len(expected) != len(res) || len(expected) != len(res2) {
		t.Errorf("Trie failed when retrieving all words - incorrect word count")
	}

	for idx := range expected {
		if expected[idx] != res[idx] || expected[idx] != res2[idx] {
			t.Errorf("Trie failed when retrieving all words - incorrect word order")
			break
		}
	}

	trie.Insert("career")
	trie.Delete("cat")
	trie.Delete("car")
	trie.Delete("cats")
	trie.Delete("door")
	trie.Delete("career")

	expected = []string{"care", "caress", "category", "cute"}
	res = trie.GetAll()

	if len(expected) != len(res) {
		t.Errorf("Trie failed when retrieving all words - incorrect word count")
	}
	for idx := range expected {
		if expected[idx] != res[idx] {
			t.Errorf("Trie failed when retrieving all words - incorrect word order")
			break
		}
	}

	res = trie.GetStartingWith("care")
	if len(res) != 2 || res[0] != "care" || res[1] != "caress" {
		t.Errorf("Tree failed when retrieving words with prefix")
	}

	trie.Delete("care")
	if trie.Contains("care") {
		t.Errorf("Trie failed to delete word")
	}
	if !trie.Contains("caress") {
		t.Errorf("Trie failed, deleted wrong word")
	}

}
