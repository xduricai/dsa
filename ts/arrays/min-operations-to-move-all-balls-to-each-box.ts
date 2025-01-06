export function minOperations(boxes: string): number[] {
    const res = Array(boxes.length).fill(0);
    let balls = 0;
    let moves = 0;

    for (let idx = 0; idx < boxes.length; idx++) {
        res[idx] += moves;

        if (boxes[idx] === "1") {
            balls++;
        }
        moves += balls;
    }

    balls = 0;
    moves = 0;

    for (let idx = boxes.length - 1; idx >= 0; idx--) {
        res[idx] += moves;

        if (boxes[idx] === "1") {
            balls++;
        }
        moves += balls;
    }

    return res;
};

export function minOperationsAlt(boxes: string): number[] {
    const res = [];
    let ballsLeft = 0;
    let distLeft = 0;
    let ballsRight = 0;
    let distRight = 0;

    for (let idx = 0; idx < boxes.length; idx++) {
        if (boxes[idx] === "1") {
            ballsRight++;
            distRight += idx + 1;
        }
    }

    for (let idx = 0; idx < boxes.length; idx++) {
        distRight -= ballsRight;
        if (boxes[idx] === "1") {
            ballsRight--;
        }

        res.push(distLeft + distRight);

        if (boxes[idx] === "1") {
            ballsLeft++;
        }
        distLeft += ballsLeft;
    }

    return res;
};