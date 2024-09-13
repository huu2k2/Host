import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboadContent } from "../dashboardSlice";

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
function ReceivedRevenueOverview({ lable, value, icon, setIndexChart, index, indexChart }) {
    console.log("hfhhhd", indexChart);
    const COLORS = ["primary", "primary"]
    const isActive = index === indexChart;

    return (
        <div onClick={() => setIndexChart(index)} className={`stats shadow w-1/3 duration-500 ${isActive ? 'bg-[#FFC04B] text-white' : 'bg-white text-gray-900'}`}>
            <div className="stat gap-0 text-left"> {/* Thêm text-left */}
                <div className={`stat-title ${isActive ? 'text-white' : 'dark:text-slate-300 '}`}>{lable}</div>
                <div className="flex justify-between items-center font-black">
                    <div className={`stat-value text-[35px] ${isActive ? 'text-white' : 'dark:text-slate-300 text-gray-900'}`}>{value}</div>
                    <div className={`stat-figure ${isActive ? 'text-white' : 'dark:text-slate-300 text-gray-900'}`}>{icon}</div>
                </div>
                <div className="stat-actions mt-2"> {/* Thêm mt-2 để tạo khoảng cách giữa các phần tử */}
                    {/* <h5 className={`underline decoration-solid ${isActive ? 'text-white' : 'text-[#111827]'}`}>
                        Tổng quan
                    </h5> */}
                </div>
            </div>
        </div>
    )

}
export default ReceivedRevenueOverview