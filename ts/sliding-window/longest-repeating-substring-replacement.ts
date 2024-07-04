export function characterReplacement(s: string, k: number) {
    const counts = new Array(26).fill(0);
    const a = "A".charCodeAt(0);
    let max = 0;
    let left = 0;

    for(let right = 0; right < s.length; right++) {
        let idx = s.charCodeAt(right) - a;
        counts[idx]++;

        if (right - left + 1 > k + Math.max(...counts)) {
            idx = s.charCodeAt(left) - a;
            counts[idx]--;
            left++;
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
}


export function characterReplacementOptimal(s: string, k: number) {
    const counts = new Array(26).fill(0);
    const a = "A".charCodeAt(0);
    let max = 0;
    let left = 0;
    let maxF = 0;

    for(let right = 0; right < s.length; right++) {
        let idx = s.charCodeAt(right) - a;
        counts[idx]++;
        maxF = Math.max(maxF, counts[idx]);

        if (right - left + 1 > k + maxF) {
            idx = s.charCodeAt(left) - a;
            counts[idx]--;
            left++;
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
}