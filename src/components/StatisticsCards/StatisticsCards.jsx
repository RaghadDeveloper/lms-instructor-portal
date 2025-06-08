import StatisticCard from "../StatisticCard/StatisticCard";
import "./StatisticsCards.css";
import { StatisticsCardsData } from "./../../data/StatisticsCardsData.jsx";
import ReLineChart from "../ReLineChart/ReLineChart.jsx";

function StatisticsCards() {
  return (
    <>
      <div className="statistics-cards">
        {StatisticsCardsData.map((statisticCardData) => (
          <StatisticCard
            key={statisticCardData.title}
            data={statisticCardData}
          />
        ))}
        <ReLineChart />
      </div>
    </>
  );
}

export default StatisticsCards;
