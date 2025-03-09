export function numberOfAlternatingGroups(colors: number[], k: number): number {
    let res = 0;
    let streak = 0;

    for (let iter = 1; iter < colors.length + k; iter++) {
        const idx = iter % colors.length;

        if (colors.at(idx - 1) === colors.at(idx)) {
            streak = 1;
        } else {
            streak++;
        }

        if (streak >= k) {
            res++;
        }
    }

    return res;
}
