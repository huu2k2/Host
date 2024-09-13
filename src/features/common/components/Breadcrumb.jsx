import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import React from "react";
import { Link } from "react-router-dom";

const ListRouters = [
  {
    dashboard: "dashboard",
    leads: "Quản lý nhân viên",
    homemanagement: "Quản lý nhà",
    roommanagement: "Quản lý phòng",
    transactions: "Transactions",
    charts: "Analytics",
    integration: "Integrations",
    calendar: "Calendar",
    createHome: "Thêm nhà mới",
    // ... tiếp tục
  },
];

const HandleRSLink = (pg) => {
  const router = ListRouters[0]; // Chỉ có một object trong danh sách
  for (const key in router) {
    if (router[key].toLowerCase() === pg.toLowerCase()) {
      return key; // Trả về khóa tương ứng với tên trang
    }
  }
  return ""; // Nếu không tìm thấy, trả về ''
};

export const Breadcrumb = ({ pg1, pg2, pg3 }) => {
  const componentBreadcrumb = (content, link) => (
    <>
      <svg
        className="rtl:rotate-180 w-5 h-3 text-gray-400 mx-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 9 4-4-4-4"
        />
      </svg>
      <Link
        to={`/app/${link === "homemanagement" ? "homemanagement/default" : link
          }`}
        className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
      >
        {content}
      </Link>
    </>
  );

  const link1 = HandleRSLink(pg1);
  const link2 = pg2 ? `${link1}/${HandleRSLink(pg2)}` : "";
  const link3 = pg3 ? `${link2}/${HandleRSLink(pg3)}` : `${link2}`;
 

  return (
    <nav className="flex ml-[70px]" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to={`/app/dashboard`}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <HomeIcon
              className="w-5 h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            />
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            {componentBreadcrumb(pg1, link1)}
            {pg2 && componentBreadcrumb(pg2, link2)}
            {pg3 && componentBreadcrumb(pg3, link3)}
          </div>
        </li>
      </ol>
    </nav>
  );
};
