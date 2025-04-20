// LC 781 (https://leetcode.com/problems/rabbits-in-forest)
export function numRabbits(answers: number[]): number {
    const counter = new Map<number, number>();
    let res = 0;

    for (const ans of answers) {
        const count = counter.get(ans) || 0;
        counter.set(ans, count + 1);
    }

    // +1 because the rabbit giving the answer is also a part of the group
    for (const [ans, count] of counter) {
        res += Math.ceil(count / (ans + 1)) * (ans + 1);
    }

    return res;
}
