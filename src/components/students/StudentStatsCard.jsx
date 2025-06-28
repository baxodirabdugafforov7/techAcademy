import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Active", value: 540 },
  { name: "Inactive", value: 120 },
  { name: "Graduated", value: 340 },
];

const COLORS = ["#34D399", "#F87171", "#60A5FA"]; // green, red, blue

const StudentStatsCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-semibold mb-4">Student Statistics</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentStatsCard;
