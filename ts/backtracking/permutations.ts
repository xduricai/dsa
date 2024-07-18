// recursive approach
export function permute(nums: number[]): number[][] {
    const perms = [];
    const current = [];

    const backtrack = (elements: number[]) => {
        if (!elements.length) {
            perms.push([...current]);
            return;
        }

        for (let idx = 0; idx < elements.length; idx++) {
            current.push(elements[idx]);
            backtrack(elements.filter((_, eIdx) => eIdx !== idx));
            current.pop();
        }
    }
    backtrack(nums);
    return perms;
}

// iterative approach
export function permuteIterative(nums: number[]): number[][] {
    let perms = [[]];

    for (let num of nums) {
        const newPerms = [];

        for (let perm of perms) {
            for (let idx = 0; idx <= perm.length; idx++) {
                const copy = [...perm];
                copy.splice(idx, 0, num);
                newPerms.push(copy);
            }
        }
        perms = newPerms;
    }
    return perms;
}