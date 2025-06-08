import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from "recharts";
import "./ReBarChart.css";

function ReBarChart() {
  const data = [
    {
      name: "Sept",
      Courses: 15,
      Earnings: 40,
    },
    {
      name: "Oct",
      Courses: 12,
      Earnings: 30,
    },
    {
      name: "Nov",
      Courses: 16,
      Earnings: 20,
    },
    {
      name: "Dec",
      Courses: 11,
      Earnings: 27,
    },
  ];

  return (
    <div className="statistic-card">
      <h4>Earning</h4>

      <BarChart width={600} height={410} data={data}>
        <CartesianGrid strokeDasharray="100 10" />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Earnings" fill="#2c7da0" />
        <Bar dataKey="Courses" fill="#3caddd" />
      </BarChart>
    </div>
  );
}

export default ReBarChart;
