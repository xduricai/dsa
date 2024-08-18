import { Heap } from "../heap/heap";

// using a sorted array
export function isNStraightHand(hand: number[], groupSize: number): boolean {
    if (hand.length % groupSize !== 0) {
        return false;
    }

    hand.sort((a, b) => a - b);

    while (hand.length) {
        let current = hand.shift();
        let count = 1;
        let idx = 0;

        while (count < groupSize) {
            if (idx >= hand.length) {
                return false;
            }
            if (hand[idx] > current + 1) {
                return false;
            }
            if (hand[idx] === current) {
                idx++;
                continue;
            }

            // next element is exactly 1 greater than current
            current = hand[idx];
            hand.splice(idx, 1);
            count++;
        }
    }
    return true;
}

// usinng a min heap
export function isNStraightHandAlt(hand: number[], groupSize: number): boolean {
    if (hand.length % groupSize !== 0) {
        return false;
    }

    const map = new Map<number, number>();
    const heap = new Heap<number>();

    for (const card of hand) {
        map.set(card, (map.get(card) || 0) + 1);
    }

    for (const card of map.keys()) {
        heap.add(card);
    }

    while (heap.length) {
        const first = heap.peek();

        for (let card = first; card < first + groupSize; card++) {
            const count = map.get(card);
            if (!count) {
                return false;
            }
            if (count === 1) {
                if (heap.peek() !== card) {
                    return false;
                }
                heap.delete();
            }
            map.set(card, count - 1);
        }
    }
    return true;
}
