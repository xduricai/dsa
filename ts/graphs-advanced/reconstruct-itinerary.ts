export function findItinerary(tickets: string[][]): string[] {
    const adjList = new Map<string, string[]>();
    const path = [];

    for (const [source, destination] of tickets) {
        const current = adjList.get(source);
        if (current) {
            current.push(destination);
        } else {
            adjList.set(source, [destination]);
        }
    }

    for (const list of adjList.values()) {
        list.sort();
    }

    const dfs = (source: string) => {
        const neighbors = adjList.get(source) || [];

        while (neighbors.length) {
            const neighbor = neighbors.shift();
            dfs(neighbor);
        }
        path.unshift(source);
    };

    dfs("JFK");
    return path;
}
