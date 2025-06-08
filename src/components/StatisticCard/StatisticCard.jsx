import "./StatisticCard.css";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";

function StatisticCard({ data }) {
  return (
    <div className="statistic-card col">
      {data.icon && <data.icon className="icon" />}
      <div className="info">
        <h3>{data.title}</h3>
        <span>{data.value}</span>
        <div className="d-flex gap-1 align-items-center">
          <span
            className={data.percentage > 0 ? "text-success" : "text-danger"}
          >
            {data.percentage >= 0 ? <GoArrowUpRight /> : <GoArrowDownRight />}
            {Math.abs(data.percentage)}%
          </span>
          <span className="text-muted">vs last month</span>
        </div>
      </div>
    </div>
  );
}

export default StatisticCard;
