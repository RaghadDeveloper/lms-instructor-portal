import "./StatisticCard.css";
import { GoArrowDownRight, GoArrowUpRight, GoBook } from "react-icons/go";

function StatisticCard({ data }) {
  return (
    <div className="statistic-card">
      {data.icon && <data.icon className="icon" />}
      <div className="info">
        <h3>{data.title}</h3>
        <span>{data.total_value || 0}</span>
        <div className="percentage">
          <span
            className={
              data.change_percentage >= 0 ? "text-success" : "text-danger"
            }
          >
            {data.change_percentage >= 0 ? (
              <GoArrowUpRight />
            ) : (
              <GoArrowDownRight />
            )}
            {Math.abs(data.change_percentage) || 0}%
          </span>
          <span>vs last month</span>
        </div>
      </div>
    </div>
  );
}

export default StatisticCard;
