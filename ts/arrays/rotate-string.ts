export function rotateString(s: string, goal: string): boolean {
    if (s.length !== goal.length) {
        return false;
    }

    for (let offset = 0; offset < s.length; offset++) {
        for (let idx = 0; idx < s.length; idx++) {
            if (goal[idx] !== s[(idx + offset) % s.length]) {
                break;
            }
            if (idx === s.length - 1) {
                return true;
            }
        }
    }
    return false;
}

export function rotateStringAlt(s: string, goal: string): boolean {
    return s.length === goal.length && `${s}${s}`.includes(goal);
}
