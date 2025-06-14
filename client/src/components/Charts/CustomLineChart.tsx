"use client";

import { Entry } from "@/types/entryTypes";
import { RedactedUser } from "@/types/redactedUser";
import { prepareForLineChart } from "@/utils/formatUtils";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CustomLineChart({ players, entries }: { players: RedactedUser[]; entries: Entry[] }) {
    const data = prepareForLineChart(entries, players);

    const chartColors = [
        "#58CC02", // Green (primary - Snudget style)
        "#4A90E2", // Blue
        "#FDCB42", // Yellow/Orange
        "#FF6B6B", // Coral Red
        "#A66DD4", // Purple
        "#00C2A8", // Teal
        "#FF8C42", // Orange
        "#BDBDBD", // Gray
        "#FF4F81", // Pink
        "#0081A7", // Deep blue
    ];

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
                    {players.map((p, i) => (
                        <Line
                            key={p.id}
                            type="monotone"
                            dataKey={p.username}
                            stroke={chartColors[i >= chartColors.length ? 0 : i]}
                            strokeWidth={4}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 2, fill: "#fff", stroke: "#58CC02" }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
