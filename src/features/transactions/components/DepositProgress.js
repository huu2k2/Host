import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { RiEBikeLine } from "react-icons/ri";
import { openRightDrawer } from "../../common/rightDrawerSlice"
import { RIGHT_DRAWER_TYPES } from "../../../utils/globalConstantUtil"
import { formatPrice } from "../../../components/Input/Format"
import { InputSearch } from "../../homeManagement/components/input/inputSearch"
import CheckBox from "../../createHome/components/input/CheckBox"
import Checkbox from "../../roomManagement/components/input/checkBox";
import { useEffect, useState } from "react";
import { getDeposit } from "../Slice/DepositSlice";
// import Checkbox from "./components/input/checkBox";
function DepositProgress({ houseId }) {
    const dispatch = useDispatch();
    const { index } = useSelector((state) => state.rightDrawer);

    const { deposits } = useSelector((state) => {
        return state.deposits
    })
    const currentUser = deposits[index];
    const openRightDrawerDeposit = (k) => {
        dispatch(
            openRightDrawer({
                header: "Lịch sử đặt cọc",
                content: "Vui lòng điền thông tin nhân viên bằng form dưới đây",
                bodyType: RIGHT_DRAWER_TYPES.DEPOSIT_HISTORY,
                index: k,

            })
        );
    };

    const [searchTerm, setSearchTerm] = useState("");


    const handleSearch = (value) => {
        setSearchTerm(value);
        // Perform search or any other action with the search term
    };

    const openRightDrawerDepositQR = (id, totalDepositAmount, sumAmountPaid

    ) => {
        dispatch(
            openRightDrawer({
                header: "Tạo QR bổ sung cọc",
                bodyType: RIGHT_DRAWER_TYPES.DEPOSIT_QR,
                extraObject: {
                    id: id,
                    totalDepositAmount: totalDepositAmount - sumAmountPaid,
                    sumAmountPaid
                },

            })
        );
    };

    const getDummyStatus = (statusPayment) => {
        switch (statusPayment.status) {
            case "0":
                return (
                    <div className="badge border-none bg-red-100 text-yellow-800 text-xs font-medium rounded">
                        Hủy cọc
                    </div>
                );
        }
        switch (statusPayment.statusPayment) {
            case "1":
                return (
                    <div className="badge border-none bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        Nợ cọc
                    </div>
                );
            case "2":
                return (
                    <div className="badge border-none bg-green-100 text-green-800 text-xs font-medium rounded">
                        Đủ cọc
                    </div>
                );
            default:
                return (
                    <>-</>
                );
        }
    };
    const getQuantityStatusPayment = (statusPayment) => {

        return deposits.filter((item) => item.statusPayment === statusPayment && item.status !== "0").length;
    };
    const getQuantityStatusDiposit = (statusPayment) => {
        return deposits.filter((item) => item.status === statusPayment).length;
    };

    const [isStatus, setIsStatus] = useState([])
    const [is, setIs] = useState([])


    const handleFormValueUpdate = ({ updateType, value }) => {
        setIsStatus((prevStatus) =>
            value ? [...prevStatus, updateType] : prevStatus.filter((type) => type !== updateType)
        );
    };
    const handleFormValue = ({ updateType, value }) => {
        setIs((prevStatus) =>
            value ? [...prevStatus, updateType] : prevStatus.filter((type) => type !== updateType)
        );
    };


    // First, filter the deposits based on statusPayment and status
    const filteredDeposits = deposits.filter(deposit => {
        const statusMatches = isStatus.length === 0 || isStatus.includes(deposit.statusPayment);
        const roomCodeMatches = searchTerm.length === 0 || deposit.

            roomCode
            === Number(searchTerm);
        return statusMatches && roomCodeMatches;
    });
    const filteredByStatus = filteredDeposits.filter(deposit => {
        const statusMatches = is.length === 0 || is.includes(deposit.status);
        return statusMatches;
    });
    return (
        <>

            <div className="flex justify-between my-3 ">
                <div className="flex my-3 ">
                    <Checkbox
                        content="Đủ cọc"
                        quantity={getQuantityStatusPayment("2")}
                        updateType={"2"}
                        updateFormValue={handleFormValueUpdate}
                    />
                    <Checkbox
                        content="Nợ cọc"

                        quantity={getQuantityStatusPayment("1")}
                        updateFormValue={handleFormValueUpdate}
                        updateType={"1"}
                    />
                    <Checkbox
                        content="Hủy cọc"
                        quantity={getQuantityStatusDiposit("0")}
                        updateFormValue={handleFormValue}
                        // updateFormValue={}
                        updateType={"0"}
                    />

                </div>
                <div>
                    <InputSearch
                        updateType="search"
                        callback={handleSearch}
                    />
                </div>


            </div>
            <TitleCard topMargin="mt-[-1.5rem] pb-[300px]" >


                <div className=" w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="font-normal">STT</th>
                                <th className="font-normal">Mã Phòng</th>
                                <th className="font-normal">Người đại diện</th>
                                <th className="font-normal">Giá Thuê</th>
                                <th className="font-normal">Số Tiền cọc giữ Phòng</th>
                                <th className="font-normal">Đã nhận</th>
                                <th className="font-normal">Cọc Bổ Sung</th>
                                <th className="font-normal">Trạng Thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredByStatus?.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>


                                                <div>
                                                    <div >{k + 1}</div>
                                                </div>

                                            </td>
                                            <td>P.{l.roomCode}</td>
                                            <td> <div className="flex items-center gap-4">
                                                <div className="font-medium dark:text-white">
                                                    <div>
                                                        <div className="font-bold">{l.fullName}</div>
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        <div className=" flex gap-3 ">
                                                            <div className=" flex ">
                                                                <UsersIcon className="w-5 flex " />{l.numberOfPeople
                                                                }
                                                            </div>
                                                            <div className=" flex ">
                                                                <RiEBikeLine size={20} />{l.numberOfVehicle}
                                                            </div>


                                                        </div>

                                                    </div>
                                                </div>
                                            </div></td>
                                            <td>{formatPrice(l.rentalPrice)}đ</td>
                                            <td>{formatPrice(l.totalDepositAmount)}đ</td>

                                            <td>{formatPrice(l.sumAmountPaid)}đ</td>
                                            <td>{formatPrice((l.totalDepositAmount - l.sumAmountPaid))}đ</td>

                                            <td>{getDummyStatus({

                                                statusPayment: l.statusPayment ? l.statusPayment : 1,
                                                status: l.status
                                            })}</td>
                                            <td className="h-fit">
                                                <div className="dropdown dropdown-left">
                                                    <div tabIndex={0} role="button" className="m-1 w-5">
                                                        <EllipsisVerticalIcon />
                                                    </div>
                                                    <ul
                                                        tabIndex={0}
                                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                                    >


                                                        <li>
                                                            <button
                                                                onClick={() =>
                                                                    openRightDrawerDeposit(k)
                                                                }
                                                            >
                                                                Lịch sử đặt cọc
                                                            </button>
                                                        </li>

                                                        {l.statusPayment == "1" ?

                                                            <li li >
                                                                <button
                                                                    onClick={() =>
                                                                        openRightDrawerDepositQR(l.id, l.totalDepositAmount, l.sumAmountPaid)
                                                                    }
                                                                >
                                                                    Tạo QR bổ sung cọc
                                                                </button>
                                                            </li> : <div></div>
                                                        }

                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard >
        </>
    )
}


export default DepositProgress