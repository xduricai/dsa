type MountainArray = {
    length: () => number;
    get: (idx: number) => number;
};

export function findInMountainArray(
    target: number,
    mountainArr: MountainArray
) {
    const len = mountainArr.length();
    let peak = -1;

    let left = 0;
    let right = len - 1;

    // find the top of the mountain
    while (left <= right) {
        const mid = (left + right) >> 1;
        const midVal = mountainArr.get(mid);
        const rightVal = mountainArr.get(mid + 1);

        if (midVal < rightVal) {
            left = mid + 1;
        } else {
            // check if we're at the top of the mountain
            if (mountainArr.get(mid - 1) < midVal) {
                peak = mid;
                break;
            }

            right = mid - 1;
        }
    }

    left = 0;
    right = peak;

    // search the left side of the mountain
    while (left <= right) {
        const mid = (left + right) >> 1;
        const val = mountainArr.get(mid);

        if (val === target) {
            return mid;
        }

        if (val > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    left = peak + 1;
    right = len;

    // search the right side of the mountain
    while (left <= right) {
        const mid = (left + right) >> 1;
        const val = mountainArr.get(mid);

        if (val === target) {
            return mid;
        }

        if (val < target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}
