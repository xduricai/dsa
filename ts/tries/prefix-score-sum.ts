export function sumPrefixScores(words: string[]): number[] {
    const trie = new Trie();

    for (const word of words) {
        trie.insert(word);
    }

    return words.map((word) => trie.getCount(word));
}

class TrieNode {
    children = new Map<string, TrieNode>();
    count = 0;
}

class Trie {
    root = new TrieNode();

    insert(word: string): void {
        let current = this.root;

        for (let idx = 0; idx < word.length; idx++) {
            let child = current.children.get(word[idx]);
            if (!child) {
                child = new TrieNode();
                current.children.set(word[idx], child);
            }
            child.count += 1;
            current = child;
        }
    }

    getCount(word: string): number {
        let current = this.root;
        let count = 0;

        for (let idx = 0; idx < word.length; idx++) {
            current = current.children.get(word[idx]);
            count += current.count;
        }
        return count;
    }
}
