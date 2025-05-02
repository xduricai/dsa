// LC 838 (https://leetcode.com/problems/push-dominoes/description)

export function pushDominoes(dominoes: string): string {
    const n = dominoes.length;
    const forceLeft = Array(n).fill(0);
    const forceRight = Array(n).fill(0);
    const res = Array(n).fill(".");
    let force = 0;

    for (let idx = 0; idx < n; idx++) {
        if (dominoes[idx] === "R") {
            forceRight[idx] = n;
        } else if (
            dominoes[idx] === "." &&
            idx > 0 &&
            forceRight[idx - 1] > 0
        ) {
            forceRight[idx] = forceRight[idx - 1] - 1;
        } else {
            forceRight[idx] = 0;
        }
    }

    for (let idx = n - 1; idx >= 0; idx--) {
        if (dominoes[idx] === "L") {
            forceLeft[idx] = n;
        } else if (
            dominoes[idx] === "." &&
            idx < n - 1 &&
            forceLeft[idx + 1] > 0
        ) {
            forceLeft[idx] = forceLeft[idx + 1] - 1;
        } else {
            forceLeft[idx] = 0;
        }
    }

    for (let idx = 0; idx < n; idx++) {
        if (forceRight[idx] < forceLeft[idx]) {
            res[idx] = "L";
        } else if (forceRight[idx] > forceLeft[idx]) {
            res[idx] = "R";
        }
    }

    return res.join("");
}

// BFS solution using a queue and a set to keep track of elements changed on the current level
export function pushDominoesBfs(dominoes: string): string {
    const res = dominoes.split("");
    let queue = [];

    for (let idx = 0; idx < dominoes.length; idx++) {
        if (dominoes[idx] === "L") {
            queue.push([dominoes[idx], idx - 1]);
        }
        if (dominoes[idx] === "R") {
            queue.push([dominoes[idx], idx + 1]);
        }
    }

    while (queue.length) {
        const nextQueue = [];
        const fresh = new Set<number>();

        for (const [dir, idx] of queue) {
            if (idx < 0 || idx === dominoes.length) {
                continue;
            }

            if (res[idx] === ".") {
                res[idx] = dir;
                fresh.add(idx);
                nextQueue.push([dir, dir === "L" ? idx - 1 : idx + 1]);
            } else if (dir !== res[idx] && fresh.has(idx)) {
                res[idx] = "X";
            }
        }

        queue = nextQueue;
    }

    return res.map((char) => (char === "X" ? "." : char)).join("");
}
