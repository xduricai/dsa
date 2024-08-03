import { TrieNode } from "./trie-node";

export class Trie {
    root = new TrieNode();

    insert(word: string): void {
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

    delete(word: string) {
        const walk = (node: TrieNode | undefined, idx: number) => {
            if (!node) return false;

            if (idx === word.length) {
                if (!node.isWord) return false;

                node.isWord = false;
                return true;
            }

            const child = node.children.get(word[idx]);
            const containsWord = walk(child, idx + 1);
            if (!containsWord) return false;

            if (!child.children.size) {
                node.children.delete(word[idx]);
            }
            return true;
        };
        walk(this.root, 0);
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
