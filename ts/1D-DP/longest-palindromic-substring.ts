// O(n^2)
export function longestPalindrome(s: string): string {
    let res = "";

    const inBounds = (left: number, right: number) =>
        left >= 0 && right < s.length;

    const findMax = (left: number, right: number) => {
        while (inBounds(left, right)) {
            if (s[left] !== s[right]) {
                return;
            }
            if (right - left + 1 > res.length) {
                res = s.slice(left, right + 1);
            }
            left--;
            right++;
        }
    };

    for (let idx = 0; idx < s.length; idx++) {
        findMax(idx, idx);
        findMax(idx, idx + 1);
    }

    return res;
}

// O(1)
export function manacher(s: string) {
    const str = `#${s.split("").join("#")}#`;
    const arr = Array(str.length).fill(0);
    let mid = 0;
    let right = 0;

    for (let idx = 0; idx < str.length; idx++) {
        if (idx < right) {
            arr[idx] = Math.min(arr[2 * mid - idx], right - idx);
        }

        while (
            idx - arr[idx] - 1 >= 0 &&
            idx + arr[idx] + 1 < str.length &&
            str[idx - arr[idx] - 1] === str[idx + arr[idx] + 1]
        ) {
            arr[idx]++;
        }

        if (right < idx + arr[idx]) {
            mid = idx;
            right = arr[idx] + idx;
            if (right === str.length - 1) {
                break;
            }
        }
    }

    const max = Math.max(...arr);
    const start = Math.floor((arr.indexOf(max) - max) / 2);
    const end = start + max;
    return s.slice(start, end);
}
