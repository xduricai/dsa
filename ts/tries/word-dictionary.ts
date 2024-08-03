import { TrieNode } from "./trie-node";

export class WordDictionary {
    root = new TrieNode();

    addWord(word: string): void {
        let current = this.root;

        for (let char of word) {
            let child = current.children.get(char);
            if (!child) {
                child = new TrieNode();
                current.children.set(char, child);
            }
            current = child;
        }
        current.isWord = true;
    }

    search(word: string): boolean {
        return this.dfs(this.root, 0, word);
    }

    private dfs(node: TrieNode, idx: number, word: string): boolean {
        if (!node) {
            return false;
        }
        if (idx === word.length) {
            return node.isWord;
        }
        if (word[idx] !== ".") {
            return this.dfs(node.children.get(word[idx]), idx + 1, word);
        }

        for (let child of node.children.values()) {
            if (this.dfs(child, idx + 1, word)) {
                return true;
            }
        }
        return false;
    }
}
