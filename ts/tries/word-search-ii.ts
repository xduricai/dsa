import { Trie } from "./prefix-tree";
import { TrieNode } from "./trie-node";

export function findWords(board: string[][], words: string[]): string[] {
    const trie = new Trie();
    const seen = new Set<string>();
    const output = new Set<string>();
    const current = [];

    for (let word of words) {
        trie.insert(word);
    }

    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < board.length && col < board[0].length;
    }

    const dfs = (row: number, col: number, node: TrieNode) => {
        const pos = `${row}-${col}`;
        if (!inBounds(row, col) || seen.has(pos)) {
            return;
        }

        const letter = board[row][col];
        const child = node.children.get(letter);
        if (!child || !child.refs) {
            return;
        }

        current.push(letter);
        seen.add(pos);
        if (child.isWord) {
            output.add(current.join(""));
            child.isWord = false;
            trie.delete(current.join(""));
        }

        dfs(row - 1, col, child);
        dfs(row, col + 1, child);
        dfs(row + 1, col, child);
        dfs(row, col - 1, child);
        
        seen.delete(pos);
        current.pop();
    }

    for(let row = 0; row < board.length; row++) {
        for(let col = 0; col < board[0].length; col++) {
            dfs(row, col, trie.root);
        }
    }
    return [...output];
}
