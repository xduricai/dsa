// LC 1061 (https://leetcode.com/problems/lexicographically-smallest-equivalent-string)

export function smallestEquivalentString(
    s1: string,
    s2: string,
    baseStr: string
): string {
    const a = "a".charCodeAt(0);
    const uf = new UnionFind(26);

    for (let char = 0; char < s1.length; char++) {
        const char1 = s1[char].charCodeAt(0) - a;
        const char2 = s2[char].charCodeAt(0) - a;

        uf.union(char1, char2);
    }

    return baseStr
        .split("")
        .map((char) => uf.find(char.charCodeAt(0) - a))
        .map((code) => String.fromCharCode(code + a))
        .join("");
}

class UnionFind {
    parents: number[];

    constructor(n: number) {
        this.parents = Array(n);

        for (let idx = 0; idx < n; idx++) {
            this.parents[idx] = idx;
        }
    }

    find(node: number) {
        let current = node;
        let parent = this.parents[node];

        while (current !== parent) {
            this.parents[current] = this.parents[parent];
            current = this.parents[current];
            parent = this.parents[current];
        }

        return parent;
    }

    union(nodeA: number, nodeB: number) {
        const parentA = this.find(nodeA);
        const parentB = this.find(nodeB);

        if (parentA < parentB) {
            this.parents[parentB] = parentA;
        } else {
            this.parents[parentA] = parentB;
        }
    }
}

export function smallestEquivalentStringBfs(
    s1: string,
    s2: string,
    baseStr: string
): string {
    const a = "a".charCodeAt(0);
    const letters = Array.from({ length: 26 }, () => Array(26).fill(false));
    const smallest = Array(26);

    for (let idx = 0; idx < 26; idx++) {
        letters[idx][idx] = true;
    }
    for (let char = 0; char < s1.length; char++) {
        const idx1 = s1[char].charCodeAt(0) - a;
        const idx2 = s2[char].charCodeAt(0) - a;
        letters[idx1][idx2] = true;
        letters[idx2][idx1] = true;
    }

    const bfs = (start: number) => {
        const seen = Array(26).fill(false);
        let queue = [start];
        let min = start;

        while (queue.length) {
            const nextQueue = [];

            for (const char of queue) {
                if (seen[char]) {
                    continue;
                }
                seen[char] = true;
                min = Math.min(min, char);

                for (let idx = 0; idx < 26; idx++) {
                    if (letters[char][idx] && !seen[idx]) {
                        nextQueue.push(idx);
                    }
                }
            }
            queue = nextQueue;
        }

        for (let idx = 0; idx < 26; idx++) {
            if (seen[idx]) {
                smallest[idx] = String.fromCharCode(min + a);
            }
        }
    };

    for (let idx = 0; idx < 26; idx++) {
        bfs(idx);
    }

    return baseStr
        .split("")
        .map((char) => smallest[char.charCodeAt(0) - a])
        .join("");
}
