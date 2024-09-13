/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import InputText from "./input/InputText";
import { useDispatch, useSelector } from "react-redux";
import { deleteFurniture, updateFurniture } from "./NewHomeSlice";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { showNotification } from "../../common/headerSlice";
import InputPrice from "./input/InputPrice";

function ListFurniture() {
  const dispatch = useDispatch();
  const { furnitures } = useSelector((state) => state.newHome);

  const updateFormValue = ({ updateType, value }) => {
    //updateType mang giá trị là index
    let newFurnitureObj = furnitures.slice();

    // gán giá trị index
    newFurnitureObj[updateType] = { ...newFurnitureObj[updateType] };
    newFurnitureObj[updateType].price = value;
    dispatch(updateFurniture({ newFurnitureObj }));
  };

  const handleChecked = (index) => {
    let newFurnitureObj = furnitures.slice();
    newFurnitureObj[index] = { ...newFurnitureObj[index] };
    newFurnitureObj[index].isActived = !newFurnitureObj[index].isActived;
    dispatch(updateFurniture({ newFurnitureObj }));
  };

  const handleCheckAll = () => {
    const allChecked = furnitures.every((furniture) => furniture.isActived);
    let newFurnitureObj = [];
    if (allChecked) {
      newFurnitureObj = furnitures.map((item) => {
        return { ...item, isActived: false };
      });
    } else {
      newFurnitureObj = furnitures.map((item) => {
        return { ...item, isActived: true };
      });
    }

    dispatch(updateFurniture({ newFurnitureObj }));
  };

  const handleDelete = (index) => {
    if (index>6) {
      dispatch(deleteFurniture({ index }));
      dispatch(
        showNotification({
          message: "Xoá nội thất thành công",
          status: 1,
        })
      );
    }
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 mt-4">
        <div>
          <table className="table w-full">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-600 bg-white border-gray-300 rounded focus:ring-rose-500 focus:ring-2 cursor-pointer"
                    // nếu tất cả chekced == true thì bằng true
                    checked={furnitures.every(
                      (furniture) => furniture.isActived
                    )}
                    onChange={handleCheckAll}
                  />
                </th>
                <th className="font-normal">STT</th>
                <th className="font-normal">NỘI THẤT</th>
                <th className="font-normal">GIÁ THUÊ (VNĐ)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {furnitures.length > 0 &&
                furnitures.map((item, k) => {
                  return (
                    <tr
                      key={k}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td>
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-rose-600 bg-white border-gray-300 rounded focus:ring-rose-500 focus:ring-2 cursor-pointer"
                          checked={item.isActived}
                          onChange={() => handleChecked(k)}
                          defaultValue={item.isActived}
                        />
                      </td>
                      <td>{k + 1}</td>
                      <td>{item.furnitureName}</td>
                      <td>
                        <InputPrice
                          type="text"
                          format="price"
                          defaultValue={item.price || 0}
                          updateType={k}
                          updateFormValue={updateFormValue}
                          disabled={!item.isActived}
                          unit="đ"
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            handleDelete(k);
                          }}
                        >
                          <TrashIcon
                            className={` w-5 ${
                              k>6 ? "text-rose-600" : "text-gray-600"
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListFurniture;
