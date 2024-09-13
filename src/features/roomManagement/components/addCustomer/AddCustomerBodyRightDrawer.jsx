import { useEffect, useState } from "react";
import { InfoCustomerDepositSection } from "./InfoCustomerDepositSection";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../../common/headerSlice";
import { FetchAddCustomer } from "../service/FetchAddCustomer";
import { FetchGetInfoContract } from "../service/FetchGetInfoContract";
import { updateAddCustomerSlice } from "./addCustomerSlice";
import { FetchListCustomer } from "../service/FetchListCustomer";
import { getRooms } from "../../../common/roomsSlice";

const INIT_OBJ_CUSTOMER = {
  roomId: 0,
  fullName: "",
  phoneNumber: "",
  identification: "",
  dateRange: "",
  issuedBy: "",
  permanentAddress: "",
  vehicles: [
    {
      type: "",
      licensePlates: "",
      image: null,
    },
  ],
};

function AddCustomerBodyRightDrawer({ closeRightDrawer, extraObject }) {
  const [countMember, setcountMember] = useState(0);
  const { selectedHome } = useSelector((state) => state.rooms);
  const [shadowInfoAddCustomerSlice,setshadowInfoAddCustomerSlice]=useState(null)
  const dispatch = useDispatch();
  const { infoAddCustomerSlice } = useSelector(
    (state) => state.addCustomerSlice
  );

// useEffect(()=>{
// if(infoAddCustomerSlice && infoAddCustomerSlice.lenght>0){
//   setshadowInfoAddCustomerSlice(JSON.parse(JSON.stringify(infoAddCustomerSlice)))
// }
// },[])
  useEffect(() => {
    if (extraObject.numberOfResidents > 0) {
      // Lấy thông tin khách hàng theo api
      const resAPI = dispatch(FetchListCustomer(extraObject.roomId));
      resAPI.then((data) => {
        // convert roomId vì id trả về là 0
        const response = data.payload.response.map((item) => {
          return {
            ...item,
            roomId: extraObject.roomId,
          };
        });
        setcountMember(response.length);

        dispatch(updateAddCustomerSlice(response));
      });
    } else {
      // Lấy thông tin khách hàng đầu tiên trong hợp đồng
      const data = {
        roomId: extraObject.roomId,
        contractId: extraObject.contractId,
      };

      const resAPI = dispatch(FetchGetInfoContract(data));
      dispatch(
        showNotification({ message: "Lay thong tin tu hop dong", status: 1 })
      );
      resAPI.then((data) => {
        const response = data.payload.response;

        let tempCustomer = infoAddCustomerSlice.slice();
        tempCustomer[0] = {
          ...tempCustomer[0],
          roomId: extraObject.roomId,
          fullName: response.fullName,
          phoneNumber: response.phoneNumber,
          identification: response.identification,
          dateRange: response.dateRange,
          issuedBy: response.issuedBy,
        };
        setcountMember(tempCustomer.length);
        dispatch(updateAddCustomerSlice(tempCustomer));
      });
    }
  }, [extraObject]);

  const updateFormValue = ({ updateType, value, index }) => {
    let tempCustomer = JSON.parse(JSON.stringify(infoAddCustomerSlice));
    tempCustomer[index] = { ...tempCustomer[index], [updateType]: value };
    dispatch(updateAddCustomerSlice(tempCustomer));
  };
  const updateFormValue1 = (obj, index) => {
    let tempCustomer = JSON.parse(JSON.stringify(infoAddCustomerSlice));
    tempCustomer[index] = { ...tempCustomer[index], ...obj };
    dispatch(updateAddCustomerSlice(tempCustomer));
  };
  const updateFormVehicleValue = ({ updateType, value, index, index2 }) => {
    let tempCustomer = JSON.parse(JSON.stringify(infoAddCustomerSlice));
    tempCustomer[index].vehicles[index2][updateType] = value; // lấy index và type cần update
    dispatch(updateAddCustomerSlice(tempCustomer));
  };

  const handleAddObjCustomer = () => {
    if (extraObject.numberOfResidents + 1 > infoAddCustomerSlice?.length) {
      let tempCustomer = infoAddCustomerSlice.slice();
      tempCustomer.push({ ...INIT_OBJ_CUSTOMER, roomId: extraObject.roomId });
      dispatch(
        showNotification({ message: "Thêm khách hàng thành công", status: 1 })
      );

      dispatch(updateAddCustomerSlice(tempCustomer));
    }
  };

  const handleAddVehicleCustomer = (index) => {
    let tempCustomer = JSON.parse(JSON.stringify(infoAddCustomerSlice));

    // // Thêm phần tử mới vào mảng vehicles của đối tượng tại chỉ mục được chỉ định
    tempCustomer[index].vehicles.push({
      type: "",
      licensePlates: "",
      image: null,
    });

    dispatch(showNotification({ message: "Thêm xe thành công", status: 1 }));
    // Cập nhật state với bản sao đã cập nhật
    dispatch(updateAddCustomerSlice(tempCustomer));
  };

  const handleDeleteObjCustomer = (index) => {
    let tempCustomer = infoAddCustomerSlice.slice();

    if (tempCustomer?.length > 1) {
      tempCustomer.splice(index, 1);
    }
    dispatch(
      showNotification({ message: "Xoá khách hàng thành công", status: 1 })
    );
    dispatch(updateAddCustomerSlice(tempCustomer));
  };

  const handleDeleteObjVehicle = (index, index2) => {
    let tempCustomer = JSON.parse(JSON.stringify(infoAddCustomerSlice));

    tempCustomer[index].vehicles.splice(index2, 1);

    dispatch(showNotification({ message: "xoá xe thành công", status: 1 }));
    dispatch(updateAddCustomerSlice(tempCustomer));
  };

  const handleSubmitAddCustomer = () => {
    const requestAPI = dispatch(FetchAddCustomer(infoAddCustomerSlice));
    try {
      requestAPI.then((response) => {
        if (response.payload) {
          if (response.payload.isSuccess) {
            dispatch(
              showNotification({
                message: response.payload.message,
                status: 1,
              })
            );

            dispatch(getRooms({ id: selectedHome.id, search: "" }));
            closeRightDrawer();
          } else {
            dispatch(
              showNotification({
                message: response.payload.message,
                status: 0,
              })
            );
          }
        } else {
          dispatch(
            showNotification({ message: "Thêm khách hàng thất bại", status: 0 })
          );
        }
      });
    } catch (error) {}
  };
 
  return (
    <div className="mt-4 h-screen">
      <div className="">
        <div className="float-right">
          <button
            onClick={handleAddObjCustomer}
            className=" h-7 pr-2.5 py-1.5 bg-rose-600 hover:bg-rose-500  rounded justify-center items-center gap-2 inline-flex"
          >
            <PlusSmallIcon className="w-4 h-4 relative text-white" />
            <div className="text-center text-white text-xs font-medium">
              Thêm khách hàng
            </div>
          </button>
        </div>

        {infoAddCustomerSlice?.length > 0 &&
          infoAddCustomerSlice?.slice(0, countMember)?.map((item, index) => {
            return (
              <InfoCustomerDepositSection
                key={index}
                index={index}
                updateFormValue={updateFormValue}
                updateFormValue1={updateFormValue1}
                updateFormVehicleValue={updateFormVehicleValue}
                item={item}
                handleDeleteObjCustomer={handleDeleteObjCustomer}
                handleAddVehicleCustomer={handleAddVehicleCustomer}
                handleDeleteObjVehicle={handleDeleteObjVehicle}
                customersObj={infoAddCustomerSlice}
                disabled={true}
                isShowCCCd={false}
              />
            );
          })}
        {infoAddCustomerSlice?.length > 1 &&
          infoAddCustomerSlice?.slice(countMember)?.map((item, index) => {
            return (
              <InfoCustomerDepositSection
                key={index}
                index={index + countMember}
                updateFormValue={updateFormValue}
                updateFormValue1={updateFormValue1}
                updateFormVehicleValue={updateFormVehicleValue}
                item={item}
                handleDeleteObjCustomer={handleDeleteObjCustomer}
                handleAddVehicleCustomer={handleAddVehicleCustomer}
                handleDeleteObjVehicle={handleDeleteObjVehicle}
                customersObj={infoAddCustomerSlice}
                disabled={true}
                isShowCCCd={true}
              />
            );
          })}

        {infoAddCustomerSlice?.length > 0 && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => closeRightDrawer()}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
            >
              Huỷ
            </button>
            {extraObject.numberOfResidents > 0 ? (
              <button
                onClick={handleSubmitAddCustomer}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Cập nhật
              </button>
            ) : (
              <button
                onClick={handleSubmitAddCustomer}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Thêm
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCustomerBodyRightDrawer;
