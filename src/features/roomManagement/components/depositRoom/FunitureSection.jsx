import React from "react";
import ListFunitureSection from "./ListFunitureSection";
import { useDispatch, useSelector } from "react-redux";
import { updateDepositRoomSlice } from "./depositRoomSlice";

export const FunitureSection = () => {
  const dispatch = useDispatch();

  const { infoDepositRoom } = useSelector((state) => state.depositRoomSlice);
  const updateFormValue = ({ value, index }) => {
    let furnitures = infoDepositRoom.furnitures.slice();
    furnitures[index] = value;
    dispatch(updateDepositRoomSlice({ ...infoDepositRoom, furnitures }));
  };
 
  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Nội thất bàn giao
      </p>

      {infoDepositRoom.furnitures.map((item, index) => (
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
