export function isPalindrome(s: string) {
    s = s.toLocaleLowerCase()
        .split("")
        .filter(c => (c >= "a" && c <= "z") || (c >= "0" && c <= "9"))
        .join("");

    let low = 0;
    let hi = s.length - 1;

    while (low <= hi) {
        if (s[low] !== s[hi]) return false
        low++;
        hi--;
    }
    return true;
}