export function findJudge(n: number, trust: number[][]): number {
    const delta = Array(n + 1).fill(0);

    for (const [from, to] of trust) {
        delta[from]--;
        delta[to]++;
    }

    for (let person = 1; person <= n; person++) {
        if (delta[person] === n - 1) {
            return person;
        }
    }

    return -1;
}

function findJudgeAlt(n: number, trust: number[][]): number {
    const indegree = Array(n + 1).fill(0);
    const outdegree = Array(n + 1).fill(0);

    for (const [from, to] of trust) {
        outdegree[from]++;
        indegree[to]++;
    }

    for (let person = 1; person <= n; person++) {
        if (indegree[person] === n - 1 && outdegree[person] === 0) {
            return person;
        }
    }

    return -1;
}
