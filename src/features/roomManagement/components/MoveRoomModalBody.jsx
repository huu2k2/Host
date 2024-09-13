import { useDispatch, useSelector } from "react-redux";
import SelectBox from "../../../components/Input/SelectBox";
import { useEffect, useState } from "react";
import { FetchMoveDeposit } from "./service/FetchMoveDeposit";
import { showNotification } from "../../common/headerSlice";
import { getRooms } from "../../common/roomsSlice";
import { FetchMoveContract } from "./service/FetchMoveContract";

function MoveRoomModalBody({ extraObject, closeModal }) {
  const { rooms } = useSelector((state) => state.rooms);

  const { selectedHome } = useSelector((state) => state.rooms);

  const [options, setoptions] = useState([]);

  const [value, setvalue] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const roomsFil = rooms.filter((item) => item.status === "0")
      .map((item) => ({
        name: "P." + item.roomCode,
        id: item.id,
      }));

    setoptions(roomsFil);


    if (rooms.length > 0) {
      setvalue(rooms[0].id);
    }

  }, [rooms]);

  const updateFormValue = ({ updateType, value }) => {

    setvalue(value);
  };

  const handleMoveRoom = () => {
    let roomIdValue;
    if (typeof value === 'string') {
      roomIdValue = value;
    } else {
      // Set roomIdValue to options[0].id assuming options is an array of objects
      roomIdValue = options.length > 0 ? options[0].id : null;
    }
    const data = { ...extraObject, roomId: roomIdValue };


    if (extraObject.contractId) {
      const resultAPIContract = dispatch(FetchMoveContract(data));

      try {
        resultAPIContract.then((response) => {
          if (response.payload) {
            if (response.payload.isSuccess) {
              dispatch(
                showNotification({
                  message: response.payload.message,
                  status: 1,
                })
              );

              dispatch(getRooms({ id: selectedHome.id, search: "" }));
              closeModal();
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
              showNotification({ message: "Chuyển cọc thất bại", status: 0 })
            );
          }
        });
        return;
      } catch (error) { }
    } else if (extraObject.depositId) {
      const resultAPIDeposit = dispatch(FetchMoveDeposit(data));

      try {
        resultAPIDeposit.then((response) => {
          if (response.payload) {
            if (response.payload.isSuccess) {
              dispatch(
                showNotification({
                  message: response.payload.message,
                  status: 1,
                })
              );

              dispatch(getRooms({ id: selectedHome.id, search: "" }));
              closeModal();
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
              showNotification({ message: "Chuyển cọc thất bại", status: 0 })
            );
          }
        });
      } catch (error) { }
    }
  };

  return (
    <div className="h-32 relative">
      <p className="text-sm leading-5 mt-5 font-medium">
        {extraObject.description}
      </p>

      <SelectBox
        options={options}
        placeholder="Chọn phòng"
        containerStyle="mt-1 w-full"
        defaultValue={options[0]?.id}
        updateFormValue={updateFormValue}
      />

      <div className="flex justify-end absolute bottom-0 right-0">
        <button
          onClick={() => closeModal()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Huỷ
        </button>

        <button
          onClick={handleMoveRoom}
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Chuyển
        </button>
      </div>
    </div>
  );
}

export default MoveRoomModalBody;
