export function simplifyPath(path: string): string {
    const parts = path.split("/");
    const stack = [];

    for (const part of parts) {
        if (part === "..") {
            stack.pop();
        } else if (part === "." || !part) {
            continue;
        } else {
            stack.push(part);
        }
    }

    return `/${stack.join("/")}`;
}
