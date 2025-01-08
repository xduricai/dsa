class TrieNode {
    children = new Map<string, TrieNode>();
    count = 0;
}

class Trie {
    root = new TrieNode();

    insert(word: string): void {
        let current = this.root;

        for (let idx = 0; idx <= word.length; idx++) {
            const key = this.getKey(word, idx);

            if (!current.children.has(key)) {
                current.children.set(key, new TrieNode());
            }

            current = current.children.get(key);
            current.count++;
        }
    }

    count(word: string): number {
        let current = this.root;

        for (let idx = 0; idx < word.length; idx++) {
            const key = this.getKey(word, idx);
            current = current.children.get(key);

            if (!current) {
                return 0;
            }
        }

        return current.count;
    }

    getKey(word: string, idx: number) {
        return `${word[idx]}${word[word.length - 1 - idx]}`;
    }
}

export function countPrefixSuffixPairs(words: string[]): number {
    const trie = new Trie();
    let res = 0;

    for (let idx = words.length - 1; idx >= 0; idx--) {
        res += trie.count(words[idx]);
        trie.insert(words[idx]);
    }

    return res;
}
