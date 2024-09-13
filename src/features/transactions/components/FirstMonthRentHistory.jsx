import { useDispatch } from "react-redux";
import { formatPrice } from "../../../components/Input/Format";
import InputText from "../../../components/inputDrawRIght/InputText";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import { openModal } from "../../common/modalSlice";
import { useEffect, useState } from "react";
import fetchHistoryDeposit from "./service/fetchHistoryDeposit";
import InputPrice from "../../../components/inputDrawRIght/InputPrice";
import { createPaymentForContract, GetHistoryPaymentInvoices } from "../Slice/ContractSlice";

function FirstMonthRentHistory({ closeRightDrawer, extraObject }) {
    const dispatch = useDispatch();
    const [history, setHistory] = useState([]);
    const [monie, setMonie] = useState(0);
    const [err, setErr] = useState("");

    function formatTimestamp(createdAt) {
        const isoString = createdAt.replace(" ", "T");
        const date = new Date(isoString);
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${hours}:${minutes} . ${day}/${month}/${year}`;
    }

    // Calculate total received payments
    const totalReceived = history.reduce((acc, item) => acc + item.amountPaid, 0);

    // Calculate the amount remaining (Phải thu)

    const remainingAmount = extraObject.data.RentalPriceFull - totalReceived;
    const [conlai, setConLai] = useState(extraObject.data.RentalPriceFull - totalReceived);
    const updateFormValue = ({ updateType, value }) => {
        setMonie(value);
    };
    useEffect(() => {
        setConLai(remainingAmount - monie);
    }, [extraObject.data.RentalPriceFull, monie, totalReceived]);

    const openCreatBillModle = async () => {
        try {
            if (monie <= 5000) {
                setErr("Số tiền chuyển phải lớn hơn 5.000đ !");
                return;
            }
            if (!extraObject || !monie) {
                console.error("extraObject.data.id or monie is undefined.");
                return;
            }

            const resultAction = await dispatch(createPaymentForContract({
                'depositID': extraObject.data.Payments[0].contractID,
                'amount': monie,
                'paymentID': extraObject.data.Payments[0].IDPayment,
            }));

            if (createPaymentForContract.fulfilled.match(resultAction)) {
                const paymentPayload = resultAction.payload;
                console.log("Payment Payload:", paymentPayload.response.response.data);

                dispatch(
                    openModal({
                        title: "Mã QR",
                        bodyType: MODAL_BODY_TYPES.CREATE_BILL,
                        extraObject: {
                            data: paymentPayload.response.response.data
                        },
                    })
                );
            } else {
                console.error("Failed to create payment:", resultAction.error.message);
            }
        } catch (error) {
            console.error("Error creating payment:", error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const history = await dispatch(GetHistoryPaymentInvoices(extraObject.data.Payments[0].IDPayment));

                setHistory(history?.payload?.history
                );

            } catch (error) {
                console.error("Error fetching amountPaid:", error);
            }
        }

        fetchData();
    }, [extraObject]);

    return (
        <div>
            <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
                Thông tin
            </p>

            <InputText
                format="fullName"
                updateType="fullName"
                defaultValue={formatPrice(extraObject.data.RentalPriceFull) + "đ"}
                lable="Tổng tiền thuê tháng đầu"
                disabled={true}
            />

            <div className="divider mt-1"></div>
            {history && history.length > 0 ? (
                history.map((item, index) => {
                    const previousRemainingAmount = index === 0
                        ? extraObject.data.RentalPriceFull
                        : history[index - 1].remainingAmount;

                    const remainingAmount = previousRemainingAmount - item.amountPaid;

                    // Store the remaining amount for use in the next iteration
                    item.remainingAmount = remainingAmount;

                    return (
                        <div key={index}>
                            <p className="text-lg py-5 pt-1 font-medium dark:text-white text-rose-800">
                                Thanh toán lần {index + 1}
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

            <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
                Tạo QR bổ sung tiền thuê
            </p>

            <InputText
                type="text"
                updateType="phoneNumber"
                defaultValue={formatPrice(remainingAmount) + "đ"}
                lable="Phải thu"
                disabled={true}
            />
            <InputPrice
                unit="đ"
                type="text"
                updateType="phoneNumber"
                updateFormValue={updateFormValue}
                lable="Số tiền thanh toán"
                placeholder="Nhập số tiền khách muốn thanh toán"
            />
            <InputText
                type="text"
                updateType="phoneNumber"
                defaultValue={formatPrice(conlai)}
                lable="Còn lại"
                disabled={true}
            />

            <div className="flex justify-end">
                <span className="text-red-500 my-auto mr-2">{err}</span>

                <button
                    onClick={() => closeRightDrawer()}
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                >
                    Huỷ
                </button>
                <button
                    onClick={openCreatBillModle}
                    type="button"
                    className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
                >
                    Tạo mới
                </button>
            </div>
        </div>
    );
}

export default FirstMonthRentHistory;
