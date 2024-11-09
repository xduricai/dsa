export function minEnd(n: number, x: number): number {
    let res = 0;
    let pow = 1;
    let z = n - 1;

    while (x || z) {
        if (x & 1) {
            res += pow;
        } else {
            if (z & 1) {
                res += pow;
            }
            z >>= 1;
        }

        x >>= 1;
        pow += pow;
    }

    return res;
}

export function minEndAlt(n: number, x: number): number {
    const bitmask = Array(63).fill(false);

    // create a bitmask from x
    let add = x;
    let offset = 0;

    while (add) {
        bitmask[offset] = !!(add & 1);
        offset++;
        add >>= 1;
    }

    // OR zero bits of the bitmaks with n-1
    add = n - 1;
    offset = 0;

    while (add) {
        while (bitmask[offset]) {
            offset++;
        }

        bitmask[offset] = !!(add & 1);
        offset++;
        add >>= 1;
    }

    // convert result into int64
    let res = 0;
    let pow = 1;

    for (let idx = 0; idx < 63; idx++) {
        if (bitmask[idx]) {
            res += pow;
        }
        pow += pow;
    }
    return res;
}
