/**
 * Returns a promise that resolves after a timeout of ms milliseconds
 *
 * @param {*} ms milliseconds
 */
 export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateCode() {
    return Math.random().toString(36).substr(2, 5).toLocaleUpperCase();
}
