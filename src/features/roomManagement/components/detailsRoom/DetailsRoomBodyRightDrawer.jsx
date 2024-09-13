import { useEffect, useState } from "react";
import { ContractSection } from "./ContractSection";
import { DepositSection } from "./DepositSection";
import { InfoCustomerSection } from "./InfoCustomerSection";
import { InfoSection } from "./InfoSection";
import { useDispatch, useSelector } from "react-redux";
import { FetchDetailsRoom } from "../service/FetchDetailsRoom";
import axios from "axios";

function DetailsBrokerBodyRightDrawer({ closeRightDrawer, extraObject }) {
  const dispatch = useDispatch();
  const { roomId } = extraObject;
  const [detailsRoom, setdetailsRoom] = useState({});
  const { selectedHome } = useSelector((state) => state.rooms);
  const { homes } = useSelector((state) => state.homes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // gọi api lấy nội thất và dịch vụ
        const resultAPI = await dispatch(FetchDetailsRoom(roomId));
        if (resultAPI.payload && resultAPI.payload.length > 0) {

          setdetailsRoom(resultAPI.payload[0]);
        } else {
          console.error("Error: API response does not contain expected data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, roomId]);
  const [images, setImages] = useState([]);

useEffect(() => {
  const getImages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/v2/Rooms/get-pictures-of-room/${roomId}`);
     
      setImages(response?.data?.response);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  if (roomId) {
    getImages();
  }
}, [roomId]);

 
  return (
    <div className="mt-4 h-screen">
      <img
        alt="hinh anh"
        className="w-full h-60 relative rounded-lg object-cover"
        src={
          images
            ? `${images[0]?.url}`
            : "https://via.placeholder.com/508x260"
        }
      />
      <div className="text-gray-900 text-lg font-medium leading-7">
        Phòng {extraObject.roomCode}
      </div>
      <div className="text-gray-500 text-sm font-medium leading-tight">
        {selectedHome.name + ", " + selectedHome.address}
      </div>
      <InfoSection detailsRoom={detailsRoom} />
      <DepositSection detailsRoom={detailsRoom} />
      <ContractSection detailsRoom={detailsRoom} />
      <InfoCustomerSection detailsRoom={detailsRoom} />
      <button
        onClick={() => closeRightDrawer()}
        type="button"
        className="float-right text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
      >
        Đóng
      </button>
    </div>
  );
}

export default DetailsBrokerBodyRightDrawer;
