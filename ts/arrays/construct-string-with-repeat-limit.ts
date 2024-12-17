import { Heap } from "../heap/heap";

export function repeatLimitedString(s: string, repeatLimit: number): string {
    const A = "a".charCodeAt(0);
    const counts = Array(26).fill(0);
    let output = ``;

    for (const char of s) {
        const idx = char.charCodeAt(0) - A;
        counts[idx]++;
    }

    for (let idx = 25; idx >= 0; idx--) {
        while (counts[idx]) {
            const char = String.fromCharCode(idx + A);
            const maxAdd = Math.min(repeatLimit, counts[idx]);

            output = `${output}${char.repeat(maxAdd)}`;
            counts[idx] -= maxAdd;

            if (!counts[idx] || idx === 0) {
                break;
            }

            for (let cd = idx - 1; cd >= 0; cd--) {
                if (counts[cd]) {
                    output = `${output}${String.fromCharCode(cd + A)}`;
                    counts[cd]--;
                    break;
                }

                if (cd === 0) {
                    return output;
                }
            }
        }
    }

    return output;
}

export function repeatLimitedStringAlt(s: string, repeatLimit: number): string {
    const A = "a".charCodeAt(0);
    const counter = new Map();
    const heap = new Heap<[number, number]>();
    let output = "";
    let cooldown = null;

    const getCode = (char: string) => {
        return 25 - char.charCodeAt(0) + A;
    };

    const parse = (code: number) => {
        return String.fromCharCode(25 - code + A);
    };

    for (const char of s) {
        const code = getCode(char);
        const count = counter.get(code) || 0;
        counter.set(code, count + 1);
    }

    for (const entry of counter.entries()) {
        heap.add(entry);
    }

    while (heap.length) {
        const [code, count] = heap.delete();
        const char = parse(code);
        let maxAdd = Math.min(count, repeatLimit);

        if (cooldown && cooldown[0] < code) {
            maxAdd = 1;
        }

        output = `${output}${char.repeat(maxAdd)}`;

        if (cooldown) {
            heap.add(cooldown);
        }

        if (count - maxAdd !== 0) {
            cooldown = [code, count - maxAdd];
        } else {
            cooldown = null;
        }
    }

    return output;
}
