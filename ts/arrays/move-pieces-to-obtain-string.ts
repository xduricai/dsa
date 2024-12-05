export function canChange(start: string, target: string) {
    const N = start.length;
    let sIdx = 0;
    let tIdx = 0;

    while (sIdx < N || tIdx < N) {
        while (sIdx < N && start[sIdx] === "_") {
            sIdx++;
        }
        while (tIdx < N && target[tIdx] === "_") {
            tIdx++;
        }

        if (
            sIdx === N ||
            tIdx === N ||
            start[sIdx] !== target[tIdx] ||
            (start[sIdx] === "L" && sIdx < tIdx) ||
            (start[sIdx] === "R" && sIdx > tIdx)
        ) {
            break;
        }
        sIdx++;
        tIdx++;
    }
    return sIdx === N && tIdx === N;
}

// suboptimal double pass solution
export function canChangeAlt(start: string, target: string): boolean {
    let lastRight = -1;
    const lefts = [];

    for (let idx = 0; idx <= start.length; idx++) {
        if (target[idx] === "L") {
            lefts.push(idx);
        }
        if (start[idx] === "L") {
            if (!lefts.length || lefts.pop() <= lastRight) {
                return false;
            }
        }
        if (start[idx] === "R" || target[idx] === "R") {
            lastRight = idx;
        }
    }

    if (lefts.length !== 0) {
        return false;
    }

    let lastLeft = start.length;
    const rights = [];

    for (let idx = start.length - 1; idx >= 0; idx--) {
        if (target[idx] === "R") {
            rights.push(idx);
        }
        if (start[idx] === "R") {
            if (!rights.length || rights.pop() >= lastLeft) {
                return false;
            }
        }
        if (start[idx] === "L" || target[idx] === "L") {
            lastLeft = idx;
        }
    }

    return rights.length === 0;
}
