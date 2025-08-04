import { useDispatch } from "react-redux";
import StatisticsCards from "../../components/StatisticsCards/StatisticsCards";
import Welcome from "../../components/Welcome/Welcome";
import "./Dashboard.css";
import { useEffect } from "react";
import {
  coursesStatistics,
  earningsStatistics,
  followsStatistics,
  lessonsStatistics,
} from "../../features/statistics/statisticsThunk";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(coursesStatistics(2025));
    dispatch(lessonsStatistics(2025));
    dispatch(followsStatistics(2025));
    dispatch(earningsStatistics(2025));
  }, [dispatch]);

  return (
    <div>
      <Welcome />
      <StatisticsCards />
    </div>
  );
}

export default Dashboard;
