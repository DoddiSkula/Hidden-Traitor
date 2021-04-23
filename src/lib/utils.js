/**
 * Returns a promise that resolves after a timeout of ms milliseconds
 *
 * @param {*} ms milliseconds
 */
 export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
