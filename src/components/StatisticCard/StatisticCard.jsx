import AnimatedNumber from "../AnimatedNumber/AnimatedNumber";
import "./StatisticCard.css";
import { GoArrowDownRight, GoArrowUpRight, GoBook } from "react-icons/go";
import { motion } from "framer-motion";

function StatisticCard({ data }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="statistic-card"
    >
      {data.icon && <data.icon className="icon" />}
      <div className="info">
        <h3>{data.title}</h3>
        <AnimatedNumber target={data.total_value || 0} />
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
            <AnimatedNumber target={Math.abs(data.change_percentage) || 0} />%
          </span>

          <span>vs last month</span>
        </div>
      </div>
    </motion.div>
  );
}

export default StatisticCard;
