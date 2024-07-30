export class TrieNode {
    children = new Map<string, TrieNode>();
    isWord = false;
    refs = 0;
}