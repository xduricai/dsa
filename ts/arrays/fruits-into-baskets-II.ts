// LC 3477 (https://leetcode.com/problems/fruits-into-baskets-ii/description)

export function numOfUnplacedFruits(
    fruits: number[],
    baskets: number[]
): number {
    let res = fruits.length;

    for (const fruit of fruits) {
        for (let idx = 0; idx < baskets.length; idx++) {
            if (baskets[idx] >= fruit) {
                baskets[idx] = 0;
                res--;
                break;
            }
        }
    }

    return res;
}
