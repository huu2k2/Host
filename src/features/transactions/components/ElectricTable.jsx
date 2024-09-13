import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";

import CheckBox from './../../createHome/components/input/CheckBox';
import { MODAL_BODY_TYPES, RIGHT_DRAWER_TYPES } from "../../../utils/globalConstantUtil";
import { useDispatch } from "react-redux";
import { openRightDrawer } from "../../common/rightDrawerSlice";
import { RECENT_TRANSACTIONS } from "../../../utils/dummyData";
import { createContext, useContext, useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../../components/Input/SearchBar"
import { InputSearch } from "../../homeManagement/components/input/inputSearch";
import { openModal } from "../../common/modalSlice";
import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";
import { MdWaterDamage } from "react-icons/md";
import WaterTable from "./WaterTable";
import { IoWater } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import FillterMonth from "./FillterMonth";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]



    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])

    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2" />Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>

                </ul>
            </div>
        </div>
    )
}



function ElectricTable() {
    const dispatch = useDispatch();
    const [trans, setTrans] = useState(RECENT_TRANSACTIONS)
    const [indexChart, setIndexChart] = useState(1);


    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
        setTrans(filteredTransactions)
    }

    const openModleElectric = (

    ) => {
        dispatch(
            openModal({
                title: "",
                bodyType: MODAL_BODY_TYPES.ELCTRIC,
                // extraObject: {
                //     contractId: contractId,
                //     depositId: depositId,
                // },
            })
        );
    };



    return (

        <div className=" w-full  ">
            <FillterMonth />
            <div className="flex justify-between my-3 ">
                <div className="flex my-3">
                    <CheckBox
                        label={"Đã ghi"}

                    />
                    <CheckBox
                        label={"Chưa ghi"}

                    />

                </div>



                <div className="flex gap-2">


                    <div className="mr-12">
                        <div className="dropdown dropdown-bottom dropdown-end ml-2">

                            <div className="relative h-10">


                                <button onClick={() => setIndexChart(1)}
                                    tabIndex={0}
                                    className={` absolute   w-10 h-10 duration-300 rounded-[19px] bg-blue-500 border-none text-white hover:bg-blue-500 flex items-center justify-center ${indexChart === 1 ? "z-0" : "z-10"}`}
                                >

                                    < IoWater style={{ width: '70%', height: '70%' }} />


                                </button>
                                <button onClick={() => setIndexChart(2)}
                                    tabIndex={0}
                                    className={`absolute duration-300 w-10 h-10 rounded-[19px] bg-rose-600 border-none text-white hover:bg-rose-500 flex items-center justify-center ${indexChart === 2 ? "z-0" : "z-10"}`}
                                >


                                    < MdElectricBolt style={{ width: '70%', height: '70%' }} />
                                </button>
                            </div>

                        </div>


                    </div>

                    <div><InputSearch updateType="search" /></div>

                </div>
            </div>


            {indexChart === 1 &&
                <TitleCard topMargin="mt-2 pb-[300px]" >
                    <table className="table w-full bg-white shadow rounded border">
                        <thead>
                            <tr>
                                <th className="font-normal">STT</th>
                                <th className="font-normal">Mã Phòng</th>
                                <th className="font-normal">Số điện cũ </th>
                                <th className="font-normal">Số điện mới</th>
                                <th className="font-normal">Đã tiêu thụ</th>
                                <th className="font-normal">Đơn giá điện</th>
                                <th className="font-normal">Thành tiền</th>

                                <th className="font-normal">Trạng thái</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>
                                    <div className="flex items-center space-x-3">

                                        <div>
                                            <div className="">#</div>
                                        </div>
                                    </div>
                                </td>
                                <td>P.101</td>

                                <td>10</td>
                                <td>30</td>
                                <td>20</td>
                                <td>20.000VND</td>
                                <td>400.000VND</td>

                                <td>Đã ghi</td>
                                <td>

                                    <button className="bg-[#0F2C67] rounded-[15px] w-[130px] h-[30px] text-white"
                                        onClick={() =>
                                            openModleElectric(
                                            )
                                        }>
                                        Ghi số mới
                                    </button>

                                </td>

                            </tr>


                        </tbody>
                    </table>
                </TitleCard>}

            {indexChart === 2 &&

                <WaterTable />

            }
        </div>

    );
}

export default ElectricTable;