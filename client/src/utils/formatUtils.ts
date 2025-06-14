export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
    });
}
