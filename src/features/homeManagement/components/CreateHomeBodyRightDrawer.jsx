import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { getHomes } from "../homesSlice";
import { Home } from "./Home";

function CreateHomeBodyRightDrawer({ closeRightDrawer }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { homes } = useSelector((state) => state.homes);
 

  const handleClickCreateHome = () => {
    closeRightDrawer();
    navigate("/app/homemanagement/createHome");
  };

  return (
    <div className="mt-4 h-screen">
      <div className="mb-5">
        <p className="text-lg pt-5 font-medium text-gray-900 dark:text-white">
          Thêm nhà trọ mới
        </p>
        <div className="text-sm leading-5 font-inter font-normal tracking-normal text-left">
          Bạn có thể tạo mới trên Aloper của chúng tôi hoặc sử dụng mẫu excel
          bên dưới.
        </div>
      </div>

      <button
        className="btn w-full bg-rose-50 text-rose-700 border-none hover:bg-rose-200"
        onClick={handleClickCreateHome}
      >
        <PlusSmallIcon className="w-7 mx-2" />
        Tạo mới
      </button>

      <div className="divider mt-1"></div>

      {homes.map((item, index) => {
        return (
          <Home
            index={index}
            id={item.id}
            key={index}
            cityCode={item.cityCode}
            districtCode={item.districtCode}
            wardCode={item.wardCode}
            name={item.name}
            address={item.address}
            quantityRoom={item.quantityRoom}
            closeRightDrawer={closeRightDrawer}
          />
        );
      })}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => closeRightDrawer()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Huỷ
        </button>
        <button
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
}

export default CreateHomeBodyRightDrawer;
