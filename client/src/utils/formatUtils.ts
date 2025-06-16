import { Entry, EntryLinePoint, SemiFormattedEntry } from "@/types/entryTypes";
import { RedactedUser } from "@/types/redactedUser";

export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
    });
}

export function getNumberEnd(number: number): string {
    if (number === 1) {
        return "st";
    } else if (number === 2) {
        return "nd";
    } else if (number === 3) {
        return "rd";
    } else if (number >= 4) {
        return "th";
    } else {
        return "";
    }
}

export function prepareForLineChart(entries: Entry[], players: RedactedUser[]): EntryLinePoint[] {
    entries.sort((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    const semiFormattedEntries: SemiFormattedEntry[] = entries.flatMap((entry) => {
        const p = players.find((player) => {
            return player.id == entry.user_id;
        });
        if (p) {
            return {
                id: p.id,
                name: p.username,
                amount: entry.score_change,
                date: formatDate(new Date(entry.created_at)),
            };
        } else {
            return [];
        }
    });
    const runningPlayers: { [key: string]: number } = {};

    const data: EntryLinePoint[] = [];
    let workingPoint: EntryLinePoint = {};

    for (let i = 0; i < semiFormattedEntries.length; i++) {
        const curEntry = semiFormattedEntries[i];
        if (!curEntry) {
            continue;
        }
        if (workingPoint.name && workingPoint.name !== curEntry.date) {
            data.push(workingPoint);
            workingPoint = {};
        }
        if (!runningPlayers[curEntry.id]) {
            runningPlayers[curEntry.id] = 0;
        }
        runningPlayers[curEntry.id] += curEntry.amount;

        workingPoint.name = curEntry.date;
        workingPoint[curEntry.name] = runningPlayers[curEntry.id];
    }
    if (workingPoint.name) {
        data.push(workingPoint);
    }
    return data;
}
