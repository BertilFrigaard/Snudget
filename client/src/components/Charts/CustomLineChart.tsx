"use client";

import { Entry } from "@/types/entry";
import { RedactedUser } from "@/types/redactedUser";
import { formatDate } from "@/utils/formatUtils";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CustomLineChart({ players, entries }: { players: RedactedUser[]; entries: Entry[] }) {
    const data = [
        { name: "Bertil", value: 208 },
        { name: "Mikkel", value: 180 },
        { name: "Sophia", value: 400 },
    ];

    console.log(
        players.map((player) => {
            return {
                name: player.username,
                entries: entries.map((entry) => {
                    if (entry.user_id == player.id) {
                        return { name: formatDate(new Date(entry.created_at)), value: entry.score_change };
                    }
                }),
            };
        })
    );

    /* 
    // Step 1: Collect all unique dates
    const dateSet = new Set<string>();
    for (const entries of Object.values(raw)) {
        for (const { name } of entries) {
            dateSet.add(name);
        }
    }
    const allDates = Array.from(dateSet);

    // Step 2: Merge scores by date
    const data = allDates.map((date) => {
        const point: { name: string; [player: string]: any } = { name: date };

        for (const [player, entries] of Object.entries(raw)) {
            const match = entries.find((e) => e.name === date);
            point[player] = match?.value ?? 0;
        }

        return point;
    });

    // Optional: sort by date (naively assumes format like "24 jan")
    const months = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11,
    };

    data.sort((a, b) => {
        const [dayA, monthA] = a.name.split(" ");
        const [dayB, monthB] = b.name.split(" ");
        const dateA = new Date(2024, months[monthA], parseInt(dayA));
        const dateB = new Date(2024, months[monthB], parseInt(dayB));
        return dateA.getTime() - dateB.getTime();
    }); */

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" /> {/* light gray */}
                    <XAxis
                        dataKey="name"
                        tick={{ fill: "#4B5563", fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis tick={{ fill: "#4B5563", fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "12px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#111827",
                        }}
                    />
                    <Legend
                        iconType="circle"
                        wrapperStyle={{
                            paddingTop: "10px",
                            fontWeight: 600,
                            color: "#374151",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="bertil"
                        stroke="#58CC02"
                        strokeWidth={4}
                        dot={false}
                        activeDot={{ r: 6, strokeWidth: 2, fill: "#fff", stroke: "#58CC02" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="mikkel"
                        stroke="#4A90E2"
                        strokeWidth={4}
                        dot={false}
                        activeDot={{ r: 6, strokeWidth: 2, fill: "#fff", stroke: "#4A90E2" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
