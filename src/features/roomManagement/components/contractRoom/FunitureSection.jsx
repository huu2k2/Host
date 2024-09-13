import React from "react";
import ListFunitureSection from "./ListFunitureSection";
import { useDispatch, useSelector } from "react-redux";
import { updateContractRoomSlice } from "./contractRoomSlice";

export const FunitureSection = () => {
  const dispatch = useDispatch();

  const { infoContractRoom } = useSelector((state) => state.contractRoomSlice);

  const updateFormValue = ({ value, index }) => {
    let furnitures = infoContractRoom.furnitures.slice();
    furnitures[index] = value;
    dispatch(updateContractRoomSlice({ ...infoContractRoom, furnitures }));
  };

  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Nội thất bàn giao
      </p>

      {infoContractRoom.furnitures.map((item, index) => (
        <ListFunitureSection
          key={index}
          defaultValue={item}
          updateFormValue={updateFormValue}
          index={index}
          disable={item.price===0 ?true:false}
        />
      ))}

      <div className="divider my-1"></div>
    </>
  );
};
