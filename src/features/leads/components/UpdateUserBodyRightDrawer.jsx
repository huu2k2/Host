import SelectBox from "../../../components/Input/SelectBox";
import InputFile from "./input/InputFile";
import InputText from "./input/InputText";
import InputDate from "./input/InputDate";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SelectBankAPI from "./input/SelectBankAPI";
import { addNewLead, createUser, updateLead } from "./../leadSlice";
import fetchUpdateUser from "./service/fetchUpdateUser";
import { showNotification } from "../../common/headerSlice";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { openModal } from "../../common/modalSlice";
import {
  TYPES_DELETE,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import { error } from "daisyui/src/colors";

const INITIAL_LEAD_OBJ = {
  userName: "",
  email: "dotruong@gmail.com",
  phoneNumber: "",
  password: "",
  telegramId: "",
  identification: "",
  issuedBy: "",
  dateRange: "",
  ownerId: "",
  fullName: "",
  role: "MainManager",
  signature: "",
  bankCode: "",
  bod: "",
  permanentAddress: "",
  accountNumber: "",
  accountName: "",
  position: "",
};

const positions = [
  {
    name: "Chủ nhà",
    value: "Chủ nhà",
  },
  {
    name: "Quản lý",
    value: "Quản lý",
  },
];
const convertToISOStartOfDay = (dateString) => {
  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây về 0
  return date.toISOString();
};
const convertISOToDateInput = (isoString) => {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
function UpdateUserBodyRightDrawer({ closeRightDrawer }) {
  const dispatch = useDispatch();

  const { index } = useSelector((state) => state.rightDrawer);
  const { leads } = useSelector((state) => state.lead);
  const { roles } = useSelector((state) => state.role);
  const currentUser = leads[index];
  const [errorMessage, setErrorMessage] = useState("");
  const [roleOption, setRoleOption] = useState([]);

  const [userObj, setUserObj] = useState(INITIAL_LEAD_OBJ);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setUserObj({ ...userObj, [updateType]: value });
  };

  const handleUpdateUser = () => {
    const newuserObj = { ...userObj };
 
    if (newuserObj.phoneNumber.length !== 10) {
      setErrorMessage("Số điện thoại phải có độ dài 10 ký tự !");
      return;
    }
  

    if (newuserObj.bod) {
      newuserObj.bod = convertToISOStartOfDay(newuserObj.bod);
    }
    if (newuserObj.dateRange) {
      newuserObj.dateRange = convertToISOStartOfDay(newuserObj.dateRange);
    }

    fetchUpdateUser(newuserObj);
    dispatch(updateLead({ newuserObj }));
    dispatch(
      showNotification({ message: "sửa thông tin thành công", status: 1 })
    );
    closeRightDrawer();
  };

  const handleResetPassword = (index, id) => {

    dispatch(
      openModal({
        title: "Đặt lại mật khẩu",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_RESET_PASSWORD,
        extraObject: {
          message: ``,
          type: TYPES_DELETE.RESET_PASSWORD_USER,
          index,
          id,
        },
      })
    );
  };

  const handleDeleteUser = (index, id) => {

    dispatch(
      openModal({
        title: "Xoá tài khoản",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_DELETE_USER,
        extraObject: {
          message: `Bạn có chắc chắn muốn xoá tài khoản này?Tất cả dữ liệu sẽ bị xóa vĩnh viễn khỏi máy chủ. Hành động này không thể được hoàn tác.`,
          type: TYPES_DELETE.DELETE_USER,
          index,
          id,
        },
      })
    );
  };
  useEffect(() => {
    const filteredRoles = roles.filter((role, index) => index > 2);
    setUserObj(currentUser);

    setRoleOption(filteredRoles);

  }, []);
  return (
    <>
      <div className="">
        <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
          Thông tin nhân viên
        </p>
        <div className="flex flex-col gap-2">
          <InputText
            defaultValue={currentUser.fullName}
            format="fullName"
            updateType="fullName"
            updateFormValue={updateFormValue}
            lable="Họ và tên"
          />
          <InputText
            defaultValue={currentUser.phoneNumber}
            format="phoneNumber"
            updateType="phoneNumber"
            updateFormValue={updateFormValue}
            lable="Tên đăng nhập"
          />

          <InputText
            type="text"
            updateType="telegramId"
            defaultValue={currentUser.telegramId}
            updateFormValue={updateFormValue}
            lable="ID Telegram"
          />

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-900 ">Nhóm quyền</p>
            <SelectBox
              options={roleOption}
              labelTitle=""
              placeholder="Lựa chọn chức vụ"
              containerStyle="mt-1 w-80"
              updateType="role"
              defaultValue={currentUser.role || 1}
              updateFormValue={updateFormValue}
            />
          </div>
        </div>

        <div className="divider mt-1"></div>
        <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
          Thông tin người đại điện ký hợp đồng
        </p>
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex justify-between items-center  mb-1">
              <p className="text-sm text-gray-900 dark:text-white bg-white overflow-hidden">
                Họ và tên
              </p>
              <div className="border border-solid border-gray-300 rounded-md px-1">
                <input
                  disabled={true}
                  value={userObj.fullName}
                  className="w-[312px] pl-2 h-[38px] p-[9px 13px 9px 13px] bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
          <InputText
            type="text"
            updateType="phoneNumber"
            defaultValue={currentUser.phoneNumber}
            updateFormValue={updateFormValue}
            lable="Số điện thoại"
          />

          <InputDate
            updateType="bod"
            defaultValue={convertISOToDateInput(currentUser.bod)}
            updateFormValue={updateFormValue}
            lable="Ngày sinh"
          />

          <InputText
            type="text"
            updateType="identification"
            defaultValue={currentUser.identification}
            updateFormValue={updateFormValue}
            lable="CCCD/CMND"
          />

          <InputDate
            updateType="dateRange"
            defaultValue={convertISOToDateInput(currentUser.dateRange)}
            updateFormValue={updateFormValue}
            lable="Ngày cấp"
          />

          <InputText
            updateType="issuedBy"
            defaultValue={currentUser.issuedBy}
            updateFormValue={updateFormValue}
            lable="Nơi cấp"
          />

          <InputText
            updateType="permanentAddress"
            defaultValue={currentUser.permanentAddress}
            updateFormValue={updateFormValue}
            lable="Địa chỉ thường trú"
          />
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-900 dark:text-white">Chức vụ</p>
              <SelectBox
                options={positions}
                containerStyle="mt-1 w-80"
                placeholder="Lựa chọn chức vụ"
                defaultValue={currentUser.position || 1}
                updateType="position"
                updateFormValue={updateFormValue}
              />
            </div>
          </div>
          <InputFile
            defaultValue={userObj.signature}
            type="file"
            updateType="signature"
            updateFormValue={updateFormValue}
            lable="Chữ ký"
          />
        </div>

        <div className="divider mt-1"></div>
        <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
          Tài khoản ngân hàng
        </p>
        <div className="flex flex-col gap-2 mb-5">
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-900 dark:text-white">Ngân hàng</p>
              <SelectBankAPI
                updateFormValue={updateFormValue}
                updateType="bankCode"
                defaultValue={currentUser.bankCode}
              />
            </div>
          </div>
          <InputText
            type="number"
            updateType="accountNumber"
            defaultValue={currentUser.accountNumber}
            updateFormValue={updateFormValue}
            lable="Số tài khoản"
          />

          <InputText
            updateType="accountName"
            defaultValue={currentUser.accountName}
            format="fullName"
            updateFormValue={updateFormValue}
            lable="Chủ tài khoản"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              handleDeleteUser(index, currentUser.id);
            }}
            type="button"
            className="flex items-center text-rose-700 bg-rose-50 border border-rose-50 focus:outline-none hover:bg-rose-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-14 py-2 me-2 mb-2"
          >
            <TrashIcon className="w-5 mr-2" />
            Xoá tài khoản
          </button>
          <button
            onClick={() => {
              handleResetPassword(index, currentUser.id);
            }}
            type="button"
            className="flex items-center text-black bg-white border border-gray-200 focus:outline-none hover:border-rose-500 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-14 py-2 me-2 mb-2 ml-4"
          >
            <ArrowPathIcon className="w-5 mr-2" />
            Đặt lại mật khẩu
          </button>
        </div>

        <div className="flex justify-end">
          <span className="text-red-500 my-auto mr-2">{errorMessage}</span>
          <button
            onClick={() => closeRightDrawer()}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
          >
            Huỷ
          </button>
          <button
            onClick={handleUpdateUser}
            type="button"
            className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateUserBodyRightDrawer;
