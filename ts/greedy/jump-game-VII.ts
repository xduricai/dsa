export function canReach(s: string, minJump: number, maxJump: number): boolean {
    const dp = new Array(s.length).fill(false);
    dp[0] = true;
    // a pointer to the rightmost position that has been reached so far
    let right = 0;

    for (let left = 0; left < s.length; left++) {
        // if we can't reach the current position we logically cannot jump from it
        if (!dp[left]) {
            continue;
        }

        // leftmost unexplored position that we can jump to
        right = Math.max(right, left + minJump);
        // rightmost position we can jump to (+1)
        const max = Math.min(left + maxJump + 1, s.length);

        // check all unexplored positions we can reach
        while (right < max) {
            dp[right] = s[right] === "0";
            right++;
        }
    }

    return dp.at(-1);
}

export function canReachBfs(
    s: string,
    minJump: number,
    maxJump: number
): boolean {
    let queue = [0];
    let farthest = 0;

    while (queue.length) {
        const nextQueue = [];

        for (const point of queue) {
            if (point === s.length - 1) {
                return true;
            }

            const start = Math.max(point + minJump, farthest + 1);
            const end = Math.min(point + maxJump + 1, s.length);

            for (let idx = start; idx < end; idx++) {
                if (s[idx] === "0") {
                    nextQueue.push(idx);
                }
            }
            farthest = point + maxJump;
        }
        queue = nextQueue;
    }

    return false;
}
