import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputDate from "./../../../components/inputDrawRIght/InputDate";
import InputText from './../../../components/inputDrawRIght/InputText';
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import { GetPaymentsById, UpdatePayment } from './../Slice/ContractSlice';
import InputPrice from "../../../components/inputDrawRIght/InputPrice";
import { formatPrice } from "../../../components/Input/Format";
import { showNotification } from "../../common/headerSlice";

function CreateBill({ closeRightDrawer, extraObject }) {
    console.log("🚀 ~ CreateBill ~ extraObject:", extraObject)
    const dispatch = useDispatch();
    const [paymentData, setPaymentData] = useState({});
    console.log("🚀 ~ CreateBill ~ paymentData:", paymentData)
    const [rentalDays, setRentalDays] = useState(0);
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [Totalamount, setTotalamount] = useState(0)
    const [amountRemaining, setAmountRemaining] = useState(0)


    const convertISOToDateInput = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // Output as YYYY-MM-DD for <input type="date">
    };

    const [dates, setDates] = useState(paymentData?.RentalStartDate || ""); // Initialize with default value
    const [totalOJ, setTotalOJ] = useState({
        Phuphi: 0,
        Giamtru: 0,
        amount: 0
    });
    const updateFormValue = ({ updateType, value }) => {
        setDates(value); // Update state directly if you're handling a single date
    };

    useEffect(() => {
        // Ensure the dates state is updated if paymentData changes
        if (paymentData?.RentalStartDate) {
            setDates(paymentData.RentalStartDate);
        }
    }, [paymentData.RentalStartDate]);

    const totalServices = paymentData?.PaymentDetail?.Services?.reduce((total, service) => {
        return (total + (service.ServicePrice * service.OldNumber) * (rentalDays / daysInMonth));
    }, 0)

    useEffect(() => {
        async function fetchData() {
            if (!extraObject) {
                console.error("extraObject.id is undefined.");
                return;
            }
            try {
                const action = await dispatch(GetPaymentsById(extraObject.id));
                if (GetPaymentsById.fulfilled.match(action)) {
                    const data = action.payload.response.response;
                    setPaymentData(data);

                    // Calculate rental days
                    if (dates) {
                        const calculateRentalDays = (dateString) => {
                            const startDate = new Date(dateString);
                            const year = startDate.getFullYear();
                            const month = startDate.getMonth();
                            const lastDayOfMonth = new Date(year, month + 1, 0);
                            return Math.ceil((lastDayOfMonth - startDate) / (1000 * 60 * 60 * 24)) + 1;
                        };
                        setRentalDays(calculateRentalDays(dates));

                        // Calculate total days in the month
                        const calculateDaysInMonth = (dateString) => {
                            const date = new Date(dateString);
                            const year = date.getFullYear();
                            const month = date.getMonth();
                            return new Date(year, month + 1, 0).getDate();
                        };
                        setDaysInMonth(calculateDaysInMonth(dates));
                    }

                } else {
                    console.error("Failed to fetch payment data:", action.payload);
                }
            } catch (error) {
                console.error("Error fetching payment data:", error);
            }

        }
        fetchData();
    }, [dispatch, extraObject, dates]);
    useEffect(() => {
        setTotalamount((paymentData.RentalPriceFull / daysInMonth) * rentalDays)
    }, [dates, paymentData])


    const totalOJs = ({ updateType, value }) => {
        setTotalOJ({ ...totalOJ, [updateType]: value, });
    };
    const [totalTotal, setTotalTotal] = useState(0)
    useEffect(() => {
        setTotalTotal(Totalamount + totalServices + paymentData.AdditionalDepositAmount + totalOJ.Phuphi - totalOJ.Giamtru)
    }, [totalOJ.Phuphi, totalOJ.Giamtru, Totalamount, paymentData])

    const servicesDetail = paymentData?.PaymentDetail?.Services?.map((service) => ({
        serviceId: service.ServiceId,
        price: service.Price
    }));
    const updatePayment = () => {
        const paymentId = extraObject.id;

        if (rentalDays === 1) {
            dispatch(
                showNotification({
                    message: "tiền nhà tháng đầu được tính vào tháng sau !",
                    status: 1,
                }))

        }
        else {// id payment

            // Create servicesDetail array before initializing paymentData

            const paymentData = {
                amount: Math.round((totalOJ.amount / 1000) * 1000), // Rounded total payment amount
                surcharge: totalOJ.Phuphi,
                discount: totalOJ.Giamtru,
                rentalStartDate: dates + "T06:34:19.521Z", // Replace with dynamic date if needed
                rentDays: rentalDays,
                amountRemaining: Math.round(((totalTotal - totalOJ.amount) / 1000) * 1000), // Rounded amount remaining
                totalServiceAmount: Math.round((totalServices / 1000) * 1000),
                servicesDetail: servicesDetail,
                totalAmount: Math.round((totalTotal / 1000) * 1000),

                totalAmountRoom: Math.round((Totalamount / 1000) * 1000)
            };

            dispatch(UpdatePayment({ PaymentId: paymentId, data: paymentData }))
                .unwrap()
                .then((response) => {
                    dispatch(
                        openModal({
                            title: "Mã QR",
                            bodyType: MODAL_BODY_TYPES.CREATE_BILL,
                            extraObject: {
                                data: response.response
                            },
                        })
                    );
                })
                .catch((error) => {
                    console.error("Failed to update payment:", error);
                });
        }
    };


    useEffect(() => {
        setAmountRemaining(totalTotal - totalOJ.amount)
    }, [totalTotal, totalOJ.amount])



    return (
        <div className="w-full h-screen">
            <div className="flex">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
                            Mã phòng: <strong className="ml-1 text-lg py-5 font-medium text-rose-800 dark:text-white"> P.{extraObject.room}</strong>
                        </p>
                        <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
                            Tiền Nhà: <strong className="text-lg py-5 font-medium text-rose-800 dark:text-white">{formatPrice(paymentData.RentalPriceFull)}đ</strong>

                        </p>
                    </div>
                    <div>
                        <InputDate
                            updateType="date"
                            lable="Ngày bắt đầu cho thuê"
                            disabled={paymentData.AmountPaid ? true : false}

                            defaultValue={convertISOToDateInput(dates)} // Ensure this is YYYY-MM-DD format
                            updateFormValue={updateFormValue}
                        />
                    </div>
                    <div className="mt-2">
                        <InputText
                            format="fullName"
                            updateType="fullName"
                            lable="Số ngày tính tiền nhà"
                            disabled='true'
                            defaultValue={rentalDays}
                        />
                    </div>
                    <div className="mt-2">
                        <InputText
                            format="fullName"
                            updateType="fullName"
                            lable="Cách tính"
                            disabled='true'
                            defaultValue={`(Tiền nhà/ ${daysInMonth}) * Số ngày tính tiền nhà `}
                        />
                    </div>
                    <div className="mt-2">
                        <InputText
                            format="fullName"
                            updateType="fullName"
                            lable="Thành tiền"
                            disabled='true'
                            defaultValue={formatPrice(Math.round(Totalamount / 1000) * 1000) + "đ"}

                        />
                    </div>
                    <div className="divider mt-1"></div>
                    <p className="text-lg font-medium text-rose-800 dark:text-white">
                        Chi tiết dịch vụ
                    </p>
                    <table className="table w-full mt-2 bg-white shadow">
                        <thead>
                            <tr>
                                <th>Chi phí</th>
                                <th>Đơn giá</th>
                                <th>Cách tính</th>
                                <th>Thành tiền  </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData?.PaymentDetail?.Services?.map((service, index) => (
                                <tr key={index}>
                                    <td>{service.ServiceName}</td>
                                    <td>{formatPrice(service.ServicePrice)} đ</td>
                                    <td>{formatPrice(service.OldNumber)} {service.DVT}</td>
                                    <td>{formatPrice(Math.round((service.ServicePrice * service.OldNumber * rentalDays / daysInMonth) / 1000) * 1000)} đ</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="font-bold">Tổng({rentalDays} ngày)</td>
                                <td></td>
                                <td></td>
                                <td className="font-bold">
                                    {formatPrice(Math.round(totalServices / 1000) * 1000)}đ
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="divider mt-3"></div>
                    <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
                        Thanh toán
                    </p>
                    <div>
                        <InputText
                            format="fullName"
                            updateType="fullName"
                            lable="Cọc bổ sung"
                            disabled='true'
                            defaultValue={formatPrice(paymentData.AdditionalDepositAmount) + "đ"}
                        />
                    </div>
                    <div className="mt-2">
                        <InputPrice
                            unit="đ"
                            format="fullName"
                            updateType="Phuphi"
                            lable="Phụ phí"
                            updateFormValue={totalOJs}
                            defaultValue={paymentData?.PaymentDetail?.Surcharge}


                        />
                    </div>
                    <div className="mt-2">
                        <InputPrice
                            unit="đ"
                            format="fullName"
                            updateType="Giamtru"
                            lable="Giảm trừ"
                            updateFormValue={totalOJs}
                            defaultValue={paymentData?.PaymentDetail?.Discount}



                        />
                    </div>
                    <div className="mt-2">
                        <InputText
                            format="fullName"
                            updateType="fullName"
                            lable="Tổng phải thu"
                            disabled='true'
                            defaultValue={formatPrice(Math.round(totalTotal / 1000) * 1000) + 'đ  '}
                        />
                    </div>
                    <div className="mt-2">
                        <InputPrice
                            unit="đ"
                            format="fullName"
                            updateType="amount"
                            lable="Số tiền thanh toán"
                            disabled={paymentData.AmountPaid ? true : false}

                            updateFormValue={totalOJs}

                        />
                    </div>
                    <div className="mt-2">
                        <InputText
                            format="fullName"
                            updateType="fullName"
                            lable="Còn lại"
                            disabled='true'
                            defaultValue={formatPrice(Math.round(amountRemaining / 1000) * 1000) + "đ"}
                        />
                    </div>
                    <div className="flex justify-end mt-3">
                        <button
                            onClick={() => closeRightDrawer()}
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                        >
                            Huỷ
                        </button>
                        <button
                            onClick={updatePayment}
                            type="button"
                            className={`text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4 ${paymentData.AmountPaid ? "hidden" : ""}`}
                        >
                            Tạo hóa đơn
                        </button>
                        <button
                            onClick={updatePayment}
                            type="button"
                            className={`text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4 ${paymentData.AmountPaid ? "" : "hidden"}`}
                        >
                            Cập nhật hóa đơn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBill;
