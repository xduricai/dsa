import { Heap } from "../heap/heap";

export function maxAverageRatio(
    classes: number[][],
    extraStudents: number
): number {
    const heap = new Heap<[number, number]>();

    for (let idx = 0; idx < classes.length; idx++) {
        const [passing, total] = classes[idx];

        const change = (passing + 1) / (total + 1) - passing / total;
        heap.add([-change, idx]);
    }

    while (extraStudents) {
        const [_, idx] = heap.delete();
        classes[idx][0]++;
        classes[idx][1]++;

        const [passing, total] = classes[idx];
        const change = (passing + 1) / (total + 1) - passing / total;

        heap.add([-change, idx]);
        extraStudents--;
    }

    return (
        classes.reduce((acc, [passing, total]) => acc + passing / total, 0) /
        classes.length
    );
}
