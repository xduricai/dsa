// LC 3304 (https://leetcode.com/problems/find-the-k-th-character-in-string-game-i)

export function kthCharacter(k: number): string {
    let arr = [0];

    while (arr.length < k) {
        const max = arr.length;

        for (let idx = 0; idx < max && arr.length < k; idx++) {
            arr.push(arr[idx] + 1);
        }
    }

    return String.fromCharCode((arr.at(-1) % 26) + "a".charCodeAt(0));
}
