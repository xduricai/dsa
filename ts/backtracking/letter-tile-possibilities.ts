export function numTilePossibilities(tiles: string): number {
    const current = [];
    const counter = new Map<string, number>();
    let res = 0;

    for (const char of tiles) {
        const count = counter.get(char) || 0;
        counter.set(char, count + 1);
    }

    const backtrack = (len: number) => {
        if (len === tiles.length) {
            return;
        }

        for (const letter of counter.keys()) {
            const count = counter.get(letter);
            if (!count) {
                continue;
            }

            counter.set(letter, count - 1);
            backtrack(len + 1);
            counter.set(letter, count);
            res++;
        }
    };

    backtrack(0);
    return res;
}
