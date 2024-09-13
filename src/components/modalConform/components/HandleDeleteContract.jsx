import { showNotification } from "../../../features/common/headerSlice";
import { getRooms } from "../../../features/common/roomsSlice";
import { FetchDeleteContractRoom } from "../../../features/roomManagement/components/service/FetchDeleteContractRoom";

export const HandleDeleteContract = (closeModal, roomId, dispatch, idHome) => {
  const requestAPI = dispatch(FetchDeleteContractRoom(roomId));
  requestAPI
    .then((response) => {
      if (response.payload.isSuccess) {
        dispatch(
          showNotification({
            message: "Xoá hợp đồng thuê thành công",
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
          message: "Xoá hợp đồng thuê thất bại",
          status: 0,
        })
      );
    });

  return null;
};
