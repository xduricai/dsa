import { TrieNode } from "./trie-node";

export class Trie {
    root = new TrieNode();

    insert(word: string): void {
        let current = this.root;
        current.refs++;

        for (let char of word) {
            let child = current.children.get(char);
            if (!child) {
                child = new TrieNode();
                current.children.set(char, child);
            }
            current = child;
            current.refs++;
        }
        current.isWord = true;
    }

    delete(word: string) {
        let current = this.root;
        current.refs--;

        for (let char of word) {
            current = current.children.get(char);
            if (!current) return;
            current.refs--;
        }
    }

    search(word: string): boolean {
        let current = this.root;

        for (let char of word) {
            current = current.children.get(char);
            if (!current) return false;
        }
        return current.isWord; 
    }

    startsWith(prefix: string): boolean {
        let current = this.root;

        for (let char of prefix) {
            current = current.children.get(char);
            if (!current) return false;
        }
        return true;
    }
}