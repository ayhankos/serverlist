import Link from "next/link";
import React from "react";
import {
  FaChalkboardTeacher,
  FaRegClipboard,
  FaUserPlus,
} from "react-icons/fa";
import { MdGamepad, MdOutlineDashboardCustomize } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { GrDownload } from "react-icons/gr";
import { MdOutlineDownloading } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { CgCalendarDates } from "react-icons/cg";







export default function AsideNav() {
  const pages = [
    {
      title: "Dashboard",
      icon: MdOutlineDashboardCustomize,
      href: "/",
    },
    {
      title: "Schedule",
      icon: CgCalendarDates,
      href: "/schedule",
    },
    {
      title: "Training",
      icon: FaChalkboardTeacher,
      href: "/training",
    },
    {
      title: "team",
      icon: MdGamepad,
      href: "/team",
    },
    {
      title: "Add User",
      icon: FaUserPlus,
      href: "/playerList",
    },
    {
      title: "Users",
      icon: FaUsers,
      href: "/teamList",
    },
    {
      title: "Players",
      icon: FaRegClipboard,
      href: "/leaderboard",
    },

    {
      title: "Download Page",
      icon: MdOutlineDownloading ,
      href: "/downloadPage",
    },
    {
      title: "Logout",
      icon: IoMdLogOut,
      href: "/",
    },
  ];
  return (
    <aside className="flex flex-col justify-center items-center w-[75px] dark:bg-neutral-900 border-r shrink-0 h-full">
      <nav className="flex flex-col items-center dark:bg-[#141414] bg-gray-200 rounded-2xl mb-24 ">
        <ul className="flex flex-col gap-2 py-4 items-center  ">
          {pages.map((page, index) => (
            <li
              key={index}
              className="flex flex-row items-center justify-center p-3 hover:bg-gray-500 "
            >
              <Link href={page.href}>
                <page.icon size={30} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
