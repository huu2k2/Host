import SelectBox from "../../../components/Input/SelectBox";
import InputFile from "./input/InputFile";
import InputText from "./input/InputText";
import InputDate from "./input/InputDate";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SelectBankAPI from "./input/SelectBankAPI";
import { addNewLead, createUser } from "./../leadSlice";
import FetchCreateUser from "./service/fetchCreateUser";
import { showNotification } from "../../common/headerSlice";
import SignatureCanvas from "react-signature-canvas";
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
 

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
  role: "",
  signature: "",
  bankCode: "",
  bod: "",
  permanentAddress: "",
  accountNumber: "",
  accountName: "",
  position: "Chủ nhà",
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

const switchRole = (role) => {
  switch (role) {
    case "Admin":
      return 0;
    case "HouseHolder":
      return 1;
    case "MainManager":
      return 2;
    case "Manager":
      return 3;
    default:
      return 3;
  }
};

// lọc nhưng roles bé hơn role hiện tại để thêm nhân viên
const handleFilteredRoles = (roles, userRole) => {
  return roles.filter((role, index) => index > userRole);
};
const convertToISOStartOfDay = (dateString) => {
  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây về 0
  return date.toISOString();
};

function CreateUserBodyRightDrawer({ closeRightDrawer }) {
  const [userObj, setUserObj] = useState(INITIAL_LEAD_OBJ);
  const [roleOption, setRoleOption] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  // lấy token trong localStorage
  const tokenJWT = localStorage.getItem("token");

  // role người dùng đăng nhập
  const userRole = switchRole(jwtDecode(tokenJWT).Role);

  //danh sách role
  const { roles } = useSelector((state) => state.role);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setUserObj({ ...userObj, [updateType]: value, password: userObj.userName });
  };
  const handleCreateUser = async () => {
    // khởi tạo đối tượng
    const newUserObj = { ...userObj };
    if (newUserObj.phoneNumber.length !== 10) {
      setErrorMessage("Số điện thoại phải có độ dài 10 ký tự !");
      return;
    }

    if (newUserObj.bod) {
      newUserObj.bod = convertToISOStartOfDay(newUserObj.bod);
    }
    if (newUserObj.dateRange) {
      newUserObj.dateRange = convertToISOStartOfDay(newUserObj.dateRange);
    }
    const resultAPIAddEmployeeAPI = await FetchCreateUser(newUserObj);
    if (resultAPIAddEmployeeAPI) {
      dispatch(addNewLead({ newUserObj }));
      dispatch(
        showNotification({ message: "thêm nhân viên thành công", status: 1 })
      );
      closeRightDrawer();
    } else {
      dispatch(
        showNotification({ message: "thêm nhân viên thất bại", status: 0 })
      );
    }
  };

  const openModalSign = () => {
    dispatch(
      openModal({
        title: "Tạo chữ kí",
        bodyType: MODAL_BODY_TYPES.SIGNATURE,
        extraObject: {
          callBack: (data) => {
            setUserObj({
              ...userObj,
              signature: data,
            });
          },
          userObj: userObj,
        },
      })
    );
  };

  useEffect(() => {
    const filteredRoles = handleFilteredRoles(roles, userRole);

    // mặc định thêm phần ownerId
    setUserObj({
      ...userObj,
      ownerId: jwtDecode(tokenJWT).Id,
      role: filteredRoles[0].id,
    });
    setRoleOption(filteredRoles);
  }, []);

  // xuwr ly hinh anh

  const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  const handleClear = () => {
    sign.clear();
    setUrl("");
    setUserObj({ ...userObj, signature: null });
  };

  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));

    setUserObj({
      ...userObj,
      signature: sign
        .getTrimmedCanvas()
        .toDataURL("mimetype", "base64string")
        .replace("data:image/png;base64,", ""),
    });
  };

  return (
    <>
      <div className="">
        <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
          Thông tin nhân viên
        </p>

        <InputText
          format="fullName"
          updateType="fullName"
          updateFormValue={updateFormValue}
          lable="Họ và tên"
        />

        <InputText
          type="number"
          lable="Tên đăng nhập"
          updateType="userName"
          updateFormValue={updateFormValue}
        />
        <InputText
          type="text"
          updateType="telegramId"
          updateFormValue={updateFormValue}
          lable="ID Telegram"
        />

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-900 dark:text-white">Nhóm quyền</p>
          <SelectBox
            options={roleOption}
            placeholder="lựa chọn nhóm quyền"
            containerStyle="mt-1 w-80"
            defaultValue={roleOption[0]}
            updateType="role"
            updateFormValue={updateFormValue}
          />
        </div>

        <div className="divider mt-1"></div>
        <p className="text-lg py-5 font-medium dark:text-white text-rose-800">
          Thông tin người đại điện ký hợp đồng
        </p>

        <div className="flex justify-between items-center mb-5">
          <p className="text-sm text-gray-900 dark:text-white">Họ và tên</p>
          <div className="border border-solid border-gray-300 rounded-md bg-white overflow-hidden">
            <input
              value={userObj.fullName}
              className="w-80 pl-2 h-[38px] p-[9px 13px 9px 13px]   focus:outline-none"
            />
          </div>
        </div>
        <InputText
          type="text"
          updateType="phoneNumber"
          updateFormValue={updateFormValue}
          lable="Số điện thoại"
        />

        <InputDate
          updateType="bod"
          defaultValue={"2023-11-09T08:43:32.034"}
          updateFormValue={updateFormValue}
          lable="Ngày sinh"
        />

        <InputText
          type="text"
          updateType="identification"
          updateFormValue={updateFormValue}
          lable="CCCD/CMND"
        />

        <InputDate
          updateType="dateRange"
          updateFormValue={updateFormValue}
          lable="Ngày cấp"
        />

        <InputText
          updateType="issuedBy"
          updateFormValue={updateFormValue}
          lable="Nơi cấp"
        />

        <InputText
          updateType="permanentAddress"
          updateFormValue={updateFormValue}
          lable="Địa chỉ thường trú"
        />

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-900 dark:text-white">Chức vụ</p>
          <SelectBox
            options={positions}
            placeholder="Lựa chọn chức vụ"
            containerStyle="mt-1 w-80"
            defaultValue=""
            updateType="position"
            updateFormValue={updateFormValue}
          />
        </div>

        <InputFile
          defaultValue={userObj.signature}
          type="file"
          updateType="signature"
          updateFormValue={updateFormValue}
          lable="Chữ ký"
        />

        <div className="w-full flex justify-end">
          <div></div>
          <button
            onClick={openModalSign}
            type="button"
            className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4 w-80"
          >
            Tạo chữ kí
          </button>
        </div>

        <div className="divider mt-1"></div>
        <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
          Tài khoản ngân hàng
        </p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-900 dark:text-white">Ngân hàng</p>
          <SelectBankAPI
            updateFormValue={updateFormValue}
            updateType="bankCode"
          />
        </div>

        <InputText
          type="number"
          updateType="accountNumber"
          updateFormValue={updateFormValue}
          lable="Số tài khoản"
        />

        <InputText
          updateType="accountName"
          format="fullName"
          updateFormValue={updateFormValue}
          lable="Chủ tài khoản"
        />

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
            onClick={handleCreateUser}
            type="button"
            className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
          >
            Tạo mới
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateUserBodyRightDrawer;
