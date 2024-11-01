export function makeFancyString(s: string): string {
    let output = "";
    let left = 0;
    let right = 0;

    while (right < s.length) {
        if (s[left] !== s[right]) {
            left = right;
        } else if (right - left < 2) {
            output = `${output}${s[right]}`;
            right++;
        } else {
            right++;
        }
    }
    return output;
}
