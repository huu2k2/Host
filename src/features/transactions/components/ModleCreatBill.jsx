import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateDepositPayment, CreateDepositPaymentFirst } from '../Slice/DepositSlice';

function ModleCreatBill({ extraObject, closeModal }) {
    console.log("🚀 ~ ModleCreatBill ~ extraObject:", extraObject)

    const dispatch = useDispatch();
    const [paymentData, setPaymentData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        // Fetch payment data
        const fetchPaymentData = async () => {
            let resultAction;

            if (extraObject.amount) {
                resultAction = await dispatch(CreateDepositPayment({
                    depositID: extraObject.id,
                    amount: extraObject.amount
                }));
            } else {
                resultAction = await dispatch(CreateDepositPaymentFirst({
                    depositID: extraObject?.id
                }));
            }

            if (resultAction.type.endsWith('/fulfilled')) {
                setPaymentData(resultAction.payload);
            } else {
                console.error("Failed to create deposit payment:", resultAction.error);
            }
        };
        fetchPaymentData();
    }, [dispatch, extraObject.id, extraObject.amount]);

    useEffect(() => {
        // Countdown timer logic
        if (extraObject.amount || extraObject.data) return; // If `amount` is present, do not start the timer.

        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            // Action when the timer reaches 0
            alert("Mã QR ko còn hiệu lực!");
            closeModal();
        }
    }, [timeLeft, closeModal, extraObject.amount]);


    if (!paymentData) {
        return <div>Loading...</div>;
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className=" bg-white  rounded-md">
            {!extraObject?.amount &&
                <div className={`flex justify-end w-full ${extraObject.data ? "hidden" : ""}`}>
                    <p className='text-rose-600 '>Thời gian còn lại: {formatTime(timeLeft)}</p>
                </div>

            }
            <p className='font-bold text-[20px] text-gray-600'><strong className='font-normal '>Chủ tài khoản: </strong>{paymentData?.response?.data?.AccountName || extraObject.data.AccountName}</p>
            <p className='font-bold text-[20px] text-gray-600'><strong className='font-normal '>Số tài khoản: </strong>{paymentData?.response?.data?.AccountNumber || extraObject.data.AccountNumber}</p>
            <div className="flex justify-center mb-4">
                <img src={paymentData?.response?.data?.QRCode || extraObject.data.QRCode} alt="" />
            </div>
            <div className="mb-4 flex flex-col justify-start text-gray-600">
                <div className="text-right text-gray-600 mb- flex justify-between items-center">
                    <p className='font-bold text-[25px] text-[#2D6BB8]'><strong className='font-normal text-black'>Số tiền: </strong>{(paymentData?.response?.data?.Amount || extraObject.data.Amount).toLocaleString('vi-VN')} VND</p>
                </div>
                <div className='flex gap-1'>
                    <p>Nội dung: </p>
                    <strong>{paymentData?.response?.data?.Description || extraObject.data.Description + ""}</strong>
                </div>
                <p className='text-rose-600 '>Vui lòng không sửa nội dung!</p>
            </div>
            <div className="flex justify-end gap-3 ">
                <button className="bg-rose-600 text-white p-2 rounded-md hover:bg-rose-500">
                    Gửi hóa đơn
                </button>
            </div>
        </div>
    );
}

export default ModleCreatBill;
