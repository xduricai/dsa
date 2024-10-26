class TrieNode {
    children = new Map<string, TrieNode>();
    index = -1;
}

export class WordFilter {
    trie: TrieNode;

    constructor(words: string[]) {
        this.trie = new TrieNode();

        for (let idx = 0; idx < words.length; idx++) {
            const word = words[idx];

            for (let start = 0; start < word.length; start++) {
                this.insert(`${word.slice(start)}-`, word, idx);
            }
        }
    }

    insert(suffix: string, prefix: string, index: number) {
        let current = this.trie;

        for (const char of suffix) {
            if (current.children.has(char)) {
                current = current.children.get(char);
            } else {
                const node = new TrieNode();
                current.children.set(char, node);
                current = node;
            }
        }

        for (const char of prefix) {
            if (current.children.has(char)) {
                current = current.children.get(char);
            } else {
                const node = new TrieNode();
                current.children.set(char, node);
                current = node;
            }
            current.index = Math.max(current.index, index);
        }
    }

    f(pref: string, suff: string): number {
        let current = this.trie;

        for (const char of `${suff}-${pref}`) {
            if (current.children.has(char)) {
                current = current.children.get(char);
            } else {
                return -1;
            }
        }
        return current.index;
    }
}
