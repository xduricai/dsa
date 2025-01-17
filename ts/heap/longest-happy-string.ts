import { Heap } from "./custom-heap";

export function longestDiverseString(a: number, b: number, c: number): string {
    const heap = new Heap<[number, string]>((a, b) => b[0] - a[0]);
    let output = "";
    let cooldown = null;

    if (a) heap.push([a, "a"]);
    if (b) heap.push([b, "b"]);
    if (c) heap.push([c, "c"]);

    while (heap.size) {
        let [count, char] = heap.pop();

        if ((!cooldown || count >= cooldown[0]) && count > 1) {
            output = `${output}${char}${char}`;
            count -= 2;
        } else {
            output = `${output}${char}`;
            count -= 1;
        }

        if (cooldown) {
            heap.push(cooldown);
            cooldown = null;
        }

        if (count) {
            cooldown = [count, char];
        }
    }

    return output;
}
