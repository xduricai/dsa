export function findChampion(n: number, edges: number[][]): number {
    const weak = new Set<number>();

    for (const [stronger, weaker] of edges) {
        weak.add(weaker);
    }
    if (weak.size < n - 1) {
        return -1;
    }

    for (let team = 0; team < n; team++) {
        if (!weak.has(team)) {
            return team;
        }
    }
}
