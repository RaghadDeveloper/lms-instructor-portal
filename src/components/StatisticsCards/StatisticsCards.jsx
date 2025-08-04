import StatisticCard from "../StatisticCard/StatisticCard";
import "./StatisticsCards.css";
import ReLineChart from "../ReLineChart/ReLineChart.jsx";
import ReBarChart from "../ReBarChart/ReBarChart.jsx";
import { useSelector } from "react-redux";
import { GoBook } from "react-icons/go";
import { MdOndemandVideo } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoCashOutline } from "react-icons/io5";

function StatisticsCards() {
  const { courses, lessons, follows, earnings } = useSelector(
    (state) => state.statistics
  );
  const StatisticsCardsData = [
    { title: "Courses", icon: GoBook, ...courses },
    { title: "Videos", icon: MdOndemandVideo, ...lessons },
    { title: "Followers", icon: AiOutlineUsergroupAdd, ...follows },
    { title: "Earnings", icon: IoCashOutline, ...earnings },
  ];

  return (
    <>
      <div className="statistics-cards">
        {StatisticsCardsData.map((statisticCardData, index) => (
          <StatisticCard key={index} data={statisticCardData} />
        ))}
      </div>
      <div className="statistics-cards">
        <ReLineChart />
        <ReBarChart />
      </div>
    </>
  );
}

export default StatisticsCards;
