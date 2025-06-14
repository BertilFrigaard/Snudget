"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { name: "Bertil", value: 208 },
    { name: "Mikkel", value: 180 },
    { name: "Sophia", value: 400 },
];

const COLORS = ["#58CC02", "#4A90E2", "#FDCB42"];

export default function CustomPieChart() {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
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
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{
                            paddingTop: "10px",
                            fontWeight: 600,
                            color: "#374151",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
