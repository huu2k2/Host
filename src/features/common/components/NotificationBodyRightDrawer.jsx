import { FaFileContract } from "react-icons/fa6";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import { AiFillFileAdd, AiFillFileExcel, AiFillFileExclamation } from "react-icons/ai";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

const Items = [
  { item: "Hợp đồng", icon: "" },
  { item: "Thanh toán", icon: "" },
];

function NotificationBodyRightDrawer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleChange = (index) => {
    setSelectedIndex(index);
  };

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
  
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/v2/Notices/get-notifications-of-householder?pageIndex=1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Thêm header Authorization với token
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
        setNotifications(data); // Cập nhật state với dữ liệu lấy được
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
  
    fetchNotifications();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    return format(date, 'HH:mm, dd/MM/yyyy');
  }

  function getIconByStatus(status) {
    switch (status) {
      case '2':
        return <AiFillFileAdd style={{ color: "#226932", fontSize: "35px" }} />;
      case null:
        return <AiFillFileExcel style={{ color: "#E11D48", fontSize: "35px" }} />;
      case '3':
        return <AiFillFileExclamation style={{ color: "#d97706", fontSize: "35px" }} />;
      case '4':
        return <FaFileContract style={{ color: "#4B5563", fontSize: "35px" }} />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {Items.map((i, index) => (
            <li
              className="me-2 cursor-pointer"
              key={index}
              onClick={() => handleChange(index)}
            >
              <span
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg   group ${
                  selectedIndex === index
                    ? "text-blue-600 border-blue-600 "
                    : "hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                {i.item}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {selectedIndex === 0 && (
        <>
          {notifications?.noticePage?.noticeList?.map((i, index) => (
            <div
              key={index}
              className="grid mt-3 card text-[20px] bg-base-200 rounded-box p-3"
            >
              <div className="flex items-center gap-2">
                {getIconByStatus(i.status)}
                <div className="w-full">
                  <div className="flex gap-1">
                    <p className="">
                      {i.status === '1'
                        ? "Hợp đồng thuê mới"
                        : i.status === '2'
                        ? "Hợp đồng cọc mới"
                        : i.status === '3'
                        ? "Hợp đồng thuê sắp hết hạn"
                        : "Hợp đồng cọc bị hủy"}:{" "}
                    </p>
                    <p className="text-[#226932] font-bold">P.{i.roomCode}</p>
                  </div>

                  <div className="flex justify-between text-[14px] text-gray-500">
                    <span>ĐC: {i.houseName}</span>
                    <span>{formatDate(i.sentAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default NotificationBodyRightDrawer;
