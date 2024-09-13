import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import TitleCard from "../../components/Cards/TitleCard";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { FaMotorcycle } from "react-icons/fa6";
import DepositProgress from "./components/DepositProgress";
import Btnprocess from "../../components/button/Btnprocess";
import { InputSearch } from "../homeManagement/components/input/inputSearch";
import Checkbox from "../roomManagement/components/input/checkBox";
import { RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";
import { openRightDrawer } from "../common/rightDrawerSlice";
import IconPickHome from "../../assets/pickHome.png";
import FirstMonthRent from "./components/FirstMonthRent";
import { updateSelectedHome } from "../common/roomsSlice";
import { getHomes } from "../roomManagement/homesSlice";
import { getRooms } from "../common/roomsSlice";

import ElectricTable from "./components/ElectricTable";
import ServiceTable from "./components/ServiceTable";
import SendBill from "./components/Sendbill";
import { getDeposit } from "./Slice/DepositSlice";
import { getContract } from "./Slice/ContractSlice";
export const UserContext = createContext();


function Transactions() {
  const dispatch = useDispatch();
  const { selectedHome } = useSelector((state) => state.rooms);
  const { homes } = useSelector((state) => state.homes);
  const { rooms } = useSelector((state) => state.rooms);
  const { contracts } = useSelector((state) => {
    return state.contracts;
  });

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);


  const openRightDrawerCreateHome = () => {
    dispatch(
      openRightDrawer({
        header: `Danh sách nhà trọ của bạn (${homes.length})`,
        content:
          "Bạn có thể điều chỉnh thông tin trực tiếp hoặc xuất file từng nhà trọ.",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_HOME,
      })
    );
  };

  const [indexChart, setIndexChart] = useState(1);
  // useEffect(() => {
  //     // Truy xuất phạm vi ngày đã lưu từ localStorage
  //     const savedDateRange = localStorage.getItem('dashboardDateRange');
  //     if (savedDateRange) {
  //         const parsedDateRange = JSON.parse(savedDateRange);
  //         // dispatch(updateDashboardPeriodAction(parsedDateRange));
  //     }
  // }, [dispatch]);

  const [num, setNum] = useState(1);
  // LẤY PHÒNG DANH SÁCH PHÒNG DẦU TIÊN, KHI VÒ
  useEffect(() => {
    if (!selectedHome.id) {
      dispatch(getHomes()).then((res) => {
        dispatch(getRooms({ id: res.payload[0]?.id, search: "" }));

        dispatch(
          updateSelectedHome({
            name: res.payload[0].name,
            quantity: res.payload[0].quantityRoom,
            id: res.payload[0].id,
            address: res.payload[0].address,
          })
        );
      });
    }
  }, []);
  useEffect(() => {
    if (selectedHome) {
      dispatch(getDeposit(selectedHome.id));
    }
  }, [dispatch, selectedHome]);
  useEffect(() => {
    if (selectedHome) {
      dispatch(getContract(selectedHome.id));
    }
  }, [dispatch, selectedHome]);
  return (
    <>
      <UserContext.Provider value={{
        month: month,
        setMonth: setMonth,
        year: year,
        setYear: setYear

      }}>
        <div className="flex justify-between items-center ">
          <div className="flex items-start gap-2">
            <p className="pb-4 pt-0 text-gray-900 text-2xl font-bold dark:text-white">
              {selectedHome
                ? `${selectedHome.name} (${selectedHome.quantity})`
                : "Chọn nhà"}
            </p>
            <div
              className="w-9 h-9 bg-white rounded-md shadow border border-gray-300 flex justify-center items-center"
              onClick={openRightDrawerCreateHome}
            >
              <img src={IconPickHome} alt="icon chọn nhà" className="" />
            </div>
          </div>
        </div>
        <Btnprocess setNum={setNum} num={num} />

        {num === 1 && <DepositProgress />}

        {num === 2 && <FirstMonthRent homeid={selectedHome.id} />}

        {num === 3 && <ElectricTable />}

        {num === 4 && <ServiceTable />}

        {num === 5 && <SendBill />}
      </UserContext.Provider>
    </>
  );
}

export default Transactions;
