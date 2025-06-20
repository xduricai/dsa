// LC 3443 (https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes)
export function maxDistance(s: string, k: number): number {
    let up = 0;
    let down = 0;
    let left = 0;
    let right = 0;
    let res = 0;

    for (const char of s) {
        switch (char) {
            case "N":
                up++;
                break;
            case "S":
                down++;
                break;
            case "E":
                right++;
                break;
            case "W":
                left++;
                break;
        }

        const smaller = Math.min(up, down) + Math.min(left, right);
        const larger = Math.max(up, down) + Math.max(left, right);
        const diff = Math.min(smaller, k) * 2;

        res = Math.max(res, larger - smaller + diff);
    }

    return res;
}
