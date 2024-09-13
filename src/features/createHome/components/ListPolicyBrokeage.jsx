import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSelect from "./input/InputSelect";
import InputText from "./input/InputText";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  deleteCommissionPolicies,
  updateCommissionPolicies,
} from "./NewHomeSlice";
import { showNotification } from "../../common/headerSlice";

export const ListPolicyBrokeage = () => {
  const dispatch = useDispatch();
  const { commissionPolicies } = useSelector((state) => state.newHome);

  const updateFormValue = ({ updateType, value, index }) => {
    // sao chép mảng ra rồi cập nhật phần tư theo index
    const newcommissionPolicies = commissionPolicies.slice();
    newcommissionPolicies[index] = {
      ...commissionPolicies[index], // giải nén phẩn tử r cập nhật
      [updateType]: parseFloat(value),
    };
    dispatch(updateCommissionPolicies(newcommissionPolicies));
  };

  const handeDeleteCommissionPolicies = (index) => {
    if (index !== 0) {
      dispatch(deleteCommissionPolicies({ index }));
      dispatch(
        showNotification({
          message: "Xoá hợp đồng thành công",
          status: 1,
        })
      );
    }
  };
  return (
    <>
      {commissionPolicies &&
        commissionPolicies.map((item, index) => {
          return (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
              key={index}
            >
              <InputSelect
                index={index}
                updateFormValue={updateFormValue}
                updateType="month"
                options={[
                  { value: 1, label: "1 Tháng" },
                  { value: 2, label: "2 Tháng" },
                  { value: 3, label: "3 Tháng" },
                  { value: 4, label: "4 Tháng" },
                  { value: 5, label: "5 Tháng" },
                  { value: 6, label: "6 Tháng" },
                  { value: 7, label: "7 Tháng" },
                  { value: 8, label: "8 Tháng" },
                  { value: 9, label: "9 Tháng" },
                  { value: 10, label: "10 Tháng" },
                  { value: 11, label: "11 Tháng" },
                  { value: 12, label: "12 Tháng" },
                ]}
                lable="Thời hạn hợp đồng"
                defaultValue={[
                  {
                    value: item.month,
                    label: item.month === 0 ? "Tháng" : `${item.month} Tháng`,
                  },
                ]}
              />
              <InputSelect
                index={index}
                updateFormValue={updateFormValue}
                updateType="deposit"
                options={[
                  { value: 1, label: "1 Tháng" },
                  { value: 1.5, label: "1,5 Tháng" },
                  { value: 1.7, label: "1,7 Tháng" },
                  { value: 2, label: "2 Tháng" },
                  { value: 3, label: "3 Tháng" },
                ]}
                lable="Đặt cọc"
                defaultValue={[
                  {
                    value: item.deposit,
                    label:
                      item.deposit === 0 ? "Tháng" : `${item.deposit} Tháng`,
                  },
                ]}
              />
              <div className="flex ">
                <InputText
                  index={index}
                  updateFormValue={updateFormValue}
                  updateType="commission"
                  type="number"
                  lable="Hoa hồng"
                  unit="%"
                  defaultValue={item.commission}
                />{" "}
                <button className="mx-3 mt-5">
                  <TrashIcon
                    onClick={() => handeDeleteCommissionPolicies(index)}
                    className={`${
                      index === 0 ? "text-gray-500" : "text-rose-600"
                    } w-5`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      <div className="divider my-8"></div>
    </>
  );
};
