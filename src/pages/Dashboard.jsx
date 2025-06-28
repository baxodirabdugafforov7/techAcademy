import React, { useState } from "react";
import {
  FaUsers, FaUserCheck, FaUserSlash, FaUserGraduate,
  FaMoneyBillWave, FaTachometerAlt
} from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import TopBar from "@/components/employees/TopBar";
import avatar from "@/assets/icons/react.svg";

const statCards = [
  { title: "Active Students", count: 40, icon: <FaUserCheck className="text-4xl text-green-600" />, change: "↓ 50.01%" },
  { title: "Groups", count: 4, icon: <FaUsers className="text-4xl text-blue-600" />, change: "↑ 10.09%" },
  { title: "Unpaid", count: 18, icon: <FaUserSlash className="text-4xl text-red-600" />, change: "↓ 40.12%" },
  { title: "Paid", count: 134, icon: <FaMoneyBillWave className="text-4xl text-green-700" />, change: "↑ 17%" },
  { title: "Graduated", count: 40, icon: <FaUserGraduate className="text-4xl text-gray-500" />, change: "↓ 50.01%" },
  { title: "Total Students", count: 190, icon: <FaUsers className="text-4xl text-indigo-600" />, change: "↑ 70%" },
];

const studentTrendData = [
  { name: "Jan", hoursA: 0, hoursB: 20 },
  { name: "Feb", hoursA: 10, hoursB: 40 },
  { name: "Mar", hoursA: 5, hoursB: 20 },
  { name: "Apr", hoursA: 20, hoursB: 40 },
  { name: "May", hoursA: 40, hoursB: 50 },
  { name: "Jun", hoursA: 55, hoursB: 30 },
  { name: "Jul", hoursA: 30, hoursB: 45 },
  { name: "Aug", hoursA: 36, hoursB: 40 },
  { name: "Sep", hoursA: 40, hoursB: 42 },
  { name: "Oct", hoursA: 20, hoursB: 46 },
  { name: "Nov", hoursA: 45, hoursB: 30 },
  { name: "Dec", hoursA: 20, hoursB: 50 },
];


const sampleMentors = [
  { name: "Narimanov Sardor", exp: "3 years", img: avatar },
  { name: "Abdugafforov Baxodir", exp: "2 years", img: avatar },
  { name: "Abdugafforov Jaxongir", exp: "1 years", img: avatar },
];


const pieData = [
  { name: "Income", value: 8000, color: "#4ade80" },
  { name: "Expense", value: 3000, color: "#f87171" },
  { name: "Profit", value: 5000, color: "#60a5fa" },
];

const DashboardPage = () => {
  const [userName, setUserName] = useState("Baxodir");

  return (
    <div className="p-6 space-y-6">
      <TopBar userName={userName} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-xl h-48 flex items-center justify-between"
            >
              <div className="text-5xl">{card.icon}</div>
              <div>
                <p className="text-base text-gray-500">{card.title}</p>
                <h3 className="text-4xl font-extrabold text-gray-800">{card.count}</h3>
                <p className="text-base text-green-600 mt-1">Change: {card.change}</p>
              </div>
              
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[330px] xl:w-[360px] bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Mentor List</h3>
          <div className="space-y-4">
            {sampleMentors.map((mentor, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src={mentor.img} alt={mentor.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-medium text-sm">{mentor.name}</p>
                  <p className="text-xs text-gray-500">Experience: {mentor.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Hours Line Chart with Target */}
        <div className="bg-white p-6 rounded-2xl shadow-xl h-[460px]">
          <h3 className="text-xl font-semibold mb-4">Monthly Study Hours</h3>
          <div className="h-[370px] -mt-2 -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={studentTrendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis ticks={[0, 20, 40, 60]} domain={[0, 60]} />
                <Tooltip formatter={(value) => `${value} hrs`} />
                <Line
                  type="monotone"
                  dataKey="hoursA"
                  name="Hours A"
                  stroke="#34D399" // green
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="hoursB"
                  name="Hours B"
                  stroke="#F87171" // red
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Financial Statistics</h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={130}
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="100%"
                  label={({ name, value }) => `${name}: $${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around mt-6 text-sm text-gray-600">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
