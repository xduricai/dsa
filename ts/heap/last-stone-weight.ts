import { Heap } from "./heap";

export function lastStoneWeight(stones: number[]) {
    const heap = new Heap<number>();
    
    for (let stone of stones) {
        heap.add(-stone);
    }

    while (heap.length > 1) {
        const a = heap.delete();
        const b = heap.delete();
        const res = Math.abs(a - b);
        if (res) heap.add(-res);
    }
    return -heap.peek() || 0; 
}