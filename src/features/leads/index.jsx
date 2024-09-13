/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getLeadsContent } from "./leadSlice";
import {
  TYPES_DELETE,
  MODAL_BODY_TYPES,
  RIGHT_DRAWER_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import debounce from 'lodash.debounce';

import { openRightDrawer } from "../common/rightDrawerSlice";
import { InputSearch } from "./components/input/inputSearch";



function Leads() {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.lead);
  const { roles } = useSelector((state) => state.role);


  const [stateLead, setstateLead] = useState(leads);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850); // Điều này có thể cần điều chỉnh tùy theo kích thước màn hình điện thoại của bạn.

  useEffect(() => {
    dispatch(getLeadsContent());

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    setstateLead(leads);

  }, [leads]);

  const getDummyStatus = (role) => {
    switch (role) {
      case "Admin":
        return (
          <div className="badge border-none bg-blue-100 text-blue-800 text-xs font-medium rounded ">
            {roles[0].name}
          </div>
        );
      case "HouseHolder":
        return (
          <div className="badge border-none bg-rose-100 text-rose-800 text-xs font-medium rounded ">
            {roles[1].name}
          </div>
        );
      case "MainManager":
        return (
          <div className="badge border-none bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
            {roles[2].name}
          </div>
        );
      case "Manager":
        return <div className="badge ">{roles[3].name}</div>;
      default:
        break;
    }
  };

  const openRightDrawerCreateUser = () => {
    dispatch(
      openRightDrawer({
        header: "Thông tin nhân viên",
        content: "Vui lòng điền thông tin nhân viên bằng form dưới đây",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_USER,
      })
    );
  };
  const openRightDrawerUpdateUser = (k) => {

    dispatch(
      openRightDrawer({
        header: "Cập nhật nhân viên",
        bodyType: RIGHT_DRAWER_TYPES.UPDATE_USER,
        index: k,
      })
    );
  };

  const deleteCurrentLead = (index, id) => {
    dispatch(
      openModal({
        title: "Xác nhận ",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn có chắc muốn xoá nhân viên này?`,
          type: TYPES_DELETE.LEAD_DELETE,
          index,
          id,
        },
      })
    );
  };


  const openEditLeadModal = (k) => {
    dispatch(
      openModal({
        title: "Chỉnh sửa thông tin",
        bodyType: MODAL_BODY_TYPES.LEAD_EDIT,
        index: k,
      })
    );
  };

  function removePunctuationAndLowerCase(input) {
    return input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").toLowerCase();
  }

  // tìm kiếm theo tên
  const applySearch = (value) => {
    let filteredLead = leads.filter((l) => {
      return (
        removePunctuationAndLowerCase(l.fullName).includes(
          value.toLowerCase()
        ) ||
        removePunctuationAndLowerCase(l.fullName).includes(value.toLowerCase())
      );
    });
    setstateLead(filteredLead);
  };
  const debouncedChange = debounce((search) => {
    applySearch(search)
  }, 500)

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="pb-4 pt-0 text-gray-900 text-2xl font-bold dark:text-white">
          Quản lý nhân viên
        </p>

        <div className="flex">
          <InputSearch applySearch={debouncedChange} />
          <button
            className="max-w-[113px] h-[38px] p-[9px 17px 9px 15px] rounded-[6px] gap-[8px] bg-rose-600 hover:bg-rose-400 text-white"
            onClick={openRightDrawerCreateUser}
          >
            + Tạo mới
          </button>
        </div>
      </div>
      <TitleCard
        title="Nhân viên"
        topMargin="mt-2"
      //  TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className={isMobile ? "hidden" : "overflow-x-auto w-full"}>
          <table className="table w-full">
            <thead>
              <tr>
                <th className="font-normal">STT</th>
                <th className="font-normal">TÊN NHÂN VIÊN</th>
                <th className="font-normal">ID TELEGRAM</th>
                <th className="font-normal">TRẠNG THÁI</th>
                <th className="font-normal">NHÓM QUYỀN</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {stateLead.length > 0 &&
                stateLead.map((l, k) => {
                  return (
                    <tr
                      key={k}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td> {k + 1}</td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{l.fullName}</div>
                            <div className="text-sm opacity-50">
                              {l.phoneNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* <td>{l.email}</td> */}

                      {/* <td>{moment(new Date()).add(-5 * (k + 2), 'days').format("DD MMM YY")}</td> */}
                      <td>#{l.telegramId}</td>
                      <td>
                        <div className="badge border-none bg-green-100 text-green-800 text-xs font-medium">
                          Hoạt động
                        </div>
                      </td>
                      <td>{getDummyStatus(l.role)}</td>

                      <td>
                        <button
                          className="text-rose-500"
                          onClick={() => {
                            openRightDrawerUpdateUser(k);
                          }}
                        >
                          Chỉnh sửa
                        </button>
                        {/* <button className="btn btn-square btn-ghost" onClick={() => resetPassCurrentLead(k, l.id)}><KeyIcon className="w-5" /></button>
                                                <button className="btn btn-square btn-ghost" onClick={() => openEditLeadModal(k)}><PencilIcon className="w-5" /></button>
                                                <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k, l.id)}><TrashIcon className="w-5" /></button> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* HIỂN THỊ DANH SÁCH Nhân viên CHO GIAO DIỆN ĐIỆN THOẠI  */}
        <div
          className={
            !isMobile ? "hidden" : "grid grid-cols-2 md:grid-cols-3 gap-2 m-2"
          }
        >
          {stateLead.length &&
            stateLead.map((l, k) => {
              return (
                <TitleCard key={k} topMargin={"mt-2 "}>
                  <nav className="flex-col">
                    <div className="group relative ">
                      <p className="pb-4 pt-0 text-gray-900 text-2xl font-bold dark:text-white truncate"> ({k + 1}) Tên NV: {l.fullName}</p>
                      <span className="border absolute bottom-[-10px] left-[50%] bg-white rounded text-gray-800 opacity-0 group-hover:opacity-100 delay-700 duration-300 ">{l.fullName}</span>
                    </div>

                    <ul className="flex-col ml-3">


                      <li>
                        <b>TÊN ĐĂNG NHẬP:</b> {l.userName}
                      </li>
                      <li>
                        <b>TELEGRAM ID:</b> #{l.telegramId}
                      </li>
                      <li>
                        <b>CHỨC VỤ:</b> {getDummyStatus(l.role)}
                      </li>
                    </ul>
                  </nav>

                  <div className="mt-6 py-3 text-right mr-2">
                    <button
                      className="text-rose-500"
                      onClick={() => {
                        openRightDrawerUpdateUser(k);
                      }}
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                </TitleCard>
              );
            })}
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;
