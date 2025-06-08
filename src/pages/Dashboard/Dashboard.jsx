import StatisticsCards from "../../components/StatisticsCards/StatisticsCards";
import Welcome from "../../components/Welcome/Welcome";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div>
      <Welcome name={"Raghad Muhammad"} />
      <StatisticsCards />
    </div>
  );
}

export default Dashboard;
