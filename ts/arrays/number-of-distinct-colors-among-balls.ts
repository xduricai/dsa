export function queryResults(limit: number, queries: number[][]): number[] {
    const counter = new Map<number, number>();
    const balls = new Map<number, number>();
    const res = Array(queries.length);

    for (let idx = 0; idx < queries.length; idx++) {
        const [ball, color] = queries[idx];

        // ball already has a color
        if (balls.has(ball)) {
            const oldColor = balls.get(ball);
            const oldCount = counter.get(oldColor);

            if (oldCount === 1) {
                counter.delete(oldColor);
            } else {
                counter.set(oldColor, oldCount - 1);
            }
        }

        const count = counter.get(color) || 0;
        counter.set(color, count + 1);

        balls.set(ball, color);
        res[idx] = counter.size;
    }

    return res;
}
