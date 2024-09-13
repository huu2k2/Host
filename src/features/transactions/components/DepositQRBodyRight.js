import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/inputDrawRIght/InputText";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import { openModal } from "../../common/modalSlice";
import { formatPrice } from "../../../components/Input/Format";
import InputPrice from "../../../components/inputDrawRIght/InputPrice";

function DepositQRBodyRight({ closeRightDrawer, extraObject }) {
    console.log("🚀 ~ DepositQRBodyRight ~ extraObject:", extraObject)
    const dispatch = useDispatch();
    const [paymentAmount, setPaymentAmount] = useState(""); // State for the payment amount
    const [newRemainingDeposit, setRemainingDeposit] = useState(extraObject.totalDepositAmount); // Initial state for the remaining deposit
    const [message, setMessage] = useState("");

    // Calculate the remaining deposit amount whenever paymentAmount or other dependencies change
    useEffect(() => {
        const updatedRemainingDeposit = extraObject.totalDepositAmount - Number(paymentAmount);
        setRemainingDeposit(updatedRemainingDeposit);
    }, [paymentAmount, extraObject.totalDepositAmount]);

    const handlePaymentAmountChange = ({ value }) => {
        setPaymentAmount(value);
    };

    const openCreateBillModal = () => {
        if (Number(paymentAmount) < 5000) {
            setMessage("Số tiền phải lớn hơn 5000 VND");
            return;
        }

        dispatch(
            openModal({
                title: "Mã QR",
                bodyType: MODAL_BODY_TYPES.CREATE_BILL,
                extraObject: {
                    id: extraObject.id,
                    amount: paymentAmount, // Pass the validated payment amount
                },
            })
        );
    };

    return (
        <>
            <div className="">
                <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
                    Thông tin
                </p>

                <InputText
                    defaultValue={formatPrice(extraObject.totalDepositAmount) + " VND"}
                    type="text"
                    updateType="phoneNumber"
                    lable="Phải thu"
                    disabled={true}
                />
                <InputPrice
                    unit="đ"
                    updateType="totalDepositAmount"
                    type="number"
                    // updateType="paymentAmount"
                    lable="Số tiền thanh toán"
                    placeholder="Nhập số tiền khách muốn thanh toán"
                    updateFormValue={handlePaymentAmountChange} // Handle payment amount change
                />
                <InputText
                    defaultValue={formatPrice(newRemainingDeposit) + " đ"}
                    type="text"
                    updateType="text"
                    lable="Còn lại"
                    disabled={true}
                />

                <div className="flex justify-end">
                    <span className="text-red-500 my-auto mr-2">{message}</span>

                    <button
                        onClick={() => closeRightDrawer()}
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                    >
                        Huỷ
                    </button>
                    <button
                        onClick={openCreateBillModal}
                        type="button"
                        className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
                    >
                        Tạo mới
                    </button>
                </div>
            </div>
        </>
    );
}

export default DepositQRBodyRight;
