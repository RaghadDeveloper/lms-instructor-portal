import StatisticCard from "../StatisticCard/StatisticCard";
import "./StatisticsCards.css";
import { StatisticsCardsData } from "./../../data/StatisticsCardsData.jsx";

function StatisticsCards() {
  return (
    <div className="Statistics-Cards row m-0 gap-3">
      {StatisticsCardsData.map((statisticCardData) => (
        <StatisticCard
          key={statisticCardData.title}
          // Icon={statisticCardData.icon}
          // title={statisticCardData.title}
          // value={statisticCardData.value}
          data={statisticCardData}
        />
      ))}
    </div>
  );
}

export default StatisticsCards;
