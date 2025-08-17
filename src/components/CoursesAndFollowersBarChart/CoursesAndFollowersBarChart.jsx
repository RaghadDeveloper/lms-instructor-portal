import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./CoursesAndFollowersBarChart.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  coursesStatistics,
  followsStatistics,
} from "../../features/statistics/statisticsThunk";

const formatter = new Intl.DateTimeFormat("en", { month: "short" });

function CoursesAndFollowersBarChart() {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2025);
  const { courses, follows } = useSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(coursesStatistics(Number(year)));
    dispatch(followsStatistics(Number(year)));
  }, [dispatch, year]);

  const coursesStatisticsData = courses?.statistics;
  const followsStatisticsData = follows?.statistics;

  const mergedData = coursesStatisticsData?.map((item1) => {
    const match = followsStatisticsData?.find(
      (item2) => item2.month === item1.month
    );
    return {
      month: formatter.format(new Date(2025, item1.month - 1)),
      Courses: item1.total_courses,
      Followers: match ? match.total_followers : 0,
    };
  });

  return (
    <div className="statistic-card card6">
      <div className="header">
        <h4>Courses and Followers</h4>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <BarChart width={530} height={410} data={mergedData}>
        <CartesianGrid strokeDasharray="100 10" />
        <XAxis dataKey="month" />
        <YAxis tickCount={10} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Courses" fill="#2c7da0" />
        <Bar dataKey="Followers" fill="#3caddd" />
      </BarChart>
    </div>
  );
}

export default CoursesAndFollowersBarChart;
