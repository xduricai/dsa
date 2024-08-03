export function encode(strs: string[]) {
    let ret = "";

    for (let str of strs) {
        ret = `${ret}${str.length}@${str}`;
    }
    return ret;
}

export function decode(str: string) {
    const ret: string[] = [];
    let idx = 0;
    let lengthString = "";

    while (idx < str.length) {
        if (str[idx] !== "@") {
            lengthString = `${lengthString}${str[idx]}`;
            idx++;
            continue;
        }

        const length = parseInt(lengthString);
        idx++;

        ret.push(str.slice(idx, idx + length));
        idx += length;
        lengthString = "";
    }
    return ret;
}
