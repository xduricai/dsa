import { Heap } from "./heap";

export function kClosest(points: number[][], k: number): number[][] {
    const heap = new Heap<[number, number[]]>();
    const output = [];

    for (let point of points) {
        const dist = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
        heap.add([dist, point]);
    }

    for (let idx = 0; idx < k; idx++) {
        output.push(heap.delete()[1]);
    }
    return output;
};