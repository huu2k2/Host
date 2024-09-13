import { useState } from "react";

import { ListRoomSelected } from "./ListRoomSelected";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../../common/headerSlice";
import InputPrice from "../../../../components/Input/InputPrice";
import { FetchUpdatePrice } from "../service/FetchUpdatePrice";
import { getRooms } from "../../../common/roomsSlice";

function MutiSelectRoomsPriceModalBody({ extraObject, closeModal }) {
  const { selectedHome } = useSelector((state) => state.rooms);
 
  const listRoomsChecked = extraObject.selectedOptions;
  const dispatch = useDispatch();
  const [price, setprice] = useState(0);


  const updateFormValue = ({ updateType, value }) => {
    setprice(value);
  };

  const handleUpdateFlor = () => {
 
    const data = {
      price: parseInt(price),
      rooms: listRoomsChecked.map((item) => item.roomId),
    };

    const requestAPI = dispatch(FetchUpdatePrice(data));

    try {
      requestAPI.then((response) => {
        dispatch(
          showNotification({ message: "Cập nhật giá thành công", status: 1 })
        );
        dispatch(getRooms({ id: selectedHome.id, search: "" }));
        closeModal();
      });
    } catch (error) {
      dispatch(
        showNotification({ message: "Cập nhật giá thất bại", status: 0 })
      );
    }
  };

  return (
    <>
      <InputPrice updateFormValue={updateFormValue} unit="đ" />
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

export default MutiSelectRoomsPriceModalBody;
