export function logError(e: any) {
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        console.error("Unknown error: " + e);
    }
}
