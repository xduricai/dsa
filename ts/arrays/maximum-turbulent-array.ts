export function maxTurbulenceSize(arr: number[]): number {
    let left = 0;
    let right = 1;
    let max = 1;
    let prev = "";

    while (right < arr.length) {
        if (arr[right - 1] > arr[right] && prev !== ">") {
            max = Math.max(max, right - left + 1);
            prev = ">";
            right++;
        } else if (arr[right - 1] < arr[right] && prev !== "<") {
            max = Math.max(max, right - left + 1);
            prev = "<";
            right++;
        } else {
            if (arr[right - 1] === arr[right]) {
                right++;
            }
            left = right - 1;
            prev = "";
        }
    }

    return max;
}
