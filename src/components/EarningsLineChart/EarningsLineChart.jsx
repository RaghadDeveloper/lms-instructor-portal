import { useDispatch, useSelector } from "react-redux";
import "./EarningsLineChart.css";
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
import { motion } from "framer-motion";

const formatter = new Intl.DateTimeFormat("en", { month: "short" });

function EarningsLineChart() {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2025);
  const [maxEarning, setMaxEarning] = useState();
  const { earnings } = useSelector((state) => state.statistics);

  const earningsStatisticsData = earnings?.statistics?.map((item) => ({
    ...item,
    month: formatter.format(new Date(2025, item.month - 1)),
    Earnings: item.total_earning,
  }));

  useEffect(() => {
    dispatch(earningsStatistics(Number(year)));
  }, [dispatch, year]);

  useEffect(() => {
    setMaxEarning(
      Math.max(
        ...(earnings?.statistics?.map((item) => item.total_earning) || [0])
      )
    );
  }, [earnings]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="statistic-card card5"
    >
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
        <YAxis
          tickCount={12}
          domain={[0, Math.ceil(maxEarning) + 100]}
          allowDataOverflow={false}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Earnings"
          stroke="#2c7da0"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </motion.div>
  );
}

export default EarningsLineChart;
