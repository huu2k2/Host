import React from "react";
import CheckBox from "./input/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { updateUtilitie } from "./NewHomeSlice";

export const UtilitiesSection = () => {
  const dispatch = useDispatch();
  const { utilities } = useSelector((state) => state.newHome);

  const updateFormUtilities = (type, selected) => {
    const key = type.updateType;
    const checked = !utilities[type.updateType].checked;
    dispatch(updateUtilitie({ key, checked }));
  };
  return (
    <>
      <p className="text-lg leading-6 font-medium text-gray-900">
        Danh mục tiện ích
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {Object.entries(utilities).map(([key, value]) => (
          <CheckBox
            label={value.name}
            key={key}
            updateType={key}
            updateFormValue={updateFormUtilities}
            defaultValue={value.checked}
          />
        ))}
      </div>
    </>
  );
};
