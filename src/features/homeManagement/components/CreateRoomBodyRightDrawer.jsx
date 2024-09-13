import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/inputDrawRIght/InputText";
import InputSelect from "../../../components/inputDrawRIght/InputSelect";
import InputPrice from "../../../components/inputDrawRIght/InputPrice";
import { FetchUpdateRoomQuickly } from "./service/FetchUpdateRoomQuickly";
import { getRooms } from "../../common/roomsSlice";
import { FetchCreateRoom } from "./service/FetchCreateRoom";

function CreateRoomBodyRightDrawer({ closeRightDrawer, extraObject }) {
  const dispatch = useDispatch();
  const { selectedHome } = useSelector((state) => state.rooms);

  const INIT_INF_ROOM = {
    houseId: selectedHome.id,
    roomCode: null,
    floor: 1,
    rentPrice: 0,
    debtPrice: 0,
    numberOfPeople: 0,
    numberOfVehicle: 0,
    category: "Studio",
    status: "",
    serviceNote: "",
    image: null,
  };

  const [dataCreateRoom, setDataCreateRoom] = useState(INIT_INF_ROOM);

  const updateFormValue = ({ updateType, value }) => {
    setDataCreateRoom({ ...dataCreateRoom, [updateType]: value });
  };

  const handleCreateRoom = () => {
    const roomCodeNumber = Number(dataCreateRoom.roomCode);

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

    const requestAPI = dispatch(FetchCreateRoom(dataCreateRoom));
    requestAPI
      .then((response) => {
        if (response.payload.isSuccess) {
          dispatch(
            showNotification({
              message: "Thêm phòng thành công",
              status: 1,
            })
          );
          dispatch(getRooms({ id: selectedHome.id, search: "" }));
          closeRightDrawer();
        } else {
          dispatch(
            showNotification({
              message: "Thêm phòng thất bại",
              status: 0,
            })
          );
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
        dispatch(
          showNotification({
            message: "Thêm phòng thất bại",
            status: 0,
          })
        );
      });
  };

  return (
    <div className="mt-4 h-screen">
      <InputText
        lable="Mã phòng"
        updateType="roomCode"
        type="number"
        updateFormValue={updateFormValue}
        defaultValue={dataCreateRoom.roomCode}
      />

      <InputSelect
        updateFormValue={updateFormValue}
        defaultValue={{
          label: dataCreateRoom.category,
          value: dataCreateRoom.category,
        }}
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
      />

      <InputSelect
        updateFormValue={updateFormValue}
        defaultValue={{
          label: "Tầng" + dataCreateRoom.floor,
          value: dataCreateRoom.floor,
        }}
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
      />

      <InputPrice
        lable="Giá thuê"
        updateType="rentPrice"
        updateFormValue={updateFormValue}
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
          onClick={handleCreateRoom}
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Tạo phòng
        </button>
      </div>
    </div>
  );
}

export default CreateRoomBodyRightDrawer;
