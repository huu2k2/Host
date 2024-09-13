import React, { useEffect, useState } from "react";
import { useGetName } from "../../../context/NameHolderProvider";
import { jwtDecode } from "jwt-decode";

function QRcomponent({ extraObject }) {


  const tokenJWT = localStorage.getItem("token");
  const { getName, setName } = useGetName()
  useEffect(() => {
    setName(jwtDecode(tokenJWT).FullName)
  }, [tokenJWT])
  function logoutUser() {
    localStorage.clear();
    window.location.href = "/";
  }

  const params = new URLSearchParams(extraObject.data.QRCode.split('?')[1]); // Get the query string part of the URL
  const acc = params.get('acc'); // Extract the 'acc' value


  const [getImg, setImg] = useState("");
  useEffect(() => {
    setImg(extraObject.data.QRCode);
  }, [extraObject]);
  return (
    <div className=" bg-white  rounded-md">
      <p className="font-bold text-[20px] text-gray-600">
        <strong className="font-normal ">Chủ tài khoản: </strong>{getName}
      </p>
      <p className="font-bold text-[20px] text-gray-600">
        <strong className="font-normal ">Số tài khoản: </strong>{acc}
      </p>
      <div className="flex justify-center mb-4">
        <img src={getImg} alt="" />
      </div>
      <div className="mb-4 flex flex-col justify-start text-gray-600">
        <div className="text-right text-gray-600 mb- flex justify-between items-center">
          <p className="font-bold text-[25px] text-[#2D6BB8]">
            <strong className="font-normal text-black">Số tiền: </strong>
            {extraObject.data.Amount?.toLocaleString("vi-VN")} VND
          </p>
        </div>
        <div className="flex gap-1">
          <p>Nội dung: </p>
          <strong>{extraObject.data?.Description}</strong>
        </div>
        <p className="text-rose-600 ">Vui lòng không sửa nội dung!</p>
      </div>
      <div className="flex justify-end gap-3 ">
        <button className="bg-rose-600 text-white p-2 rounded-md hover:bg-rose-500">
          Gửi hóa đơn
        </button>
      </div>
    </div>
  );
}

export default QRcomponent;
