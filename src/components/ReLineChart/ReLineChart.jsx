import { useDispatch, useSelector } from "react-redux";
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
import { useEffect, useState } from "react";
import { earningsStatistics } from "../../features/statistics/statisticsThunk";

const formatter = new Intl.DateTimeFormat("en", { month: "short" });

function ReLineChart() {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2025);
  const { earnings } = useSelector((state) => state.statistics);

  const earningsStatisticsData = earnings?.statistics?.map((item) => ({
    ...item,
    month: formatter.format(new Date(2025, item.month - 1)),
    Earnings: item.total_earning,
  }));

  useEffect(() => {
    dispatch(earningsStatistics(Number(year)));
  }, [dispatch, year]);

  return (
    <div className="statistic-card card5">
      <div className="header">
        <h4>Earnings</h4>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <LineChart
        width={540}
        height={410}
        data={earningsStatisticsData}
        margin={{ top: 25, right: 5, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickCount={10} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Earnings" stroke="#2c7da0" />
      </LineChart>
    </div>
  );
}

export default ReLineChart;
