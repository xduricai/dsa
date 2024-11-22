export function maxEqualRowsAfterFlips(matrix: number[][]): number {
    const patterns = new Map<string, number>();

    for (const row of matrix) {
        const pattern = row
            .map((value) => (row[0] ? 1 - value : value))
            .join("");
        const count = patterns.get(pattern) || 0;
        patterns.set(pattern, count + 1);
    }

    return Math.max(...patterns.values());
}
