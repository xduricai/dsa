export function doesValidArrayExist(derived: number[]): boolean {
    const first = true;
    let last = true;

    for (const bit of derived) {
        if (bit) last = !last;
    }

    return first === last;
}

export function doesValidArrayExistAlt(derived: number[]): boolean {
    const test = Array(derived.length).fill(false);
    test[0] = true;

    for (let idx = 0; idx < derived.length - 1; idx++) {
        if (derived[idx]) {
            test[idx + 1] = !test[idx];
        } else {
            test[idx + 1] = test[idx];
        }
    }

    return (
        (derived.at(-1) && test[0] !== test.at(-1)) ||
        (!derived.at(-1) && test[0] === test.at(-1))
    );
}
