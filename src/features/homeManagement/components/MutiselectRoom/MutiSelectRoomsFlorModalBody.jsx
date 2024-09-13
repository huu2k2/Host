import { useState } from "react";

import { ListRoomSelected } from "./ListRoomSelected";
import SelectBox from "../../../../components/Input/SelectBox";
import { FetchUpdateFlor } from "../service/FetchUpdateFlor";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../../common/headerSlice";
import { getRooms } from "../../../common/roomsSlice";

function MutiSelectRoomsFlorModalBody({ extraObject, closeModal }) {
  const { selectedHome } = useSelector((state) => state.rooms);
  const listRoomsChecked = extraObject.selectedOptions;
  const dispatch = useDispatch();
  const [flor, setflor] = useState(0);

  const updateFormValue = ({ updateType, value }) => {
    setflor(value);
  };

  const handleUpdateFlor = () => {
 
    const data = {
      floor: parseInt(flor),
      rooms: listRoomsChecked.map((item) => item.roomId),
    };

    const requestAPI = dispatch(FetchUpdateFlor(data));

    try {
      requestAPI.then((response) => {
        dispatch(
          showNotification({ message: "Cập nhật tầng thành công", status: 1 })
        );
        dispatch(getRooms({ id: selectedHome.id, search: "" }));
        closeModal();
      });
    } catch (error) {
      dispatch(
        showNotification({ message: "Cập nhật tầng thất bại", status: 0 })
      );
    }
  };

  return (
    <>
      <SelectBox
        options={[
          { name: "Tầng G", id: 1 },
          { name: "Tầng 1", id: 1 },
          { name: "Tầng 2", id: 2 },
          { name: "Tầng 3", id: 3 },
          { name: "Tầng 4", id: 4 },
          { name: "Tầng 5", id: 5 },
          { name: "Tầng 6", id: 6 },
          { name: "Tầng 7", id: 7 },
          { name: "Tầng 8", id: 8 },
          { name: "Tầng 9", id: 9 },
        ]}
        placeholder="Chọn tầng"
        containerStyle="mt-1 w-full"
        defaultValue={0}
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

export default MutiSelectRoomsFlorModalBody;
