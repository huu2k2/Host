import { useState } from "react";

import { ListRoomSelected } from "./ListRoomSelected";
import SelectBox from "../../../../components/Input/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../../common/headerSlice";
import { FetchUpdateType } from "../service/FetchUpdateType";
import { getRooms } from "../../../common/roomsSlice";

function MutiSelectRoomsTypeModalBody({ extraObject, closeModal }) {
  const { selectedHome } = useSelector((state) => state.rooms);
  const listRoomsChecked = extraObject.selectedOptions;
  const dispatch = useDispatch();
  const [type, settype] = useState("Studio");

  const updateFormValue = ({ updateType, value }) => {
    settype(value);
  };

  const handleUpdateFlor = () => {
    const data = {
      category: type,
      rooms: listRoomsChecked.map((item) => item.roomId),
    };

    const requestAPI = dispatch(FetchUpdateType(data));

    try {
      requestAPI.then((response) => {
        dispatch(
          showNotification({ message: "Cập nhật loại thành công", status: 1 })
        );
        dispatch(getRooms({ id: selectedHome.id, search: "" }));

        closeModal();
      });
    } catch (error) {
      dispatch(
        showNotification({ message: "Cập nhật loại thất bại", status: 0 })
      );
    }
  };

  return (
    <>
      <SelectBox
        options={[
          { name: "Studio", value: "Studio" },
          { name: "Duplex", value: "Duplex" },
          { name: "1PN", value: "1PN" },
          { name: "2PN", value: "2PN" },
          { name: "3PN", value: "3PN" },
          { name: "Mặt bằng", value: "Mặt bằng" },

        ]}
        placeholder="Chọn tầng"
        containerStyle="mt-1 w-full"
        defaultValue={type}
        updateFormValue={updateFormValue}
      />

      <p className="text-sm leading-5 mt-5 font-medium">
        {extraObject.description}
      </p>

      <ListRoomSelected listRoomsChecked={listRoomsChecked} />

      <div className="flex justify-end">
        <button
          onClick={() => closeModal()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Huỷ
        </button>

        <button
          onClick={handleUpdateFlor}
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Thêm
        </button>
      </div>
    </>
  );
}

export default MutiSelectRoomsTypeModalBody;
