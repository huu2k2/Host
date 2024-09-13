import { useEffect } from "react";
import { InfoCustomerDepositSection } from "./InfoCustomerDepositSection";
import { InfoRoomDepositSection } from "./InfoRoomDepositSection";
import { FeeExtraDepositSection } from "./FeeExtraDepositSection";
import { FunitureSection } from "./FunitureSection";
import { useDispatch, useSelector } from "react-redux";
import { FetchGetFuniture_service } from "../service/FetchGetFuniture_service";
import {
  resetContractRoomSlice,
  updateContractRoomSlice,
} from "./contractRoomSlice";
import { FetchContractRoom } from "../service/FetchContractRoom";
import { showNotification } from "../../../common/headerSlice";
import { FetchGetInfoContract } from "../service/FetchGetInfoContract";
import { getRooms } from "../../../common/roomsSlice";
import { FetchGetInfoDeposit } from "../service/FetchGetInfoDeposit";
import {
  MODAL_BODY_TYPES,
  TYPES_DELETE,
} from "../../../../utils/globalConstantUtil";
import { openModal } from "../../../common/modalSlice";
import { FetchUpdateContractRoom } from "../service/FetchUpdateContractRoom";
import { GetContractsAndPaymentsByHousePort } from "../../../transactions/Slice/ContractSlice";
import { CreateDepositPayment } from "../../../transactions/Slice/DepositSlice";

function ContractRoomBodyRightDrawer({ closeRightDrawer, extraObject }) {
  console.log("🚀 ~ ContractRoomBodyRightDrawer ~ extraObject:", extraObject)
  const dispatch = useDispatch();
  const { infoContractRoom } = useSelector((state) => state.contractRoomSlice);
  const { selectedHome } = useSelector((state) => state.rooms);




  const calculateDaysDifference = (rentalStartDate) => {
    const currentDate = new Date(); // Ngày hiện tại
    const startDate = new Date(rentalStartDate); // Ngày bắt đầu thuê

    // Tính khoảng cách giữa hai ngày
    const differenceInTime = currentDate.getTime() - startDate.getTime();

    // Chuyển đổi từ mili giây sang ngày
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  const daysDifference = calculateDaysDifference(infoContractRoom.rentalStartDate);
  console.log(`Số ngày kể từ ngày bắt đầu thuê: ${daysDifference}`);


  const handleContractRooom = () => {
    const data = { ...infoContractRoom };

    // Validate contract end date
    if (!infoContractRoom.contractEndDate) {
      dispatch(
        showNotification({
          message: "Vui lòng nhập ngày kết thúc hợp đồng",
          status: 0,
        })
      );
      return;
    }

    // Assign roomId from extraObject
    data.roomId = extraObject.roomId;

    try {
      const requestAPI = dispatch(FetchContractRoom(data));

      requestAPI.then((response) => {
        if (response.payload) {
          // Check if the contract creation was successful
          if (response.payload.isSuccess) {
            dispatch(
              showNotification({
                message: "Lên hợp đồng thành công",
                status: 1,
              })
            );
            dispatch(getRooms({ id: selectedHome.id, search: "" }));
            closeRightDrawer();

            // Handle additional deposit if applicable
            if (daysDifference >= 0 && data.additionalDepositAmount !== 0) {
              dispatch(
                openModal({
                  title: "Mã QR",
                  bodyType: MODAL_BODY_TYPES.CREATE_BILL,
                  extraObject: {
                    id: response.payload.id,
                  },
                })
              );
              closeRightDrawer();
            } else {
              dispatch(
                showNotification({ message: "Đặt cọc thất bại", status: 0 })
              );
            }

            // If depositId exists, fetch contracts and payments
            if (extraObject.depositId) {
              dispatch(GetContractsAndPaymentsByHousePort(response.payload.id))
                .then((res) => {
                  if (res.payload) {
                    console.log("Contracts and Payments:", res.payload);
                    // Handle the response data as needed
                  } else {
                    console.error("Failed to fetch contracts and payments");
                  }
                })
                .catch((error) => {
                  console.error("Error fetching contracts and payments:", error);
                });
            } else {
              dispatch(
                showNotification({
                  message: response.payload.message || "Lỗi không xác định",
                  status: 0,
                })
              );
            }
          } else {
            // Contract creation failed
            dispatch(
              showNotification({
                message: response.payload.message || "Lên hợp đồng thất bại",
                status: 0,
              })
            );
          }
        }
      }).catch((error) => {
        console.error("Error in requestAPI promise:", error);
        dispatch(
          showNotification({
            message: "Đã xảy ra lỗi khi xử lý hợp đồng",
            status: 0,
          })
        );
      });
    } catch (error) {
      console.error("Error in handleContractRooom:", error);
      dispatch(
        showNotification({
          message: "Đã xảy ra lỗi trong quá trình lên hợp đồng",
          status: 0,
        })
      );
    }
  };





  const handleUpdateContractRooom = () => {
    const services = infoContractRoom.services;
    const contractId = extraObject.contractId;
    const data = { ...infoContractRoom, services, contractId };

    const requestAPI = dispatch(FetchUpdateContractRoom(data));
    try {
      requestAPI.then((response) => {
        if (response.payload) {
          dispatch(
            showNotification({ message: "Lên hợp đồng thành công", status: 1 })
          );
          dispatch(getRooms({ id: selectedHome.id, search: "" }));
          closeRightDrawer();
        } else {
          dispatch(
            showNotification({ message: "Lên hợp đồng thất bại", status: 0 })
          );
        }
      });
    } catch (error) { }
  };

  const handleDeleteContract = (roomId, roomCode) => {
    closeRightDrawer();
    dispatch(
      openModal({
        title: "Xoá hợp đồng thuê",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_DELETE_CODE,
        extraObject: {
          type: TYPES_DELETE.DELETE_CONTRACT,
          message: `Bạn có chắc chắn muốn huỷ hợp đồng thuê?Tất cả dữ liệu sẽ bị xóa vĩnh viễn khỏi máy chủ. Hành động này không thể được hoàn tác.Vui lòng nhập mã phòng để xác nhận`,
          roomId: roomId,
          password: roomCode,
          idHome: selectedHome.id,
        },
      })
    );
  };

  // khởi tạo nội thất và dịch vụ cho đặt cọc môi giới
  useEffect(() => {
    const fetchData = async () => {
      try {
        // gọi api lấy nội thất và dịch vụ
        const resultAPI = await dispatch(
          FetchGetFuniture_service(extraObject.roomId)
        );
        const INIT = {
          roomId: 0,
          rentalTerm: 0,
          depositDate: "",
          depositAmount: 0,
          rentalPrice: 0,
          rentalStartDate: "",
          numberOfPeople: 0,
          numberOfVehicle: 0,
          fullName: "",
          phoneNumber: "",
          birthOfDay: "",
          identification: "",
          dateRange: "",
          issuedBy: "",
          permanentAddress: "",
          signature: "",
          contractEndDate: "",
          note: "",
          services: [
            {
              serviceId: 0,
              servicePrice: 0,
              dvt: "",
              oldNumber: 0,
            },
          ],
          furnitures: [
            {
              furnitureId: 0,
              price: 0,
              note: "",
            },
          ],
        };

        const newOBJ = {
          ...INIT,
          furnitures: resultAPI.payload.furnitureInserts,
          services: resultAPI.payload.serviceInserts.map((item) => ({
            ...item,
            oldNumber: 0,
          })),
          roomId: extraObject.roomId,
          rentalPrice: extraObject.rentPrice,
        };

        dispatch(updateContractRoomSlice(newOBJ));
      } catch (error) {
        console.error("Error fetching FetchGetFuniture_service:", error);
      }
    };

    // có hợp đồng
    if (extraObject.contractId) {
      // nếu chưa từng lên hợp đồng
      // gọi api lấy nội thất và dịch vụ
      const data = {
        roomId: extraObject.roomId,
        contractId: extraObject.contractId,
      };

      const resultAPI = dispatch(FetchGetInfoContract(data));

      resultAPI.then((result) => {
        const furnitures = result.payload.response.furnitures.map((item) => ({
          ...item,
          furnitureName: item.name,
        }));

        const services = result.payload.response.services.map((item) => ({
          ...item,
          serviceName: item.name,
        }));
        dispatch(
          updateContractRoomSlice({
            ...result.payload.response,
            furnitures,
            services,
            // contractEndDate: "",
          })
        );
      });

      resultAPI.catch();
    }

    //nếu có thông tin cọc chưa có hợp đồng
    else if (extraObject.depositId) {
      const data = {
        roomId: extraObject.roomId,
        depositId: extraObject.depositId,
      };

      const resultAPI = dispatch(FetchGetInfoDeposit(data));

      resultAPI.then((result) => {
        const furnitures = result.payload.response.furnitures.map((item) => ({
          ...item,
          furnitureName: item.name,
          checked: item.isActived,
        }));

        const services = result.payload.response.services.map((item) => ({
          ...item,
          serviceName: item.name,
        }));

        dispatch(
          showNotification({ message: "Lấy thông tin từ cọc", status: 1 })
        );

        dispatch(
          updateContractRoomSlice({
            ...infoContractRoom,
            ...result.payload.response,
            furnitures,
            services,
          })
        );
      });

      resultAPI.catch();
    }

    // chưa có hợp đồng chưa có cọc
    else {
      dispatch(resetContractRoomSlice());
      fetchData();
    }
  }, []);
  const totalReduce = infoContractRoom.furnitures
    .filter((i) => i.isActived === true)
    .reduce((next, cur) => next + cur.price, 0);

  return (
    <div className="mt-4 h-screen">
      <div className="">
        <InfoCustomerDepositSection />
        <InfoRoomDepositSection extraObject={extraObject} />
        <FeeExtraDepositSection />
        <FunitureSection />
        <div className="flex justify-between items-center text-rose-800">
          <div className="text-lg py-5 font-medium flex flex-col gap-2">
            Tổng tiền nhà
            <span className="text-sm ">(Bao gồm nội thất)</span>
          </div>
          <div className="text-lg font-bold"> {(infoContractRoom.rentalPrice + totalReduce).toLocaleString('vi-VN')} VNĐ</div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => closeRightDrawer()}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
          >
            Huỷ
          </button>

          {extraObject.contractId ? (
            <>
              <button
                onClick={() => {
                  handleDeleteContract(
                    extraObject.roomId,
                    extraObject.roomCode
                  );
                }}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Huỷ hợp đồng
              </button>
              <button
                onClick={handleUpdateContractRooom}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Cập nhật
              </button>
            </>
          ) : (
            <button
              onClick={handleContractRooom}
              type="button"
              className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
            >
              Lên hợp đồng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContractRoomBodyRightDrawer;
