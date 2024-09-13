import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";

import CheckBox from "./../../createHome/components/input/CheckBox";
import { RIGHT_DRAWER_TYPES } from "../../../utils/globalConstantUtil";
import { useDispatch } from "react-redux";
import { openRightDrawer } from "../../common/rightDrawerSlice";
import { RECENT_TRANSACTIONS } from "../../../utils/dummyData";
import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
// import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
// import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
// import SearchBar from "../../../components/Input/SearchBar"
import { InputSearch } from "../../homeManagement/components/input/inputSearch";
import { RiEBikeLine } from "react-icons/ri";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import FillterMonth from "./FillterMonth";
// const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

//     const [filterParam, setFilterParam] = useState("")
//     const [searchText, setSearchText] = useState("")
//     const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

//     const showFiltersAndApply = (params) => {
//         applyFilter(params)
//         setFilterParam(params)
//     }

//     const removeAppliedFilter = () => {
//         removeFilter()
//         setFilterParam("")
//         setSearchText("")
//     }

//     useEffect(() => {
//         if (searchText == "") {
//             removeAppliedFilter()
//         } else {
//             applySearch(searchText)
//         }
//     }, [searchText])

//     return (
//         <div className="inline-block float-right">
//             <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
//             {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}
//             <div className="dropdown dropdown-bottom dropdown-end">
//                 <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2" />Filter</label>
//                 <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
//                     {
//                         locationFilters.map((l, k) => {
//                             return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
//                         })
//                     }
//                     <div className="divider mt-0 mb-0"></div>
//                     <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>

//                 </ul>
//             </div>
//         </div>
//     )
// }

function SendBill() {
  const dispatch = useDispatch();
  const [trans, setTrans] = useState(RECENT_TRANSACTIONS);
  // const removeFilter = () => {
  //     setTrans(RECENT_TRANSACTIONS)
  // }

  // const applyFilter = (params) => {
  //     let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
  //     setTrans(filteredTransactions)
  // }

  // Search according to name
  // const applySearch = (value) => {
  //     let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
  //     setTrans(filteredTransactions)
  // }

  // const openRightDrawerDeposit = (

  // ) => {
  //     dispatch(
  //         openRightDrawer({
  //             header: "Lịch sử đặt cọc",
  //             bodyType: RIGHT_DRAWER_TYPES.DEPOSIT_HISTORY,

  //         })
  //     );
  // };
  const openRightDrawerRent = () => {
    dispatch(
      openRightDrawer({
        header: "Lịch sử - Thanh toán",
        bodyType: RIGHT_DRAWER_TYPES.RENT_HISTORY,
      })
    );
  };
  const openCreatBillModle = () => {
    dispatch(
      openRightDrawer({
        header: `Tạo hóa đơn tiền nhà`,
        content: "Vui lòng điền thông tin dưới để tạo hóa đơn",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_BILL,
      })
    );
  };
  return (
    <div className=" w-full  ">
      <FillterMonth />

      <div className="flex my-3  justify-between">
        <div className="flex my-3">
          <CheckBox
            label={"Thu đủ"}
            // key={key}
            // updateType={key}
            // updateFormValue={updateFormUtilities}
            // defaultValue={value.checked}
          />
          <CheckBox
            label={"Công nợ"}
            // key={key}
            // updateType={key}
            // updateFormValue={updateFormUtilities}
            // defaultValue={value.checked}
          />
        </div>
        <div>
          <InputSearch updateType="search" />
        </div>
      </div>
      <TitleCard topMargin="mt-2 pb-[300px]">
        <table className="table w-full bg-white shadow rounded border">
          <thead>
            <tr>
              <th className="font-normal">STT</th>
              <th className="font-normal">Mã Phòng</th>
              <th className="font-normal">Người đại diện</th>
              <th className="font-normal">Tiền nhà</th>
              <th className="font-normal">Tổng phí dịch vụ</th>
              <th className="font-normal">Công nợ</th>
              <th className="font-normal">Tổng phải thu</th>
              <th className="font-normal">Đã nhận</th>
              <th className="font-normal">Còn lại</th>
              <th className="font-normal">Trạng thái</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="">#</div>
                  </div>
                </div>
              </td>
              <td>P.101</td>
              <td>
                {" "}
                <div className="flex items-center gap-4">
                  <div className="font-medium dark:text-white">
                    <div>
                      <div className="">cuong</div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div className=" flex gap-3 ">
                        <div className=" flex ">
                          <UsersIcon className="w-5 flex " />
                          {"3"}
                        </div>
                        <div className=" flex ">
                          <RiEBikeLine size={20} />
                          {"2"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>100VND</td>
              <td>100VND</td>
              <td>100VND</td>
              <td>100VND</td>
              <td>100VND</td>
              <td>100VND</td>
              <td>Thu đủ</td>

              <td>
                <div className="dropdown dropdown-left">
                  <div tabIndex={0} role="button" className="m-1 w-5">
                    <EllipsisVerticalIcon />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <button onClick={() => openCreatBillModle()}>
                        Lập hóa đơn
                      </button>
                      <button onClick={() => openRightDrawerRent()}>
                        Lịch sử - Thanh toán
                      </button>
                      <button
                      // onClick={() =>
                      //     openRightDrawerRent(
                      //     )
                      // }
                      >
                        Các tháng trước
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </TitleCard>
    </div>
  );
}

export default SendBill;
