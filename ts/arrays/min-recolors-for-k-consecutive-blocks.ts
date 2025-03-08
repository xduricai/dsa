export function minimumRecolors(blocks: string, k: number): number {
    let white = 0;
    let res = k;

    for (let idx = 0; idx < blocks.length; idx++) {
        if (idx >= k && blocks[idx - k] === "W") {
            white--;
        }
        if (blocks[idx] === "W") {
            white++;
        }
        if (idx + 1 >= k) {
            res = Math.min(res, white);
        }
    }

    return res;
}
