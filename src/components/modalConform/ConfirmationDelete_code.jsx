import { useDispatch } from "react-redux";
import { showNotification } from "../../features/common/headerSlice";
import { useState } from "react";
import { HandleDeleteRoom } from "./components/HandleDeleteRoom";
import { HandleDeleteDeposit } from "./components/HandleDeleteDeposit";
import { HandleDeleteContract } from "./components/HandleDeleteContract";

function ConfirmationDelete_code({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const [inputPassword, setinputPassword] = useState("");
  const { message, id, index, password, roomId, idHome } = extraObject;

  const HandleDelete = () => {
    console.log(password?.toString() === inputPassword.split('.')[1]?.toString())
    if (password?.toString() === inputPassword.split('.')[1]?.toString()) {
      // kiểm tra mã nhập
      switch (extraObject.type) {
        case "DELETE_ROOM":
          HandleDeleteRoom(closeModal, id, dispatch, index);
          break;

        case "DELETE_DEPOSIT":
          HandleDeleteDeposit(closeModal, roomId, dispatch, idHome);
          break;

        case "DELETE_CONTRACT":
          HandleDeleteContract(closeModal, roomId, dispatch, idHome);
          break;

        default:
          return null;
      }
    } else {
      dispatch(
        showNotification({
          message: "Sai mã xác nhận",
          status: 0,
        })
      );
      setinputPassword("");
    }
  };

  return (
    <>
      <p className=" text-sm mt-8 text-left leading-5 font-normal">{message}</p>
      <p>
        Mã xác nhận: <strong>P.{password}</strong>{" "}
      </p>

      <div className="border border-rose-600 mt-4 w-full rounded-lg">
        <input
          value={inputPassword}
          type="text"
          placeholder="Nhập mã phòng xác nhận"
          className="input input-error w-full"
          onChange={(e) => setinputPassword(e.target.value)}
        />
      </div>

      <div className="modal-action mt-12">
        <button
          className=" text-rose-700 bg-rose-50 border border-rose-50 focus:outline-none hover:bg-rose-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 "
          onClick={() => closeModal()}
        >
          Huỷ
        </button>

        <button
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
          onClick={HandleDelete}
        >
          Xoá
        </button>
      </div>
    </>
  );
}

export default ConfirmationDelete_code;
