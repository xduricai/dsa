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

// les space efficient solution using diagonals
export class DetectSquaresAlt {
    counts = new Map<string, number>();
    posDiagonals = new Map<number, number[][]>();
    negDiagonals = new Map<number, number[][]>();

    add(point: number[]): void {
        const [px, py] = point;
        const key = `${px}-${py}`;
        this.counts.set(key, (this.counts.get(key) || 0) + 1);

        const posDiagonal = this.posDiagonals.get(px + py);
        if (posDiagonal) {
            posDiagonal.push(point);
        } else {
            this.posDiagonals.set(px + py, [point]);
        }

        const negDiagonal = this.negDiagonals.get(px - py);
        if (negDiagonal) {
            negDiagonal.push(point);
        } else {
            this.negDiagonals.set(px - py, [point]);
        }
    }

    count(point: number[]): number {
        const [px, py] = point;
        const pos = this.posDiagonals.get(px + py) || [];
        const neg = this.negDiagonals.get(px - py) || [];
        const points = pos.concat(neg);

        let count = 0;

        for (const [x, y] of points) {
            if (x === px) {
                continue;
            }

            const countA = this.counts.get(`${px}-${y}`) || 0;
            const countB = this.counts.get(`${x}-${py}`) || 0;
            count += countA * countB;
        }
        return count;
    }
}
