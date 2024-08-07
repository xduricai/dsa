export function ladderLength(
    beginWord: string,
    endWord: string,
    wordList: string[]
): number {
    if (!wordList.includes(endWord)) {
        return 0;
    }
    wordList.push(beginWord);
    const adjList = new Map<string, string[]>();

    for (let word of wordList) {
        for (let idx = 0; idx < word.length; idx++) {
            const key = `${word.slice(0, idx)}-${word.slice(idx + 1)}`;
            const list = adjList.get(key);

            if (!list) {
                adjList.set(key, [word]);
            } else {
                list.push(word);
            }
        }
    }

    const seen = new Set<string>();
    const queue = [beginWord];
    let distance = 1;

    while (queue.length) {
        const len = queue.length;

        for (let iter = 0; iter < len; iter++) {
            const word = queue.shift();

            if (word === endWord) {
                return distance;
            }
            seen.add(word);

            for (let idx = 0; idx < word.length; idx++) {
                const key = `${word.slice(0, idx)}-${word.slice(idx + 1)}`;
                const list = adjList.get(key);

                for (let neighbor of list) {
                    if (!seen.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }
        distance++;
    }
    return 0;
}
