import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputText from "./input/InputText";
import InputSelect from "./input/InputSelect";
import MutiSelect from "./input/MutiSelect";

import { updateInfoHome } from "./NewHomeSlice";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProvince } from "../../../components/services/fetchProvince";
import { fetchDistrict } from "../../../components/services/fetchDistric";
import { fetchWard } from "../../../components/services/fetchWard";
import { getLeadsContent } from "../../leads/leadSlice";

const INITIAL_ADDRESS_OPTIONS = {
  cityCode: "",
  optionsProvinces: [],
  districtCode: "",
  optionsDistricts: [],
  wardCode: "",
  optionsWard: [],
};
function extractAddressComponents(address) {

  const components = address.split(',').map(component => component.trim());

  if (components.length !== 3) {
    throw new Error('Địa chỉ không hợp lệ.');
  }

  return components;
}
export const InfoHomeSection = ({ updateHome }) => {

  const dispatch = useDispatch();
  const { infoHome } = useSelector((state) => state.newHome);
 
  const { leads } = useSelector((state) => state.lead);

  const [addressOptions, setAddressOptions] = useState(INITIAL_ADDRESS_OPTIONS);
  const [userOptions, setUserOptions] = useState([]);

  const updateAddressOptions = ({ updateType, value }) => {
    dispatch(updateInfoHome({ ...infoHome, [updateType]: value }));
 
    setAddressOptions((prevOptions) => ({
      ...prevOptions,
      [updateType]: value,
    }));
  };

  const fetchDistrictData = useCallback(async () => {
    try {
      const result = await fetchDistrict();
      const optionsDistricts = result.map((item) => ({
        label: item.district_name,
        value: item.district_id,
      }));
      setAddressOptions((prevOptions) => ({
        ...prevOptions,
        optionsDistricts,
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchWardData = useCallback(async (districtCode) => {
    if (districtCode) {
      try {
        const result = await fetchWard(districtCode);
        const optionsWard = result.map((item) => ({
          label: item.ward_name,
          value: item.ward_id,
        }));
        setAddressOptions((prevOptions) => ({
          ...prevOptions,
          optionsWard,
        }));
      } catch (error) {
        console.error(error);
      }


    }
  }, []);

  useEffect(() => {
    fetchDistrictData();
  }, [fetchDistrictData]);

  useEffect(() => {
    fetchWardData(infoHome.district?.value);
  }, [fetchWardData, infoHome.district?.value]);

  const memoizedOptionsDistricts = useMemo(() => addressOptions.optionsDistricts, [addressOptions.optionsDistricts]);
  const memoizedOptionsWard = useMemo(() => addressOptions.optionsWard, [addressOptions.optionsWard]);

  const updateFormValue = ({ updateType, value }) => {

    dispatch(updateInfoHome({ ...infoHome, [updateType]: value }));
  };

  useEffect(() => {
      dispatch(getLeadsContent());
  }, []);

  useEffect(() => {
    if (leads.length > 0) {
      const options = leads.map((item) => ({
        label: item.fullName,
        value: item.id,
      }));
      setUserOptions(options);
    }
  }, [leads]);

  return (
    <div>
      <p className="text-lg leading-6 font-medium text-gray-900">
        Thông tin toà nhà
      </p>
      <p className="text-sm leading-5 font-normal">
        Vui lòng điện những thông tin dưới đây để lên nhà trọ mới.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InputText
          lable="Tên nhà"
          updateType="name"
          format="nameHome"
          updateFormValue={updateFormValue}
          defaultValue={updateHome ? updateHome.name : ""}
        />

        <InputText
          type="number"
          updateType="quantity"
          updateFormValue={updateFormValue}
          format="number"
          lable="Số lượng phòng"
          disabled={updateHome ? false : true}
          defaultValue={updateHome ? updateHome.quantity : ""}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        <div className="flex flex-col items-start w-full">
          <p className="text-sm leading-5 font-medium">Tỉnh/TP</p>
          <div className="border border-gray-300 w-[242px] h-10 rounded-md py-[9px] px-[13px] text-gray-500">
            Tp.Hồ Chí Minh
          </div>
        </div>
        <InputSelect
          type="address"
          updateFormValue={updateAddressOptions}
          updateType="district"
          options={addressOptions.optionsDistricts}
          placeholder={updateHome ? extractAddressComponents(updateHome.address)[1] : "Quận"}
          lable="Quận"
          defaultValue={updateHome ? infoHome.districtCode : ""}
        />
        <InputSelect
          type="address"
          updateFormValue={updateAddressOptions}
          updateType="ward"
          options={addressOptions.optionsWard}
          placeholder={updateHome ? extractAddressComponents(updateHome.address)[0] : "Phường"}
          lable="Phường"
          defaultValue={updateHome ? infoHome.wardCode : ""}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
        <MutiSelect
          updateFormValue={updateFormValue}
          updateType="users"
          options={userOptions}
          lable="Nhân viên quản lý"
          placeholder="Chọn nhân viên"
          defaultValue={updateHome ? infoHome.users : ""}
        />
      </div>
    </div>
  );
};
