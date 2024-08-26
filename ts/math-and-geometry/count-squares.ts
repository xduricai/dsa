export class DetectSquares {
    counts = new Map<string, number>();
    points: number[][] = [];

    add(point: number[]): void {
        const key = `${point[0]}-${point[1]}`;
        this.counts.set(key, (this.counts.get(key) || 0) + 1);
        this.points.push(point);
    }

    count(point: number[]): number {
        let res = 0;
        const [px, py] = point;

        for (const [x, y] of this.points) {
            if (Math.abs(px - x) !== Math.abs(py - y) || px === x || py === y) {
                continue;
            }

            const countA = this.counts.get(`${px}-${y}`) || 0;
            const countB = this.counts.get(`${x}-${py}`) || 0;
            res += countA * countB;
        }
        return res;
    }
}
