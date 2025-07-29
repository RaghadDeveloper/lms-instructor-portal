import { AiOutlineUser } from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { PiArticleNyTimesLight } from "react-icons/pi";
import { RiLineChartLine } from "react-icons/ri";
import { TbDashboard, TbMessages } from "react-icons/tb";

export const navigationData = [
  {
    icon: TbDashboard,
    title: "Dashboard",
    link: "/",
  },
  {
    icon: FaBookOpen,
    title: "Courses",
    link: "/courses",
  },
  {
    icon: RiLineChartLine,
    title: "Course Statisics",
    link: "/course-statistics",
  },
  {
    icon: AiOutlineUser,
    title: "Profile",
    link: "/profile",
  },
  {
    icon: TbMessages,
    title: "Messages",
    link: "/messages",
  },
  {
    icon: MdNotificationsActive,
    title: "Notifications",
    link: "/notifications",
  },
  {
    icon: PiArticleNyTimesLight,
    title: "Posts",
    link: "/posts",
  },
];
