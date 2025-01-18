// bucket sort
export function carPooling(trips: number[][], capacity: number): boolean {
    const stops = new Map<number, number>();
    let L = Infinity;
    let R = -Infinity;
    let current = 0;

    for (const [passengers, from, to] of trips) {
        L = Math.min(L, from);
        R = Math.max(R, to);

        const countL = (stops.get(from) || 0) + passengers;
        const countR = (stops.get(to) || 0) - passengers;
        stops.set(from, countL);
        stops.set(to, countR);
    }

    for (let stop = L; stop <= R; stop++) {
        if (stops.has(stop)) {
            current += stops.get(stop);
        }
        if (current > capacity) {
            return false;
        }
    }

    return true;
}

// sorting
export function carPoolingAlt(trips: number[][], capacity: number): boolean {
    const points = [];
    let current = 0;

    for (const [passengers, from, to] of trips) {
        points.push([from, passengers], [to, -passengers]);
    }
    points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    for (const [point, passengers] of points) {
        current += passengers;

        if (current > capacity) {
            return false;
        }
    }

    return true;
}
