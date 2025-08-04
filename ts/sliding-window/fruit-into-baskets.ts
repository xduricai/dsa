// LC 904 (https://leetcode.com/problems/fruit-into-baskets)

export function totalFruit(fruits: number[]): number {
    const fruitMap = new Map<number, number>();
    let res = 0;
    let sum = 0;
    let left = 0;

    for (let right = 0; right < fruits.length; right++) {
        const rightCount = fruitMap.get(fruits[right]) || 0;
        fruitMap.set(fruits[right], rightCount + 1);
        sum++;

        while (fruitMap.size > 2) {
            const leftCount = fruitMap.get(fruits[left]);

            if (leftCount === 1) {
                fruitMap.delete(fruits[left]);
            } else {
                fruitMap.set(fruits[left], leftCount - 1);
            }

            left++;
            sum--;
        }

        res = Math.max(res, sum);
    }

    return res;
}
