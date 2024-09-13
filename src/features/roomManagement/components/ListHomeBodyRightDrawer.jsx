import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { getHomes } from "../homesSlice";
import { Home } from "./Home";

function ListHomeBodyRightDrawer({ closeRightDrawer }) {
  let navigate = useNavigate();
  const { homes } = useSelector((state) => state.homes);
  const handleClickCreateHome = () => {
    closeRightDrawer();
    navigate("/app/homemanagement/createHome");
  };

  return (
    <div className="mt-4 h-screen">


      {homes.map((item, index) => {
        return (
          <Home
            index={index}
            id={item.id}
            key={index}
            cityCode={item.cityCode}
            districtCode={item.districtCode}
            wardCode={item.warCoded}
            name={item.name}
            address={item.address}
            quantityRoom={item.quantityRoom}
            closeRightDrawer={closeRightDrawer}
          />
        );
      })}
      
    </div>
  );
}

export default ListHomeBodyRightDrawer;
