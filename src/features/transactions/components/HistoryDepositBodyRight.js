import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../../components/Input/Format";
import InputText from "../../../components/inputDrawRIght/InputText";
import { useEffect, useState } from "react";

import fetchHistoryDeposit from "../components/service/fetchHistoryDeposit";

function HistoryDepositBodyRight({ closeRightDrawer, extraObject }) {
    const dispatch = useDispatch();

    const { index } = useSelector((state) => state.rightDrawer);
    const { deposits } = useSelector((state) => state.deposits);
    const currentUser = deposits[index];

    const [amountPaidFirstDeposit, setAmountPaidFirstDeposit] = useState(0);
    const [amountPaidSecondDeposit, setAmountPaidSecondDeposit] = useState(0);
    const [history, setHistory] = useState([]);

    function formatTimestamp(createdAt) {
        const isoString = createdAt.replace(" ", "T");
        const date = new Date(isoString);
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${hours}:${minutes} . ${day} /${month}/${year}`;
    }

    useEffect(() => {
        async function fetchData() {
            if (!currentUser?.id) {
                console.error("currentUser.depositID is undefined or currentUser is null.");
                return;
            }

            try {
                const history = await fetchHistoryDeposit(currentUser.id);
                if (history.length > 0) {
                    history.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    setHistory(history);

                    const firstDepositEntry = history[0];
                    const firstDepositAmountPaid = firstDepositEntry.amountPaid;

                    const secondDepositAmountPaid = history.length > 1 ? history[1].amountPaid : 0;

                    setAmountPaidFirstDeposit(firstDepositAmountPaid);
                    setAmountPaidSecondDeposit(secondDepositAmountPaid);
                }
            } catch (error) {
                console.error("Error fetching amountPaid:", error);
            }
        }

        fetchData();
    }, [currentUser]);

    return (
        <div>
            <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
                Thông tin
            </p>

            <InputText
                format="fullName"
                updateType="fullName"
                defaultValue={formatPrice(currentUser.totalDepositAmount)}
                lable="Số tiền cọc giữ phòng"
                disabled={true}
            />

            {history && history.length > 0 ? (
                history.map((item, index) => {
                    const remainingAmount = index === 0
                        ? currentUser.totalDepositAmount - item.amountPaid
                        : history[index - 1].remainingAmount - item.amountPaid;

                    // Store the remaining amount for use in the next iteration
                    item.remainingAmount = remainingAmount;

                    return (
                        <div key={index}>
                            <div className="divider mt-1"></div>
                            <p className="text-lg py-5 pt-1 font-medium dark:text-white text-rose-800">
                                Đặt cọc lần {index + 1}
                            </p>

                            <InputText
                                type="text"
                                updateType="phoneNumber"
                                defaultValue={formatPrice(item.amountPaid)}
                                lable="Số tiền đã nhận"
                                disabled={true}
                            />

                            <InputText
                                type="text"
                                updateType="phoneNumber"
                                defaultValue={formatPrice(remainingAmount)}
                                lable="Còn lại"
                                disabled={true}
                            />
                            <p className="text-gray-500 text-[15px]">{formatTimestamp(item.createdAt)}</p>

                            <div className="divider mt-1"></div>
                        </div>
                    );
                })
            ) : (
                <p className="text-lg py-5 pt-1 font-medium dark:text-white text-rose-800">
                    Chưa có lịch sử giao dịch
                </p>
            )}

            <div className="flex justify-end">
                <span className="text-red-500 my-auto mr-2"></span>
                <button
                    onClick={() => closeRightDrawer()}
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                >
                    Huỷ
                </button>
            </div>
        </div>
    );
}

export default HistoryDepositBodyRight;
