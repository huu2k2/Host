import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import CheckBox from './../../createHome/components/input/CheckBox';
import { RIGHT_DRAWER_TYPES } from "../../../utils/globalConstantUtil";
import { useDispatch, useSelector } from "react-redux";
import { openRightDrawer } from "../../common/rightDrawerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { InputSearch } from "../../homeManagement/components/input/inputSearch";
import { RiEBikeLine } from "react-icons/ri";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { formatPrice } from "../../../components/Input/Format";
import Checkbox from "../../roomManagement/components/input/checkBox";
import { useState } from "react";

function FirstMonthRent({ homeid }) {
    const dispatch = useDispatch();
    const { contracts } = useSelector((state) => state.contracts);

    const openRightDrawerDeposit = (index) => {
        dispatch(
            openRightDrawer({
                header: "Lịch sử đặt cọc",
                bodyType: RIGHT_DRAWER_TYPES.DEPOSIT_HISTORY,
                index: index,
            })
        );
    };

    const openRightDrawerRent = (data) => {
        dispatch(
            openRightDrawer({
                header: "Lịch sử - Thanh toán",
                bodyType: RIGHT_DRAWER_TYPES.RENT_HISTORY,
                extraObject: {
                    data,
                },
            })
        );
    };

    const openCreatBillModle = (id) => {
        dispatch(
            openRightDrawer({
                header: `Tạo hóa đơn tiền nhà`,
                content: "Vui lòng điền thông tin dưới để tạo hóa đơn",
                bodyType: RIGHT_DRAWER_TYPES.CREATE_BILL,
                extraObject: id,
            })
        );
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (value) => {
        setSearchTerm(value);
        // Perform search or any other action with the search term
    };

    const getDummyStatus = (StatusPayment) => {
        switch (StatusPayment) {
            case "PAID":
                return (
                    <div className="badge border-none bg-green-100 text-green-800 text-xs font-medium rounded">
                        Thanh toán đủ
                    </div>
                );
            case "Pending":
                return (
                    <div className="badge border-none bg-red-100 text-yellow-800 text-xs font-medium rounded">
                        Đang nợ tiền
                    </div>
                );
            default:
                return <></>;
        }
    };

    const getQuantityStatusPayment = (StatusPayment) => {
        // Safely access nested properties
        return contracts?.response?.response?.filter(
            (item) =>
                item?.Payments?.[0]?.StatusPayment === StatusPayment &&
                item?.status !== "0"
        ).length;
    };

    const getQuantityStatusDiposit = (StatusPayment) => {
        return contracts?.response?.response?.filter(
            (item) => item?.status === StatusPayment
        ).length;
    };

    const [isStatus, setIsStatus] = useState([]); // Lưu trạng thái đã chọn

    // Hàm xử lý khi chọn checkbox để thay đổi trạng thái lọc
    const handleFormValueUpdate = ({ updateType, value }) => {
        setIsStatus((prevStatus) =>
            value ? [...prevStatus, updateType] : prevStatus.filter((type) => type !== updateType)
        );
    };

    // Lọc hợp đồng dựa trên trạng thái thanh toán
    const filteredContracts = contracts?.response?.response?.filter(
        (contract) => {
            const fillterStaytus =
                isStatus.length === 0 || isStatus.includes(contract?.Payments?.[0]?.StatusPayment);
            const roomCodeMatches =
                searchTerm.length === 0 || contract?.RoomCode === Number(searchTerm);
            return fillterStaytus && roomCodeMatches;
        }
    );
    filteredContracts.sort((a, b) => a.RoomCode - b.RoomCode);
    return (
        <div className="w-full">
            {/* Filters and Search */}
            <div className="flex my-3 justify-between">
                <div className="flex my-3">
                    <Checkbox
                        content="Thanh toán đủ"
                        quantity={getQuantityStatusPayment("PAID")}
                        updateType="PAID"
                        updateFormValue={handleFormValueUpdate}
                    />
                    <Checkbox
                        content="Đang nợ tiền"
                        quantity={getQuantityStatusPayment("Pending")}
                        updateType="Pending"
                        updateFormValue={handleFormValueUpdate}
                    />
                </div>
                <div>
                    <InputSearch updateType="search" callback={handleSearch} />
                </div>
            </div>

            {/* Contracts Table */}
            <TitleCard topMargin="mt-[-1.5rem] pb-[300px]">
                <div className="w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="font-normal">STT</th>
                                <th className="font-normal">Mã Phòng</th>
                                <th className="font-normal">Người đại diện</th>
                                <th className="font-normal">Tiền nhà</th>
                                <th className="font-normal">Tổng phí dịch vụ</th>
                                <th className="font-normal">Cọc Bổ Sung</th>
                                <th className="font-normal">Phụ phí</th>
                                <th className="font-normal">Giảm trừ</th>
                                <th className="font-normal">Tổng phải thu</th>
                                <th className="font-normal">Đã nhận</th>
                                <th className="font-normal">Còn lại</th>
                                <th className="font-normal">Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="overflow-x-auto">
                            {contracts?.response?.response?.length > 0 ? (
                                filteredContracts.map((contract, index) => (
                                    <tr key={contract?.id}>
                                        <td>{index + 1}</td>
                                        <td>P.{contract?.RoomCode}</td>

                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="font-medium dark:text-white">
                                                    <div className="font-bold">{contract?.Fullname}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-3">
                                                        <div className="flex">
                                                            <UsersIcon className="w-5" /> {contract?.NumberOfPeople}
                                                        </div>
                                                        <div className="flex">
                                                            <RiEBikeLine size={20} /> {contract?.NumberOfVehicle}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {contract?.Payments?.[0]?.Details?.[0]?.TotalAmountRoom
                                                ? `${formatPrice(
                                                    (contract.Payments[0].Details[0].TotalAmountRoom * 1000) / 1000
                                                )}đ`
                                                : "0đ"}
                                        </td>

                                        <td>
                                            {contract?.Payments?.[0]?.Details?.[0]?.SumService
                                                ? `${formatPrice(contract.Payments[0].Details[0].SumService)}đ`
                                                : "0đ"}
                                        </td>

                                        <td>{formatPrice(contract?.DepositAmount)}đ</td>
                                        <td>
                                            {contract?.Payments?.[0]?.Details?.[0]?.Surcharge
                                                ? `${formatPrice(contract.Payments[0].Details[0].Surcharge)}đ`
                                                : "0đ"}
                                        </td>
                                        <td>
                                            {contract?.Payments?.[0]?.Details?.[0]?.Discount
                                                ? `${formatPrice(contract.Payments[0].Details[0].Discount)}đ`
                                                : "0đ"}
                                        </td>
                                        <td>
                                            {contract?.Payments?.[0]?.Amount
                                                ? `${formatPrice(contract.Payments[0].Amount)}đ`
                                                : "0đ"}
                                        </td>
                                        <td>
                                            {contract?.Payments?.[0]?.AmountPaid
                                                ? `${formatPrice(contract.Payments[0].AmountPaid)}đ`
                                                : "0đ"}
                                        </td>
                                        <td>
                                            {contract?.Payments?.[0]?.AmountRemaining
                                                ? `${formatPrice(contract.Payments[0].AmountRemaining)}đ`
                                                : "0đ"}
                                        </td>
                                        <td>{getDummyStatus(contract?.Payments?.[0]?.StatusPayment)}</td>

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
                                                        <button onClick={() => openRightDrawerDeposit(index)}>
                                                            Lịch sử đặt cọc
                                                        </button>
                                                        <button onClick={() => openRightDrawerRent(contract)}>
                                                            Lịch sử thanh toán
                                                        </button>
                                                        <button onClick={() => openCreatBillModle({
                                                            id: contract.Payments[0].IDPayment,
                                                            room: contract?.RoomCode,
                                                            moni: contract.Payments[0].Details[0].TotalAmountRoom
                                                        })}>
                                                            Tạo hóa đơn tiền nhà
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13" className="text-center">
                                        No contracts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </div>
    );
}
export default FirstMonthRent;
