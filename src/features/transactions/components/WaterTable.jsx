import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";

import CheckBox from '../../createHome/components/input/CheckBox';
import { MODAL_BODY_TYPES, RIGHT_DRAWER_TYPES } from "../../../utils/globalConstantUtil";
import { useDispatch } from "react-redux";
import { openRightDrawer } from "../../common/rightDrawerSlice";
import { RECENT_TRANSACTIONS } from "../../../utils/dummyData";
import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../../components/Input/SearchBar"
import { InputSearch } from "../../homeManagement/components/input/inputSearch";
import { openModal } from "../../common/modalSlice";




function WaterTable() {
    const dispatch = useDispatch();
    const [trans, setTrans] = useState(RECENT_TRANSACTIONS)
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

    const openModleWater = (

    ) => {
        dispatch(
            openModal({
                title: "",
                bodyType: MODAL_BODY_TYPES.WATER,
                // extraObject: {
                //     contractId: contractId,
                //     depositId: depositId,
                // },
            })
        );
    };

    return (

        <div className=" w-full  ">
        
            <TitleCard topMargin="mt-2 pb-[300px]" >
                <table className="table w-full bg-white shadow rounded border">
                    <thead>
                        <tr>
                            <th className="font-normal">STT</th>
                            <th className="font-normal">Mã Phòng</th>
                            <th className="font-normal">Số nước cũ </th>
                            <th className="font-normal">Số  nước mới</th>
                            <th className="font-normal">Đã tiêu thụ</th>
                            <th className="font-normal">Đơn giá nước</th>
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
                                                    openModleWater(
                                                    )
                                                }>
                                                Ghi số mới
                                            </button>
                                       
                            </td>

                        </tr>


                    </tbody>
                </table>
            </TitleCard>
        </div>

    );
}

export default WaterTable;