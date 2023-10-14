package trees

import (
	"errors"
	"regexp"
)

// Constants representing the ASCII codes of the letters a, z, A, Z respectively
const aLower = 97
const zLower = 122
const aUpper = 65
const zUpper = 90

var ErrInvalidInput = errors.New("Input is not a valid word")
var ErrInvalidDeleteInput = errors.New("Input is not a valid word")
var ErrInputNotInTrie = errors.New("Input is not present inthe trie")

// TrieNode is a struct representing a single node of a trie
// tries are also commonly referred to as autocompletes
type TrieNode struct {
	data   [26]*TrieNode
	isWord bool
}

// NewTrieNode is a constructor method for a tree node
func NewTrieNode() *TrieNode {
	return &TrieNode{}
}

// Insert inserts a given word into the trie if it is valid or returns an error if it is not
func (node *TrieNode) Insert(input string) error {
	if !validWord(input) {
		return ErrInvalidInput
	}
	current := node

	for _, char := range input {
		idx := TrieIndex(char)

		if current.data[idx] == nil {
			current.data[idx] = NewTrieNode()
		}
		current = current.data[idx]
	}
	current.isWord = true

	return nil
}

// Contains determines whether a given word is present in the trie
func (node *TrieNode) Contains(input string) bool {
	if !validWord(input) {
		return false
	}
	current := node

	for _, char := range input {
		idx := TrieIndex(char)

		if current.data[idx] == nil {
			return false
		}
		current = current.data[idx]
	}
	return current.isWord
}

// Delete removes a word from the trie or returns an error if the given word is not present
func (node *TrieNode) Delete(input string) error {
	if !validWord(input) {
		return ErrInvalidInput
	}
	_, result := node.removeChildren(input)
	return result
}

// GetStartingWith returns a slice containing all valid words present in the trie that start with a given prefix
func (node *TrieNode) GetStartingWith(input string) []string {
	if !validWord(input) {
		return []string{}
	}
	current := node

	for _, char := range input {
		idx := TrieIndex(char)
		if current.data[idx] == nil {
			return []string{}
		}
		current = current.data[idx]
	}

	return current.getWords(input)
}

// GetAll returns a slice containing all valid words present in the trie
func (node *TrieNode) GetAll() []string {
	return node.GetStartingWith("")
}

// removeChildren is a recursive utility method that deletes a word from the trie and removes all unused letters
func (node *TrieNode) removeChildren(input string) (bool, error) {
	if len(input) == 0 {
		if !node.isWord {
			return false, ErrInputNotInTrie
		}
		canRemove := !node.hasChildren()
		if !canRemove {
			node.isWord = false
		}
		return canRemove, nil
	}

	idx := TrieIndex(rune(input[0]))
	child := node.data[idx]

	if child == nil {
		return false, ErrInputNotInTrie
	}
	canRemove, err := child.removeChildren(input[1:])

	if err != nil {
		return false, err
	}
	if canRemove {
		node.data[idx] = nil
	}

	return canRemove && !node.hasChildren(), nil
}

// hasChildren is a utility method that determines whether a node has any children
func (node *TrieNode) hasChildren() bool {
	for _, child := range node.data {
		if child != nil {
			return true
		}
	}
	return false
}

// getWords is a utility method that returns all valid words from a node and all its children using Depth-First Search (DFS)
func (node *TrieNode) getWords(input string) []string {
	var words []string

	if node.isWord {
		words = []string{input}
	} else {
		words = []string{}
	}

	for idx, child := range node.data {
		if child == nil {
			continue
		}

		base := input + string(rune(idx+aLower))
		words = append(words, child.getWords(base)...)
	}

	return words
}

// validWord checks whether an input is valid
// valid inputs are made up of only lower or upper case letters of the English alphabet
func validWord(word string) bool {
	return regexp.MustCompile(`^[a-zA-Z]*$`).MatchString(word)
}

// TrieIndex returns an index that a given letter would occupy in the English alphabet (0 to 25)
// this function returns -1 if the input is not a valid letter of the English alphabet, however this should never occur
func TrieIndex(char rune) int {
	value := int(char)

	if value >= aLower && value <= zLower {
		return value - aLower
	}
	if value >= aUpper && value <= zUpper {
		return value - aUpper
	}

	return -1
}
