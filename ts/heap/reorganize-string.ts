import { Heap } from "./custom-heap";

export function reorganizeString(s: string): string {
    const counter = new Map<string, number>();

    for (const char of s) {
        const count = counter.get(char) || 0;
        counter.set(char, count + 1);
    }

    const heap = new Heap<[string, number]>(
        (a, b) => b[1] - a[1],
        Array.from(counter)
    );
    let cooldown = null;
    let output = "";

    while (heap.size) {
        const [char, count] = heap.pop();
        output = `${output}${char}`;

        if (cooldown) {
            heap.push(cooldown);
            cooldown = null;
        }

        if (count > 1) {
            cooldown = [char, count - 1];
        }
    }

    if (cooldown) {
        return "";
    }
    return output;
}
