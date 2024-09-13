import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import { useFormik } from "formik";
import {
  validationPastDay,
  validationRequired,
} from "../../../components/yup/validationSchema";
import * as Yup from "yup";
import InputTextFormik from "../../../components/inputFormik/InputTextFormik";
import InputSelectFomik from "../../../components/inputFormik/InputSelectFomik";
import { useEffect, useState } from "react";
import { fetchListBank } from "../../../components/services/fetchListBank";
import { fetchInfoCustommer } from "./services/fetchInfoCustommer";
import moment from "moment";
import InputFileFormik from "../../../components/inputFormik/InputFileFormik";
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import { fetchUpdateInfoCustommer } from "./services/fetchUpdateInfoCustommer";
 
function getBank(options, bankCode) {
  return options.filter((item) => item.value == bankCode);
}

function ProfileSettings() {
  const dispatch = useDispatch();
  const [optionsBank, setoptionsBank] = useState([]);

  const optionsPosition = [
    { label: "Quản lý", value: "Quản lý" },
    { label: "Nhân viên", value: "Nhân viên" },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      fullName: "",
      gender: 0,
      telegramId: "",
      bod: "",
      phoneNumber: "",
      identification: "",
      issuedBy: "",
      dateRange: "",
      permanentAddress: "",
      signature: "",
      accountNumber: "",
      bankCode: "",
      position: "",
      accountName: "",
    },

    validationSchema: Yup.object({
      fullName: validationRequired,
      telegramId: validationRequired,
      phoneNumber: validationRequired,
      identification: validationRequired,
      permanentAddress: validationRequired,
      bod: validationPastDay,
      dateRange: validationPastDay,
    }),

    onSubmit: (values) => {
      const resultAPI = dispatch(
        fetchUpdateInfoCustommer({
          ...values,
          bankCode: values.bankCode.value + "",
          position: values.position.value,
        })
      );
      resultAPI
        .then((response) => {
          if (response.error) {
            dispatch(
              showNotification({
                message: "Cập nhật thông tin thất bại",
                status: 0,
              })
            );
          } else {
            dispatch(
              showNotification({
                message: "Cập nhật thông tin thành công",
                status: 1,
              })
            );
          }
        })
        .catch((error) => {
          console.error("Error while calling API:", error);
          dispatch(
            showNotification({
              message: "Có lỗi xảy ra khi gọi API",
              status: 0,
            })
          );
        });
    },
  });

  const openModalSign = () => {
    dispatch(
      openModal({
        title: "Tạo chữ kí",
        bodyType: MODAL_BODY_TYPES.SIGNATURE,
        extraObject: {
          callBack: (data) => {
            formik.setFieldValue("signature", data);
          },
        },
      })
    );
  };

  useEffect(() => {
    // lấy option bank
    const resultAPIBank = fetchListBank();
    resultAPIBank.then((data) => {
      setoptionsBank(
        data.map((item) => {
          return { label: `${item.shortName} - ${item.name}`, value: item.id };
        })
      );
    });
  }, []);
  useEffect(() => {
    const resultAPIInfoCustommer = dispatch(fetchInfoCustommer());
    resultAPIInfoCustommer.then(async (data) => {
      const response = data?.payload?.response;
      const bankcode = Number(response.bankCode);

      formik.setValues({
        ...response,
        bod: moment(response.bod).format("YYYY-MM-DD"),
        dateRange: moment(response.dateRange).format("YYYY-MM-DD"),
        position: { label: response.position, value: response.position },
        bankCode: getBank(optionsBank, response.bankCode),
      });
    });
  }, [optionsBank]);
  //  cccd
 
  return (
    <>
      <TitleCard title="Chỉnh sửa hồ sơ" topMargin="mt-2 p-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Họ tên"
              type="text"
              updateType="fullName"
              formik={formik}
              format="name"
            />

            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="ID telegram"
              type="text"
              updateType="telegramId"
              formik={formik}
            />

            <InputSelectFomik
              labelTitle="Nhóm quyền"
              options={optionsPosition}
              formik={formik}
              updateType="position"
              value={formik.values.position}
              errors={formik.errors.position}
            />
          </div>
          <div className="divider mt-8">Thông tin đại diện kí hợp đồng</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Họ tên"
              updateType="fullName"
              formik={formik}
              disabled={true}
            />

            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Số điện thoại"
              type="text"
              updateType="phoneNumber"
              formik={formik}
            />

            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Ngày sinh"
              type="date"
              updateType="bod"
              formik={formik}
            />

            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="CMND/CCCD"
              updateType="identification"
              formik={formik}
            />

            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Ngày cấp"
              updateType="dateRange"
              type="date"
              formik={formik}
            />
            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Nơi cấp"
              updateType="issuedBy"
              formik={formik}
            />

            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Địa chỉ thường trú"
              type="text"
              updateType="permanentAddress"
              formik={formik}
            />

            {/* <InputSelectFomik
              labelTitle="Chức vụ"
              options={[
                { label: "Quản lý", value: "1" },
                { label: "Chủ nhà", value: "2" },
              ]}
              formik={formik}
              updateType="position"
            /> */}

            <InputSelectFomik
              labelTitle="Ngân hàng"
              options={optionsBank}
              formik={formik}
              updateType="bankCode"
               
            />

            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Số tài khoản"
              updateType="accountNumber"
              formik={formik}
            />

            <InputTextFormik
              containerStyle="mt-4"
              labelTitle="Chủ tài khoản"
              updateType="accountName"
              formik={formik}
              
            />

            <div>
              <InputFileFormik
                labelTitle="Chữ kí"
                formik={formik}
                updateType="signature"
              />

              <button
                onClick={openModalSign}
                type="button"
                className="mt-2 text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 w-full"
              >
                Tạo chữ kí
              </button>
            </div>
          </div>

          <div className="mt-16">
            <button
              className="btn bg-rose-600 hover:bg-rose-700 text-white float-right border-transparent hover:border-transparent"
              type="submit"
            >
              Cập nhật thông tin
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
