import React, { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import { useDispatch, useSelector } from "react-redux";
import {
  MODAL_BODY_TYPES,
  RIGHT_DRAWER_TYPES,
} from "../../../utils/globalConstantUtil";
import { openRightDrawer } from "../../common/rightDrawerSlice";
import { openModal } from "../../common/modalSlice";
import { formatPrice } from "../../../components/Input/Format";
import { showNotification } from "../../common/headerSlice";

const getDummyStatus = (role) => {
  switch (role) {
    case "0":
      return (
        <div className="badge border-none bg-green-100 text-green-800 text-xs font-medium rounded ">
          Phòng trống
        </div>
      );
    case "1":
      return (
        <div className="badge border-none bg-blue-200 text-gray-800 text-xs font-medium rounded ">
          Sắp trống
        </div>
      );
    case "2":
      return (
        <div className="badge border-none bg-red-100 text-yellow-800 text-xs font-medium rounded ">
          Đã đặt cọc
        </div>
      );

    case "3":
      return (
        <div className="badge border-none bg-amber-100 text-red-800 text-xs font-medium rounded ">
          Đã cho thuê
        </div>
      );

    case "4":
      return (
        <div className="badge border-none bg-purple-100 text-purple-800 text-xs font-medium rounded ">
          Hợp đồng quá hạn
        </div>
      );

    case "5":
      return (
        <div className="badge border-none bg-yellow-100 text-yellow-800 text-xs font-medium rounded ">
          Đang nợ tiền
        </div>
      );
    default:
      return (
        <div className="badge border-none bg-green-100 text-green-800 text-xs font-medium rounded ">
          Phòng trống
        </div>
      );
  }
};

function ListRooms({
  selectAll,
  setSelectAll,
  setSelectedOptions,
  selectedOptions,
  filterRooms,
}) {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850); // Điều này có thể cần điều chỉnh tùy theo kích thước màn hình điện thoại của bạn.
  const [roomsChange, setRoomsChange] = useState([]);
  useEffect(() => {
    const updatedRooms = rooms.reduce((accumulator, currentValue, currentIndex, array) => {
      // Kiểm tra nếu item hiện tại đã được xử lý trong nhóm trước đó
      const alreadyProcessed = accumulator.some(
        (item) => item.roomCode === currentValue.roomCode
      );
      if (alreadyProcessed) {
        return accumulator;
      }

      // Nhóm các item có cùng roomCode
      const sameCodeItems = array.filter(
        (item) => item.roomCode === currentValue.roomCode
      );

      // Ưu tiên item có status khác 2 và 4, nếu không tìm thấy thì chọn bất kỳ
      const validItem = sameCodeItems.find(item => item.status !== '2' && item.isOwner)
        || sameCodeItems[0]; // Nếu không có, chọn item đầu tiên

      // Thêm item hợp lệ vào accumulator
      if (validItem) {
        accumulator.push(validItem);
      }

      return accumulator;
    }, []);
    setRoomsChange(updatedRooms);
  }, [rooms]);

  // Hàm xử lý khi checkbox thay đổi trạng thái
  const handleCheckboxChange = (newObjCheck) => {
    const isChecked = selectedOptions.some(
      (item) =>
        item.roomId === newObjCheck.roomId &&
        item.roomCode === newObjCheck.roomCode
    );

    // nếu đã check rồi
    if (isChecked) {
      // hàm loại bỏ phần tử obj trong mảng
      const filteredArray = selectedOptions.filter((item) => {
        for (const key in newObjCheck) {
          if (newObjCheck[key] !== item[key]) {
            return true;
          }
        }
        return false;
      });
      setSelectedOptions(filteredArray);
    } else {
      setSelectedOptions([...selectedOptions, newObjCheck]);
    }
  };

  // hàm xử lý kiểm tra phần tủ trong mảng là obj đã tồn tại hay chưa
  const handeChecked = (obj) => {
    const exists = selectedOptions.some(
      (item) => item.roomId === obj.roomId && item.roomCode === obj.roomCode
    );
    return exists;
  };

  // Hàm xử lý khi nhấn nút "Chọn Tất Cả" hoặc "Bỏ Chọn Tất Cả"
  const handleToggleAll = () => {
    if (selectAll) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(
        rooms.map((item) => ({ roomId: item.id, roomCode: item.roomCode }))
      );
    }
  };

  const handleShowImgRoom = (id, price, index, roomCode) => {
    dispatch(
      openModal({
        title: "Hình ảnh phòng",
        bodyType: MODAL_BODY_TYPES.SHOW_IMG_ROOM,
        extraObject: {
          selectedOptions: selectedOptions,
          typeInput: "flor",
          description: "Hình ảnh phòng",
          id: id,
          roomCode: roomCode,
          price: price,
        },
      })
    );
  };

  const handleFilterRoom = () => {
    let arrTemp = [...roomsChange];

    arrTemp = arrTemp // hàm lọc tìm check nếu kh có cái nào được check thì render thẳng, nếu có check lọc thì vô hàm filter
      .filter((item) =>
        filterRooms.filter.length // kiểm tra có check lọc không
          ? filterRooms.filter.includes(item.status)
          : true
      );

    arrTemp = arrTemp // hàm lọc search nó sẽ filter những kí tự tồn tại sau khi đã được filter ở trên
      .filter((item) => {
        return item?.roomCode?.toString()?.includes(filterRooms.search);
      });

    return arrTemp;
  };

  // Effect để cập nhật trạng thái "Chọn Tất Cả" khi danh sách tùy chọn thay đổi
  useEffect(() => {
    setSelectAll(rooms?.length === selectedOptions?.length);
  }, [rooms.length, selectedOptions, setSelectAll]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const openRightDrawerUpdateRoom = (
    roomCode,
    floor,
    price,
    category,
    id,
    status,
    index
  ) => {
    if (status === "0" || status === null) {
      dispatch(
        openRightDrawer({
          header: "Chỉnh sửa nhanh thông tin phòng",
          content:
            "Vui lòng cập nhật thông tin dưới đây để cập nhật thông tin phòng mới.",
          bodyType: RIGHT_DRAWER_TYPES.UPDATE_ROOM,
          extraObject: {
            roomCode,
            floor,
            price,
            category,
            id,
            index,
          },
        })
      );
    } else {
      dispatch(
        showNotification({
          message: "Phòng trống mới được phép sửa thông tin!",
          status: 0,
        })
      );
    }
  };
  return (
    <div className="table w-full overflow-auto">
      <TitleCard topMargin="mt-2">
        <div className={"overflow-x-auto w-full"}>
          <table className="table w-full overflow-x-auto">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-600 bg-white border-gray-300 rounded focus:ring-rose-500 focus:ring-2 cursor-pointer"
                    checked={selectAll}
                    onChange={handleToggleAll}
                  />
                </th>
                <th className="font-normal">STT</th>
                <th className="font-normal">MÃ PHÒNG</th>
                <th className="font-normal">HÌNH ẢNH</th>
                <th className="font-normal">LOẠI TẦNG</th>
                <th className="font-normal">LOẠI PHÒNG</th>
                <th className="font-normal">GIÁ THUÊ (VNĐ)</th>
                <th className="font-normal">TRẠNG THÁI</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roomsChange && roomsChange.length > 0 &&
                handleFilterRoom().map((l, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td>
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-rose-600 bg-white border-gray-300 rounded focus:ring-rose-500 focus:ring-2 cursor-pointer"
                          checked={handeChecked({
                            roomId: l.id,
                            roomCode: l.roomCode,
                          })}
                          onChange={() =>
                            handleCheckboxChange({
                              roomId: l.id,
                              roomCode: l.roomCode,
                            })
                          }
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>P.{l.roomCode}</td>
                      <td>
                        <button
                          onClick={() => {
                            handleShowImgRoom(
                              l.id,
                              l.rentPrice,
                              index,
                              l.roomCode
                            );
                          }}
                        >
                          <img
                            src={
                              l.amountPicture
                                ? "/checkHome.png"
                                : "/checkHome6.jpg"
                            }
                            alt={`Item ${index + 1}`}
                            className="w-10"
                          />
                        </button>
                      </td>
                      <td>Tầng {l.floor ? l.floor : "G"}</td>
                      <td>
                        <div className="badge border-none bg-gray-100 text-gray-800 text-xs font-lg rounded ">
                          {l.category}
                        </div>
                      </td>
                      <td>{formatPrice(l.rentPrice)}đ</td>
                      <td>{getDummyStatus(l.status ? l.status : 1)}</td>
                      <td>
                        <button
                          className="text-rose-500"
                          onClick={() => {
                            openRightDrawerUpdateRoom(
                              l.roomCode,
                              l.floor,
                              l.rentPrice,
                              l.category,
                              l.id,
                              l.status,
                              index
                            );
                          }}
                        >
                          Chỉnh sửa
                        </button>

                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </div>
  );
}

export default ListRooms;
