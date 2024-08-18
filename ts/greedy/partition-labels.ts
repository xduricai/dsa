// track end of current partition
export function partitionLabels(s: string): number[] {
    const ends = new Map<string, number>();
    for (let idx = 0; idx < s.length; idx++) {
        ends.set(s[idx], idx);
    }

    const output = [];
    let start = 0;
    let end = 0;

    for (let idx = 0; idx < s.length; idx++) {
        end = Math.max(end, ends.get(s[idx]));

        if (idx === end) {
            output.push(end - start + 1);
            start = idx + 1;
        }
    }
    return output;
}

// track number of open characters, use array for counts
export function partitionLabelsAlt(s: string): number[] {
    const A = "a".charCodeAt(0);
    const counts = Array(26).fill(0);
    for (const char of s) {
        counts[char.charCodeAt(0) - A]++;
    }

    const output = [];
    const open = new Set<number>();
    let start = 0;

    for (let idx = 0; idx < s.length; idx++) {
        const char = s[idx].charCodeAt(0) - A;
        open.add(char);
        counts[char]--;

        if (counts[char] === 0) {
            open.delete(char);
        }
        if (open.size === 0) {
            output.push(idx - start + 1);
            start = idx + 1;
        }
    }
    return output;
}

// track number of open characters, use map for counts
export function partitionLabelsAlt2(s: string): number[] {
    const counts = new Map<string, number>();
    for (const char of s) {
        counts.set(char, (counts.get(char) || 0) + 1);
    }

    const output = [];
    const open = new Set<string>();
    let start = 0;

    for (let idx = 0; idx < s.length; idx++) {
        open.add(s[idx]);
        const count = counts.get(s[idx]) - 1;
        counts.set(s[idx], count);

        if (count === 0) {
            open.delete(s[idx]);
        }
        if (open.size === 0) {
            output.push(idx - start + 1);
            start = idx + 1;
        }
    }
    return output;
}
