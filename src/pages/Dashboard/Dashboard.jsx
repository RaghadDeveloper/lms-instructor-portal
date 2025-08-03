import { useDispatch, useSelector } from "react-redux";
import StatisticsCards from "../../components/StatisticsCards/StatisticsCards";
import Welcome from "../../components/Welcome/Welcome";
import "./Dashboard.css";
import { useEffect } from "react";
import { coursesStatistics } from "../../features/statistics/statisticsThunk";

function Dashboard() {
  const dispatch = useDispatch();
  const { courseStatistics } = useSelector((state) => state.statistics);

  useEffect(() => {
    console.log(courseStatistics);
  }, [courseStatistics]);
  useEffect(() => {
    dispatch(coursesStatistics());
  }, [dispatch]);

  return (
    <div>
      <Welcome />
      <StatisticsCards />
    </div>
  );
}

export default Dashboard;
