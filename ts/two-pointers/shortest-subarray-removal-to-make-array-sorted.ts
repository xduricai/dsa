// optimal solution
export function findLengthOfShortestSubarray(arr: number[]): number {
    let right = arr.length - 1;

    while (right > 0 && arr[right - 1] <= arr[right]) {
        right--;
    }

    let res = right;
    let left = 0;

    while (left < right) {
        while (right < arr.length && arr[left] > arr[right]) {
            right++;
        }

        res = Math.min(res, right - left - 1);

        if (arr[left] > arr[left + 1]) {
            break;
        }

        left++;
    }

    return res;
}

// might not work on every test case
export function findLengthOfShortestSubarrayAlt(arr: number[]): number {
    let prefix = 1;
    let suffix = 1;

    for (let idx = 0; idx < arr.length - 1; idx++) {
        if (arr[idx] > arr[idx + 1]) {
            break;
        }
        prefix++;
    }

    if (prefix === arr.length) {
        return 0;
    }

    for (let idx = arr.length - 1; idx >= prefix; idx--) {
        if (arr[idx] < arr[idx - 1]) {
            break;
        }
        suffix++;
    }

    let res = Math.min(arr.length - prefix, arr.length - suffix);
    let left = prefix - 1;
    let right = arr.length - suffix;

    while (arr[left] > arr[right]) {
        if (left === 0) {
            prefix--;
            break;
        }
        if (right === arr.length - 1) {
            suffix--;
            break;
        }

        if (arr[left] - arr[left - 1] > arr[right + 1] - arr[right]) {
            left--;
            prefix--;
        } else {
            right++;
            suffix--;
        }
    }

    return Math.min(res, arr.length - prefix - suffix);
}
