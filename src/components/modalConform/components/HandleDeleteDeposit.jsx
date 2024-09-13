import { showNotification } from "../../../features/common/headerSlice";
import { getRooms } from "../../../features/common/roomsSlice";
import { FetchDeleteDepositRoom } from "../../../features/roomManagement/components/service/FetchDeleteDepositRoom";

export const HandleDeleteDeposit = (closeModal, roomId, dispatch, idHome) => {
  const requestAPI = dispatch(FetchDeleteDepositRoom(roomId));
  requestAPI
    .then((response) => {
      if (response.payload.isSuccess) {
        dispatch(
          showNotification({
            message: "Xoá cọc thành công",
            status: 1,
          })
        );

        dispatch(getRooms({ id: idHome, search: "" }));
        // XOA DU LIEUJ TRONG DAT COC
        closeModal();
      } else {
        dispatch(
          showNotification({
            message: response.payload.message,
            status: 1,
          })
        );
      }
    })
    .catch((error) => {
      dispatch(
        showNotification({
          message: "Xoá cọc thất bại",
          status: 0,
        })
      );
    });

  return null;
};
