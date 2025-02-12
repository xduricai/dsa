export function maximumSum(nums: number[]): number {
    // use a map to track the two highest values for a given digit sum
    const sumMap = new Map<number, number[]>();
    let max = -1;

    for (const num of nums) {
        const sum = sumDigits(num);
        const list = sumMap.get(sum);

        if (!list) {
            sumMap.set(sum, [0, num]);
            continue;
        }

        // check if either value needs to be updated
        if (num > list[1]) {
            list[0] = list[1];
            list[1] = num;
        } else if (num > list[0]) {
            list[0] = num;
        }

        // we definitely have two values and can check the sum against the current max
        max = Math.max(max, list[0] + list[1]);
    }

    return max;
}

function sumDigits(num: number): number {
    let res = 0;

    while (num) {
        res += num % 10;
        num = Math.floor(num / 10);
    }

    return res;
}
