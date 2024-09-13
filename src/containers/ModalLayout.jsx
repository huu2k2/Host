import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import ConfirmationResetPasswordModalBody from "../features/common/components/ConfirmationResetPasswordModalBody";
import ConfirmationDeleteUserModalBody from "../features/common/components/ConfirmationDeleteUserModalBody";
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon";
import ConfirmationDeleteModalBody from "../features/common/components/ConfirmationDeleteModalBody";
import MutiSelectRoomsModalBody from "../features/homeManagement/components/MutiselectRoom/MutiSelectRoomsModalBody";
import MutiSelectRoomsFlorModalBody from "../features/homeManagement/components/MutiselectRoom/MutiSelectRoomsFlorModalBody";
import MutiSelectRoomsTypeModalBody from "../features/homeManagement/components/MutiselectRoom/MutiSelectRoomsTypeModalBody";
import MutiSelectRoomsPriceModalBody from "../features/homeManagement/components/MutiselectRoom/MutiSelectRoomsPriceModalBody";
import MutiSelectRoomsImgModalBody from "../features/homeManagement/components/MutiselectRoom/MutiSelectRoomsImgModalBody";
import ConfirmationDeleteModalBodyCustom from "../components/modalConform/ConfirmationDeleteModalBodyCustom";
import ConfirmationDeleteCode from "../components/modalConform/ConfirmationDelete_code";
import SignModalBody from "../features/common/components/SignModalBody";
import MoveRoomModalBody from "../features/roomManagement/components/MoveRoomModalBody";
import ShowImageRoomModalBody from "../features/homeManagement/components/ShowImageRoomModalBody";
import ModleCreatBill from "../features/transactions/components/ModleCreatBill";
import ModalElectric from "../features/transactions/components/ModalElectric";
import ModalWater from "../features/transactions/components/ModalWater";
import QRcomponent from "../features/roomManagement/components/QRcomponet";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const close = (e) => {
    dispatch(closeModal(e));
  };
  const Header = (bodyType) => {
    if (bodyType === "CONFIRMATION") {
      return (
        <>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <div className="flex right-5 mr-6 item-center">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <ExclamationTriangleIcon className="h-5 inline-block w-5 red text-rose-600" />
            </div>
            <h3 className="ml-5 text-lg font-medium text-center">{title}</h3>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-center">{title}</h3>
            <button className="right-2 top-2" onClick={() => close()}>
              ✕
            </button>
          </div>
        </>
      );
    }
  };
  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        {/* <div className={`modal-box ${size === 'lg' ? 'max-w-6xl' : 'max-w-4xl'}`}> */}
        <div className={`modal-box w-[520] h-48}`}>
          <Header bodyType={bodyType} />

          <div className="divider"></div>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.CONFIRMATION_RESET_PASSWORD]: (
                <ConfirmationResetPasswordModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_DELETE_USER]: (
                <ConfirmationDeleteUserModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_DELETE_CUSTOM]: (
                <ConfirmationDeleteModalBodyCustom
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_DELETE]: (
                <ConfirmationDeleteModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.MUTI_SELECT_ROOMS]: (
                <MutiSelectRoomsModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.MUTI_SELECT_ROOMS_FLOR]: (
                <MutiSelectRoomsFlorModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.SIGNATURE]: (
                <SignModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.MUTI_SELECT_ROOMS_TYPE]: (
                <MutiSelectRoomsTypeModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.MUTI_SELECT_ROOMS_PRICE]: (
                <MutiSelectRoomsPriceModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.MUTI_SELECT_ROOMS_IMG]: (
                <MutiSelectRoomsImgModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.SHOW_IMG_ROOM]: (
                <ShowImageRoomModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),

              [MODAL_BODY_TYPES.CONFIRMATION_DELETE_CODE]: (
                <ConfirmationDeleteCode
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.MOVE_ROOM]: (
                <MoveRoomModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />

              ),
              [MODAL_BODY_TYPES.CREATE_BILL]: (
                <ModleCreatBill
                  extraObject={extraObject}
                  closeModal={close}
                />

              ),
              [MODAL_BODY_TYPES.CREATE_BILL]: (
                <ModleCreatBill
                  extraObject={extraObject}
                  closeModal={close}
                />

              ),
              [MODAL_BODY_TYPES.ELCTRIC]: (
                <ModalElectric
                  extraObject={extraObject}
                  closeModal={close}
                />

              ),
              [MODAL_BODY_TYPES.WATER]: (
                <ModalWater
                  extraObject={extraObject}
                  closeModal={close}
                />

              ),
              [MODAL_BODY_TYPES.QR_COMPONEMT]: (
                <QRcomponent
                  extraObject={extraObject}
                  closeModal={close}
                />

              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}
export default ModalLayout;
