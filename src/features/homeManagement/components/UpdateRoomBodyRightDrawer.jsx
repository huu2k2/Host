import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/inputDrawRIght/InputText";
import InputSelect from "../../../components/inputDrawRIght/InputSelect";
import InputPrice from "../../../components/inputDrawRIght/InputPrice";
import { FetchUpdateRoomQuickly } from "./service/FetchUpdateRoomQuickly";
import { getRooms } from "../../common/roomsSlice";
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES, TYPES_DELETE } from "../../../utils/globalConstantUtil";

function UpdateRoomBodyRightDrawer({ closeRightDrawer, extraObject }) {
  const dispatch = useDispatch();
  const { selectedHome } = useSelector((state) => state.rooms);

  const INIT_INF_ROOM = {
    id: extraObject.id,
    roomCode: extraObject.roomCode,
    floor: extraObject.floor,
    rentPrice: extraObject.price,
    category: extraObject.category,
    index: extraObject.index
  };

  const [infoRoom, setInfoRoom] = useState(INIT_INF_ROOM);
  const updateFormValue = ({ updateType, value }) => {
    setInfoRoom({ ...infoRoom, [updateType]: value });
  };
  const handleUpdateRoomQuickly = () => {
    const roomCodeNumber = Number(infoRoom.roomCode);
    // Check if roomCodeNumber is a finite number
    if (!Number.isFinite(roomCodeNumber)) {
      dispatch(
        showNotification({
          message: "Mã phòng phải là số hợp lệ!",
          status: 0,
        })
      );
      return; // Exit the function if validation fails
    }
    const requestAPI = dispatch(FetchUpdateRoomQuickly(infoRoom));
    requestAPI
      .then((response) => {
        if (response.payload.isSuccess) {
          dispatch(
            showNotification({
              message: response.payload.message,
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
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
        dispatch(
          showNotification({
            message: "Cập nhật thông tin thất bại",
            status: 0,
          })
        );
      });
  };

  const openModalConformDeleteRoom = (roomId, password, index) => {

    closeRightDrawer()

    dispatch(
      openModal({
        title: "Xoá phòng",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_DELETE_CODE,
        extraObject: {
          type: TYPES_DELETE.DELETE_ROOM,
          message: `Bạn có chắc chắn muốn xoá phòng này?Tất cả dữ liệu sẽ bị xóa vĩnh viễn khỏi máy chủ. Hành động này không thể được hoàn tác.Vui lòng nhập mã phòng để xác nhận`,
          id: roomId,
          index: index,
          password: password,
        },
      })
    );
  };
  return (
    <div className="mt-4 h-screen">
      <InputText
        lable="Mã phòng"
        updateType="roomCode"
        updateFormValue={updateFormValue}
        defaultValue={infoRoom.roomCode}
      />

      <InputSelect
        updateFormValue={updateFormValue}
        updateType="category"
        options={[
          { label: "Studio", value: "Studio" },
          { label: "Duplex", value: "Duplex" },
          { label: "1PN", value: "1PN" },
          { label: "2PN", value: "2PN" },
          { label: "3PN", value: "3PN" },
          { label: "Mặt bằng", value: "Mặt bằng" },
        ]}
        lable="Loại phòng"
        defaultValue={[
          {
            value: infoRoom.category,
            label: infoRoom.category,
          },
        ]}
      />

      <InputSelect
        updateFormValue={updateFormValue}
        updateType="floor"
        options={[
          { value: 0, label: "Tầng G" },
          { value: 1, label: "Tầng 1" },
          { value: 2, label: "Tầng 2" },
          { value: 3, label: "Tầng 3" },
          { value: 4, label: "Tầng 4" },
          { value: 5, label: "Tầng 5" },
          { value: 6, label: "Tầng 6" },
          { value: 7, label: "Tầng 7" },
          { value: 8, label: "Tầng 8" },
          { value: 9, label: "Tầng 9" },
        ]}
        lable="Loại tầng"
        defaultValue={[
          {
            value: infoRoom.floor,
            label: ` Tầng ${infoRoom.floor ? infoRoom.floor : "G"}`,
          },
        ]}
      />

      <InputPrice
        lable="Giá"
        updateType="rentPrice"
        updateFormValue={updateFormValue}
        defaultValue={infoRoom.rentPrice}
        unit="đ"
      />
      {/* <InputFile lable="Hình ảnh" /> */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => closeRightDrawer()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Huỷ
        </button>
        <button
          onClick={() =>
            openModalConformDeleteRoom(
              infoRoom.id,
              infoRoom.roomCode,
              infoRoom.index,
            )
          }
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Xoá phòng
        </button>
        <button
          onClick={handleUpdateRoomQuickly}
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
}

export default UpdateRoomBodyRightDrawer;
