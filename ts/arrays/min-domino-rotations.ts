// LC 1007 (https://leetcode.com/problems/minimum-domino-rotations-for-equal-row)

export function minDominoRotations(tops: number[], bottoms: number[]): number {
    const n = tops.length;
    const topValues = Array(6).fill(0);
    const botValues = Array(6).fill(0);
    const sameValues = Array(6).fill(0);
    let res = Infinity;

    for (let idx = 0; idx < n; idx++) {
        if (tops[idx] === bottoms[idx]) {
            sameValues[tops[idx] - 1]++;
        } else {
            topValues[tops[idx] - 1]++;
            botValues[bottoms[idx] - 1]++;
        }
    }

    for (let num = 0; num < 6; num++) {
        if (topValues[num] + botValues[num] + sameValues[num] === n) {
            res = Math.min(topValues[num], botValues[num]);
        }
    }

    if (res === Infinity) {
        return -1;
    }
    return res;
}

// only check the counts for the values on the first piece since either of them has to be on every piece for an solution to exist
export function minDominoRotationsAlt(
    tops: number[],
    bottoms: number[]
): number {
    const countPieces = (target: number) => {
        let top = 0;
        let bot = 0;

        for (let idx = 0; idx < tops.length; idx++) {
            if (tops[idx] !== target && bottoms[idx] !== target) {
                return -1;
            }
            if (tops[idx] === bottoms[idx]) {
                continue;
            }

            if (tops[idx] === target) {
                top++;
            } else {
                bot++;
            }
        }

        return Math.min(top, bot);
    };

    const firstTop = countPieces(tops[0]);
    const firstBot = countPieces(bottoms[0]);

    if (firstTop === -1) {
        return firstBot;
    }
    if (firstBot === -1) {
        return firstTop;
    }
    return Math.min(firstTop, firstBot);
}
