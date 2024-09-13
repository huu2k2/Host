import React, { useEffect } from "react";
import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ArrowUpTrayIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import { ButtonComponent } from "../../components/button/ButtonComponent";
import { useNavigate } from "react-router";
import { InfoHomeSection } from "./components/InfoHomeSection";
import { ServicePolicySection } from "./components/ServicePolicySection";
import { UtilitiesSection } from "./components/UtilitiesSection";
import { FurnitureSection } from "./components/FurnitureSection";
import { PolicyBrokerage } from "./components/PolicyBrokerage";
import { useDispatch, useSelector } from "react-redux";
import {
  insertHome,
  resetToInitialState,
  updateRoomImport,
} from "./components/NewHomeSlice";
import { showNotification } from "../common/headerSlice";
import { Breadcrumb } from "flowbite-react";
import { fetchXLSHome } from "./services/fetchXLSHome";
import { ButtonImportComponent } from "../../components/button/ButtonImportComponent";
import * as XLSX from "xlsx";
import { getHomes } from "../homeManagement/homesSlice";

export const CreateHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newHome } = useSelector((state) => state);

  const convertServices = newHome.servicesPolicy.map((item) => ({
    serviceName: item.serviceName, // Bạn cần cung cấp giá trị thích hợp cho name
    dvt: item.option,
    servicePrice: item.price,
    oldNumber: null,
    newNumber: null,
    calculate: null,
  }));

  const convertUser = newHome.infoHome.users.map((item) => ({
    userId: item.value,
  }));

  const convertFurnitures = newHome.furnitures
    .filter((item) => item.checked) // Lọc ra các phần tử có checked là true
    .map((item) => ({
      // furnitureId: null,
      furnitureName: item.furnitureName,
      price: item.price,
      note: "",
      status: null,
      isActived: item.price ? false : true,
    }));
  const handleCreateHome = () => {
   
    const newHomeObject = {
      name: newHome.infoHome.name,
      quantity: newHome.infoHome.quantity,
      cityCode: 79,
      startDate: newHome.brokerage.startDate,
      endDate: newHome.brokerage.endDate,
      districtCode: newHome.infoHome?.district?.value,
      wardCode: newHome.infoHome?.ward?.value,
      parking: newHome.utilities?.parking?.checked,
      stair: newHome.utilities.stair.checked,
      washing: newHome.utilities.washing.checked,
      sercuri: newHome.utilities.sercuri.checked,
      wifi: newHome.utilities.wifi.checked,
      elevator: newHome.utilities.elevator.checked,
      hallwayCleaning: newHome.utilities.hallwayCleaning.checked,
      fingerprintLock: newHome.utilities.fingerprintLock.checked,
      freeHours: newHome.utilities.freeHours.checked,
      cleanRoom: newHome.utilities.cleanRoom.checked,
      pet: newHome.utilities.pet.checked,
      cammera: newHome.utilities.cammera.checked,
      address: `${newHome.infoHome.ward?.label}, ${newHome.infoHome.district?.label}, TP.Hồ Chí Minh}`,
      isAgency: newHome.brokerage.isAgency,
      isExclusive: newHome.brokerage.isExclusive,
      pass: newHome.brokerage.pass,
      cityName: "TP.Hồ Chí Minh",
      districtName: newHome.infoHome.district?.label,
      wardName: newHome.infoHome.ward?.label,
      users: convertUser || null,
      services: convertServices,
      furnitures: newHome.furnitures,
      commissionPolicies: newHome.commissionPolicies,
      roomImport:
        newHome.roomImport.length > 0 ? newHome.roomImport.length : null,
      brokeragePolicy: {
        numberOfPeople: newHome.brokerage.numberOfPeople,
        numberOfVehicle: newHome.brokerage.numberOfVehicle,
        note: newHome.brokerage.note,
        numberOfDaysKeepRoom: newHome.brokerage.numberOfDaysKeepRoom,
        commissionPercentage: null,
        saleIncentives: newHome.brokerage.saleIncentives,
      },
    };
 
    const requestAPI = dispatch(insertHome(newHomeObject));
    try {
      requestAPI.then((response) => {
        if (response.payload?.isSuccess) {
          dispatch(
            showNotification({ message: "thêm nhà thành công", status: 1 })
          );

          dispatch(getHomes());
        } else {
          dispatch(
            showNotification({ message: "thêm nhà thất bại", status: 0 })
          );
        }
      });
    } catch (error) {
      dispatch(showNotification({ message: "thêm nhà thất bại", status: 0 }));
    }
  };

  const handleExportFile = () => {
   
    if (
      newHome.infoHome.name &&
      newHome.infoHome.quantity &&
      newHome.infoHome.city &&
      newHome.infoHome.district &&
      newHome.infoHome.ward
    ) {
      // xuất file xls
      const data = {
        houseName: newHome.infoHome.name,
        quantity: newHome.infoHome.quantity,
        cityName: newHome.infoHome.city.label,
        districtName: newHome.infoHome.district.label,
        wardName: newHome.infoHome.ward.label,
      };
     
      dispatch(fetchXLSHome(data));
    } else {
      dispatch(
        showNotification({
          message: "Vui lòng điền đầy đủ thông tin nhà",
          status: 0,
        })
      );
    }
  };

  const handleImportFile = (e) => {
 
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet).slice(4);

        const convertData = jsonData.map((item) => ({
          roomCode: `P.${item.__EMPTY}`,
          floor: item.__EMPTY_1, // lỗi bên xlsx đang nhận trệt là chữ
          category: item.__EMPTY_2,
          price: item.__EMPTY_3,
          status: "0", // để trạng thái mặc định là 0
        }));

        dispatch(updateRoomImport(convertData));
        dispatch(
          showNotification({ message: "thêm file thành công", status: 1 })
        );

      };

      reader.readAsArrayBuffer(file);

      // Tạo một FileReader mới cho lần đọc tiếp theo
      e.target.value = null;
    }
  };

  useEffect(() => {
    dispatch(resetToInitialState());
  }, []);

  return (
    <>
      <Breadcrumb pg1="Quản lý nhà" pg2="Tạo nhà mới" />
      <div className="flex justify-between items-center">
        <p className="text-2xl leading-8 font-semibold text-gray-900">
          Thêm nhà trọ mới
        </p>

        <div className="flex">
          {/* <ButtonComponent
            icon={<LinkIcon className="w-5" />}
            bg="white"
            content="Xuất link"
          /> */}
          <ButtonImportComponent
            icon={<ArrowDownTrayIcon className="w-5" />}
            callBack={handleImportFile}
            content="Nhập file"
          />
          <ButtonComponent
            callBack={handleExportFile}
            icon={<ArrowUpTrayIcon className="w-5" />}
            content="Xuất excel"
          />
        </div>
      </div>
      <div className="w-full  bg-base-100 p-4 rounded-lg mt-4">
        <div className="max-w-3xl  m-auto">
          <div>
            <InfoHomeSection />

            <div className="divider my-8"></div>

            <ServicePolicySection />

            <div className="divider my-8"></div>

            <UtilitiesSection />

            <div className="divider my-8"></div>

            <FurnitureSection />

            <div className="divider my-8"></div>

            <PolicyBrokerage />

            <div className="divider my-8"></div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  navigate("/app/homemanagement/default");
                }}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
              >
                Huỷ
              </button>
              <button
                onClick={handleCreateHome}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
