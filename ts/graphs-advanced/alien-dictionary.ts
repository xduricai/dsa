export function foreignDictionary(words: string[]): string {
    const adjList = new Map<string, Set<string>>();

    // init adj list
    for (const word of words) {
        for (const char of word) {
            if (!adjList.has(char)) {
                adjList.set(char, new Set<string>());
            }
        }
    }

    for (let wordIdx = 0; wordIdx < words.length - 1; wordIdx++) {
        const word1 = words[wordIdx];
        const word2 = words[wordIdx + 1];

        // invalid ordering
        if (word1.startsWith(word2) && word1.length > word2.length) {
            return "";
        }

        // add first non-matching character
        for (let idx = 0; idx < Math.min(word1.length, word2.length); idx++) {
            if (word1[idx] !== word2[idx]) {
                adjList.get(word1[idx]).add(word2[idx]);
                break;
            }
        }
    }

    const visited = new Set<string>();
    const cycle = new Set<string>();
    const output = [];

    const dfs = (char: string) => {
        if (cycle.has(char)) {
            return false;
        }
        if (visited.has(char)) {
            return true;
        }
        cycle.add(char);

        for (const neighbor of adjList.get(char)) {
            if (!dfs(neighbor)) {
                return false;
            }
        }
        output.unshift(char);
        visited.add(char);
        cycle.delete(char);
        return true;
    };

    for (const char of adjList.keys()) {
        if (!dfs(char)) {
            return "";
        }
    }
    return output.join("");
}
