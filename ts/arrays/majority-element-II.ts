export function majorityElement(nums: number[]): number[] {
    let numA = -1;
    let numB = -1;
    let countA = 0;
    let countB = 0;

    for (const num of nums) {
        if (num === numA) {
            countA++;
        } else if (num === numB) {
            countB++;
        } else if (!countA) {
            numA = num;
            countA++;
        } else if (!countB) {
            numB = num;
            countB++;
        } else {
            countA--;
            countB--;
        }
    }

    const res = [];
    const min = Math.floor(nums.length / 3);
    countA = 0;
    countB = 0;

    for (const num of nums) {
        if (num === numA) countA++;
        else if (num === numB) countB++;
    }

    if (countA > min) res.push(numA);
    if (countB > min) res.push(numB);

    return res;
}
