import { useEffect, useState } from "react";
import { formatPrice } from "../../../components/Input/Format";
import { useDispatch, useSelector } from "react-redux";
import { FetchGetListImg } from "./service/FetchGetListImg";
import { ButtonComponent } from "../../../components/button/ButtonComponent";
import { TrashIcon } from "@heroicons/react/24/solid";
import { FetchDeletePictureOfRoom } from "./service/FetchDeletePictureOfRoom";
import { showNotification } from "../../common/headerSlice";
import { getRooms } from "../../common/roomsSlice";

function ShowImageRoomModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const { selectedHome } = useSelector((state) => state.rooms);

  const [listImg, setlistImg] = useState([""]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // gọi api lấy nội thất và dịch vụ
        const resultAPI = await dispatch(FetchGetListImg(extraObject.id));
        setlistImg(resultAPI.payload.response.map((item) => item));
      } catch (error) {
        console.error(
          "Lỗi không lấy được danh sách hình ảnh theo phòng:",
          error
        );
      }
    };
    fetchData();
  }, [extraObject]);
  const handleDeletePictureOfRoom = (img, index) => {
    const data = {
      id: img,
      roomId: extraObject.id,
    };
 
    const requestAPI = dispatch(FetchDeletePictureOfRoom(data));

    requestAPI
      .then((response) => {
        if (response.payload.isSuccess) {
          dispatch(
            showNotification({
              message: response.payload.message,
              status: 1,
            })
          );
          dispatch(getRooms({ id: selectedHome.id, search: "" }));
          const templistImg = listImg.slice();
          templistImg.splice(index, 1);
          setlistImg(templistImg);
          // closeModal();
        } else {
          dispatch(
            showNotification({
              message: response.payload.message,
              status: 0,
            })
          );
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
        dispatch(
          showNotification({
            message: "Cập nhật thông tin thất bại",
            status: 0,
          })
        );
      });
  };
  return (
    <>
      <div className="text-lg font-medium text-left">
        <p className="">
          Mã phòng: <span className="font-bold">{extraObject.roomCode}</span>
        </p>
        <p className="">
          Giá:{" "}
          <span className="font-bold">{formatPrice(extraObject.price)}đ</span>
        </p>
      </div>
      <div className="mb-3">
        {listImg.map((img, index) => {
          return (
            <figure className="max-w-lg relative" key={img}>
              <img
                className="h-auto max-w-full rounded-lg mt-2"
                // src={`${process.env.REACT_APP_URL_IMAGE}/ImageRoom/${img}.jpg`}
                src={img.url}
                alt=""
              />
              <div className="absolute top-1 right-0">
                <ButtonComponent
                  icon={<TrashIcon className="w-5" />}
                  content="Xoá"
                  callBack={() => {
                    handleDeletePictureOfRoom(img.id, index);
                  }}
                />
              </div>
            </figure>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => closeModal()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Đóng
        </button>
      </div>
    </>
  );
}

export default ShowImageRoomModalBody;
