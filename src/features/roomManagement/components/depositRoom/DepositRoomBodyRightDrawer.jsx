import { useEffect } from "react";
import { InfoCustomerDepositSection } from "./InfoCustomerDepositSection";
import { InfoRoomDepositSection } from "./InfoRoomDepositSection";
import { FeeExtraDepositSection } from "./FeeExtraDepositSection";
import { FunitureSection } from "./FunitureSection";
import { useDispatch, useSelector } from "react-redux";
import { FetchGetFuniture_service } from "../service/FetchGetFuniture_service";
import { FetchDepositRoom } from "../service/FetchDepositRoom";
import { showNotification } from "../../../common/headerSlice";
import { updateDepositRoomSlice } from "./depositRoomSlice";
import { FetchGetInfoDeposit } from "../service/FetchGetInfoDeposit";
import { openModal } from "../../../common/modalSlice";
import {
  MODAL_BODY_TYPES,
  TYPES_DELETE,
} from "../../../../utils/globalConstantUtil";
import { getRooms } from "../../../common/roomsSlice";
import { FetchUpdateDepositRoom } from "../service/FetchUpdateDepositRoom";
import moment from "moment";

function DepositRoomBodyRightDrawer({ closeRightDrawer, extraObject }) {
  const { infoDepositRoom } = useSelector((state) => state.depositRoomSlice);
  const { selectedHome } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  const handleDeposit = () => {
    const updatedInfoDepositRoom = {
      ...infoDepositRoom,
      roomId: extraObject.roomId,
    };
    console.log(updatedInfoDepositRoom);
    if (
      moment(updatedInfoDepositRoom.rentalStartDate).isAfter(
        moment(updatedInfoDepositRoom.depositDate)
      ) ||
      moment(updatedInfoDepositRoom.rentalStartDate).isSame(
        moment(updatedInfoDepositRoom.depositDate)
      )
    ) {
      const requestAPI = dispatch(FetchDepositRoom(updatedInfoDepositRoom));
      try {
        requestAPI.then((response) => {
          if (response.payload) {
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
        });
      } catch (error) { }
    } else {
      dispatch(
        showNotification({
          message: "Ngày bắt đầu cho thuê phải lớn hơn ngày đặt cọc!",
          status: 0,
        })
      );
    }
  };

  const handleUpdateDeposit = () => {
    const data = { ...infoDepositRoom };

    if (
      moment(data.rentalStartDate).isAfter(moment(data.depositDate)) ||
      moment(data.rentalStartDate).isSame(moment(data.depositDate))
    ) {
      const requestAPI = dispatch(FetchUpdateDepositRoom(data));
      try {
        requestAPI.then((response) => {
          if (response.payload) {
            if (response.payload.isSuccess) {
              dispatch(
                showNotification({
                  message: "Cập nhật thông tin cọc thành công",
                  status: 1,
                })
              );
              dispatch(getRooms({ id: selectedHome.id, search: "" }));
              closeRightDrawer();
            } else {
              dispatch(
                showNotification({
                  message: response.payload.message,
                  status: 0,
                })
              );
            }
          } else {
            dispatch(
              showNotification({
                message: "Cập nhật thông tin cọc thất bại",
                status: 0,
              })
            );
          }
        });
      } catch (error) { }
    } else {
      dispatch(
        showNotification({
          message: "Ngày bắt đầu cho thuê phải lớn hơn ngày đặt cọc!",
          status: 0,
        })
      );
    }
  };

  const handeDeleteDeposit = (roomId, roomCode) => {
    closeRightDrawer();
    dispatch(
      openModal({
        title: "Xoá hợp đồng cọc",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_DELETE_CODE,
        extraObject: {
          type: TYPES_DELETE.DELETE_DEPOSIT,
          message: `Bạn có chắc chắn muốn huỷ hợp đồng cọc?Tất cả dữ liệu sẽ bị xóa vĩnh viễn khỏi máy chủ. Hành động này không thể được hoàn tác.Vui lòng nhập mã phòng để xác nhận`,
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
          additionalDepositAmount: 0,
          depositPaymentDeadline: "",
          chuongTrinhUuDai: "",
          fullName: "",
          phoneNumber: "",
          birthOfDay: "",
          identification: "",
          dateRange: "",
          issuedBy: "",
          permanentAddress: "",
          signature: "",
          roomId: 0,
          rentalTerm: 0,
          depositDate: "",
          depositAmount: 0,
          rentalPrice: 0,
          rentalStartDate: "",
          numberOfPeople: 0,
          numberOfVehicle: 0,
          furnitures: [
            {
              furnitureName: "",
              furnitureId: 0,
              price: 0,
              note: "",
              status: "",
              isActived: true,
            },
          ],
          notePrivite: "",
          services: [
            {
              serviceId: 0,
              servicePrice: 0,
              dvt: "",
            },
          ],
        };
        const newOBJ = {
          ...INIT,
          furnitures: resultAPI.payload.furnitureInserts,
          services: resultAPI.payload.serviceInserts,
          roomId: extraObject.roomId,
          rentalPrice: extraObject.rentPrice,
        };

        dispatch(updateDepositRoomSlice(newOBJ));
      } catch (error) {
        console.error("Error fetching FetchGetFuniture_service:", error);
      }
    };

    if (extraObject.depositId) {
      // nếu chưa từng lên hợp đồng cọc
      // gọi api lấy nội thất và dịch vụ
      const data = {
        roomId: extraObject.roomId,
        depositId: extraObject.depositId,
      };

      const resultAPI = dispatch(FetchGetInfoDeposit(data));

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
          updateDepositRoomSlice({
            ...result.payload.response,
            furnitures,
            services,
          })
        );
      });

      resultAPI.catch();
    } else {
      fetchData();
    }
  }, []);
  const totalReduce = infoDepositRoom.furnitures
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
          <div className="text-lg font-bold">
            {" "}
            {(infoDepositRoom.rentalPrice + totalReduce).toLocaleString(
              "vi-VN"
            )}{" "}
            VNĐ
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => closeRightDrawer()}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
          >
            Huỷ
          </button>

          {extraObject.depositId ? (
            <>
              <button
                onClick={() => {
                  handeDeleteDeposit(extraObject.roomId, extraObject.roomCode);
                }}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Huỷ đặt cọc
              </button>
              <button
                onClick={handleUpdateDeposit}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Cập nhật
              </button>
            </>
          ) : (
            <button
              onClick={handleDeposit}
              type="button"
              className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
            >
              Tạo đặt cọc
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepositRoomBodyRightDrawer;
