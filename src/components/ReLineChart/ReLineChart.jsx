import "./ReLineChart.css";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

function ReLineChart() {
  const data = [
    {
      name: "Sept",
      Followers: 24,
    },
    {
      name: "Oct",
      Followers: 18,
    },
    {
      name: "Nov",
      Followers: 30,
    },
    {
      name: "Dec",
      Followers: 39,
    },
  ];

  return (
    <div className="statistic-card">
      <LineChart
        width={600}
        height={410}
        data={data}
        margin={{ top: 25, right: 5, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Followers" stroke="#2c7da0" />
      </LineChart>
    </div>
  );
}

export default ReLineChart;
