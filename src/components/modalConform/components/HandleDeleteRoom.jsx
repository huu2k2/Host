
import { showNotification } from "../../../features/common/headerSlice";
import { FetchDeleteRoom } from "../../../features/homeManagement/components/service/FetchDeleteRoom";
import {
  deleteRoom_roomsSlice,
} from "../../../features/common/roomsSlice";

export const HandleDeleteRoom = (closeModal, id, dispatch, index) => {
  const removeRoom = () => {
    dispatch(deleteRoom_roomsSlice(index));
  };

  const requestAPI = dispatch(FetchDeleteRoom(id));
  requestAPI
    .then((response) => {
      dispatch(
        showNotification({
          message: "Xoá thành công",
          status: 1,
        })
      );

      removeRoom();
      closeModal();
    })
    .catch((error) => {
      dispatch(
        showNotification({
          message: "Xoá thất bại",
          status: 0,
        })
      );
    });

  return null;
};
