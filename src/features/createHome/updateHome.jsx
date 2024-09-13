import React, { useEffect, useState } from "react";
import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ArrowUpTrayIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import { ButtonComponent } from "../../components/button/ButtonComponent";
import { useNavigate, useParams } from "react-router";
import { InfoHomeSection } from "./components/InfoHomeSection";
import { ServicePolicySection } from "./components/ServicePolicySection";
import { UtilitiesSection } from "./components/UtilitiesSection";
import { FurnitureSection } from "./components/FurnitureSection";
import { PolicyBrokerage } from "./components/PolicyBrokerage";
import { useDispatch, useSelector } from "react-redux";
import { initUpdateHome } from "./components/NewHomeSlice";
import { showNotification } from "../common/headerSlice";
import { fetchDetailsHome } from "./services/ftechDetailsHome";
import { Breadcrumb } from "flowbite-react";
import { updateHomeAPI } from "./services/ftechUpdateHome";

export const UpdateHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newHome } = useSelector((state) => state);
  const { idHome } = useParams();

  const [updateHome, setupdateHome] = useState();

  function convertFurnituresFormAPI(furnitures) {
    const result = furnitures.map((furniture) => {
      return {
        ...furniture,
        // isActived: true,
        checked: furniture.isActived,
      };
    });

    return result;
  }

  function convertUserFormAPI(users) {
    return users.map((u) => ({ label: u.fullName, value: u.userId }));
  }

  function convertServicesFormAPI(services) {
    const result = services.map((item) => {
      return {
        serviceId: item.serviceId,
        serviceName: item.serviceName,
        price: item.servicePrice,
        units: [item.dvt],
        option: item.dvt,
      };
    });

    return result;
  }

  useEffect(() => {
    fetchDetailsHome(idHome)
      .then((response) => {

        setupdateHome(response);

        const newHomeObj = {
          infoHome: {
            hostCode: response.hostCode,
            name: response.name,
            quantity: response.quantity,
            users: convertUserFormAPI(response.users),

            city: { label: response.cityName, value: response.cityCode },
            district: {
              label: response.districtName,
              value: response.districtCode,
            },
            ward: { label: response.wardName, value: response.wardCode },
          },
          servicesPolicy: convertServicesFormAPI(response.services),
          note: "",
          utilities: {
            parking: {
              name: "Chỗ để xe",
              checked: response.parking,
            },
            stair: {
              name: "Thang bộ",
              checked: response.stair,
            },
            washing: {
              name: "Máy giặt chung",
              checked: response.washing,
            },
            sercuri: {
              name: "Bảo vệ",
              checked: response.sercuri,
            },
            wifi: {
              name: "Wifi",
              checked: response.wifi,
            },
            elevator: {
              name: "Thang máy",
              checked: response.elevator,
            },
            hallwayCleaning: {
              name: "Vệ sinh hành lang",
              checked: response.hallwayCleaning,
            },
            fingerprintLock: {
              name: "Khoá vân tay",
              checked: response.fingerprintLock,
            },
            freeHours: {
              name: "Giờ giấc tự do",
              checked: response.freeHours,
            },
            cleanRoom: {
              name: "Dọn vệ sinh phòng",
              checked: response.cleanRoom,
            },
            pet: {
              name: "Nuôi thú cưng",
              checked: response.pet,
            },
            cammera: {
              name: "Cammera an ninh",
              checked: response.cammera,
            },
          },

          furnitures: convertFurnituresFormAPI(response.furnitures),
          brokerage: {
            ...response.brokeragePolicy,
            isAgency: response.isAgency,
            isExclusive: response.isExclusive,
            pass: response.pass,
            startDate: response.startDate,
            endDate: response.endDate,
            numberOfVehicle: response.numberOfVehicle,
            numberOfPeople: response.numberOfPeople,
            numberOfDaysKeepRoom: response.numberOfDaysKeepRoom
          },

          commissionPolicies: response.commissionPolicies,
        };

        dispatch(initUpdateHome({ newHomeObj }));
      })
      .catch((error) => {
        // Xử lý lỗi ở đây, ví dụ:
        console.error("Error fetching data:", error);
      });
  }, []);

  const convertServices = newHome.servicesPolicy.map((item) => ({
    serviceId: item.serviceId,
    serviceName: item.serviceName,
    dvt: item.option,
    servicePrice: item.price,
  }));

  const convertFurnitures = newHome.furnitures
    .filter((item) => item.checked) // Lọc ra các phần tử có checked là true
    .map((item) => ({
      name: item.name, // Bạn cần cung cấp giá trị thích hợp cho name
      price: item.price,
      note: "",
    }));

  const handleUpdateHome = () => {
    const newHomeUpdate = {
      id: parseInt(idHome),
      name: newHome.infoHome.name,
      quantity: newHome.infoHome.quantity,
      cityCode: parseInt(newHome.infoHome.city.value),
      districtCode: parseInt(newHome.infoHome.district.value),
      wardCode: parseInt(newHome.infoHome.ward.value),
      parking: newHome.utilities.parking.checked,
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
      address: `${newHome.infoHome.ward?.label}, ${newHome.infoHome.district?.label}, ${newHome.infoHome.city?.label}`,
      isAgency: newHome.brokerage.isAgency,
      isExclusive: newHome.brokerage.isExclusive,
      pass: newHome.brokerage.pass,
      cityName: newHome.infoHome.city.label,
      districtName: newHome.infoHome.district.label,
      wardName: newHome.infoHome.ward.label,
      startDate: newHome.brokerage.startDate,
      endDate: newHome.brokerage.endDate,
      users: newHome.infoHome.users.map((item) => {
        return { userId: item.value };
      }),
      services: convertServices,
      //   furnitures: convertFurnitures,
      furnitures: newHome.furnitures,
      commissionPolicies: newHome.commissionPolicies,
      brokeragePolicy: {
        numberOfPeople: newHome.brokerage.numberOfPeople,
        numberOfVehicle: newHome.brokerage.numberOfVehicle,
        note: newHome.brokerage.note,
        numberOfDaysKeepRoom: newHome.brokerage.numberOfDaysKeepRoom,
        commissionPercentage: null,
        saleIncentives: newHome.brokerage.saleIncentives,
        // commissionPolicyViews: [
        //   {
        //     month: 0,
        //     deposit: 0,
        //     commission: 0,
        //   },
        // ],
      },
    };



    // updateHomeAPI
    const resAPI = dispatch(updateHomeAPI({ newHomeUpdate, idHome }));
    resAPI.then((requestAPI) => {
      try {
 
        if (requestAPI.payload.isSuccess) {
          dispatch(
            showNotification({ message: "sửa nhà thành công", status: 1 })
          );
        } else {
          dispatch(
            showNotification({ message: "sửa nhà thất bại", status: 0 })
          );
        }
      } catch (error) {
        dispatch(showNotification({ message: "sửa nhà thất bại", status: 0 }));
      }
    });
  };

  return (
    <>
      <Breadcrumb pg1="Quản lý nhà" pg2="cập nhật thông tin nhà" />
      <div className="flex justify-between items-center">
        <p className="text-2xl leading-8 font-semibold text-gray-900">
          Chỉnh sửa thông tin nhà
        </p>

        <div className="flex">
          {/* <ButtonComponent
            icon={<LinkIcon className="w-5" />}
            bg="white"
            content="Xuất link"
          /> */}
          <ButtonComponent
            icon={<ArrowDownTrayIcon className="w-5" />}
            content="Nhập file"
          />
          <ButtonComponent
            icon={<ArrowUpTrayIcon className="w-5" />}
            content="Xuất file"
          />
        </div>
      </div>
      <div className="w-full  bg-base-100 p-4 rounded-lg mt-4">
        <div className="max-w-3xl  m-auto">
          <div>
            <InfoHomeSection updateHome={updateHome} />

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
                onClick={handleUpdateHome}
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
