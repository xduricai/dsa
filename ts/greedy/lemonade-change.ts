export function lemonadeChange(bills: number[]): boolean {
    let fives = 0;
    let tens = 0;

    for (const bill of bills) {
        if (bill === 5) {
            fives++;
        } else if (bill === 10) {
            fives--;
            tens++;
        } else if (fives && tens) {
            fives--;
            tens--;
        } else {
            fives -= 3;
        }

        if (fives < 0 || tens < 0) {
            return false;
        }
    }

    return true;
}
