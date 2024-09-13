import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import UserChannels from './components/UserChannels'
import BarChart from './components/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import DoughnutChart from './components/DoughnutChart'
import { useEffect, useState } from 'react'
import { updateDashboardPeriod as updateDashboardPeriodAction } from './dashboardSlice'
import ReceivedRevenueOverview from './components/ReceivedRevenueOverview'
import {
    RIGHT_DRAWER_TYPES,
} from "../../utils/globalConstantUtil";
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import IconPickHome from "../../assets/pickHome.png";
import { openRightDrawer } from '../common/rightDrawerSlice'
import BtnFillterChart from '../../components/button/BtnFillterChart'
import InputMonth from '../../components/Input/InputMonth'
import BanknotesIcon from '@heroicons/react/24/outline/BanknotesIcon';


const Dashboard = () => {

    const dispatch = useDispatch();
    const { selectedHome } = useSelector((state) => state.rooms);
    const { homes } = useSelector((state) => state.homes);

    const openRightDrawerCreateHome = () => {
        dispatch(
            openRightDrawer({
                header: `Danh sách nhà trọ của bạn (${homes.length})`,
                content:
                    "Bạn có thể điều chỉnh thông tin trực tiếp hoặc xuất file từng nhà trọ.",
                bodyType: RIGHT_DRAWER_TYPES.CREATE_HOME,
            })
        );
    };

    const [indexChart, setIndexChart] = useState(1)
    console.log("indexChart", indexChart);
    useEffect(() => {
        // Truy xuất phạm vi ngày đã lưu từ localStorage
        const savedDateRange = localStorage.getItem('dashboardDateRange');
        if (savedDateRange) {
            const parsedDateRange = JSON.parse(savedDateRange);
            dispatch(updateDashboardPeriodAction(parsedDateRange));
        }
    }, [dispatch]);






    return (
        <div className=''>

            <div className='flex w-full justify-between'>
                <div className="flex justify-between items-center ">
                    <div className="flex items-start gap-2">
                        <p className="pb-4 pt-0 text-gray-900 text-2xl font-bold dark:text-white">
                            {selectedHome.name} ({selectedHome.quantity})
                        </p>

                        <div
                            className="w-9 h-9 bg-white rounded-md shadow border border-gray-300 flex justify-center items-center"
                            onClick={openRightDrawerCreateHome}
                        >
                            <img src={IconPickHome} alt="icon chọn nhà" className="" />
                        </div>
                    </div>
                </div>

                <div className='flex gap-5'>
                    <InputMonth
                        lable={"Bắt đầu"}
                    />
                    <InputMonth
                        lable={"Kết thúc"}

                    />

                </div>

            </div>
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} /> */}
            {/** ---------------------- Different stats content 1 ------------------------- */}

            <div className='bg-[#EEEDEB] rounded-[15px] shadow p-2 w-1/2'>
                <div className=" flex justify-between gap-2 rounded-[15px] ">

                    <ReceivedRevenueOverview
                        lable="Doanh thu đã nhận"
                        value='14.7M'
                        icon={<BanknotesIcon className='w-[85px] h-8' />}

                        setIndexChart={setIndexChart}
                        indexChart={indexChart}
                        index={1}
                        isActive={indexChart === 1}

                    />
                    <ReceivedRevenueOverview
                        lable="Chi phí"
                        value='1.7M'
                        icon={<CircleStackIcon className='w-[85px] h-8' />}
                        setIndexChart={setIndexChart}
                        index={2}
                        indexChart={indexChart}
                        isActive={indexChart === 2}
                    />

                    <ReceivedRevenueOverview
                        lable="Lợi nhuận đã nhận"
                        value='20.8M'
                        index={3}
                        icon={<CurrencyDollarIcon className='w-[85px] h-8' />}
                        setIndexChart={setIndexChart}
                        indexChart={indexChart}
                        isActive={indexChart === 3}

                    />

                    {/* <ExpenseOverview />
                 <ProfitOverview /> */}

                </div>

                {/** ---------------------- Different charts ------------------------- */}

                {indexChart === 1 &&
                    <div className="lex p-2 bg-white mt-5  ">
                        <div className='flex items-center justify-end '>
                       
                            <BtnFillterChart />
                           
                        </div>
                         <p className=' text-xl font-semibold '> Tổng quan doanh thu</p>
                         <div className="divider mt-2 mb-0 w-1/2"></div>
                        <BarChart




                        />
                    </div>
                }
                {/** ---------------------- User source channels table  ------------------------- */}
                {indexChart === 2 &&
                    <div className="shadow mt-5 p-2 bg-white rounded  ">
                        <div className='flex  justify-end'>
                            <BtnFillterChart />
                        </div>
                        <div className='flex gap-3  '>

                            <div className='w-1/2 h-full'>
                                <DoughnutChart />
                            </div>
                            <div className='w-1/2 h-full'>
                                <UserChannels />
                            </div>
                        </div>

                    </div>
                }
                {/** ---------------------- User source channels table  ------------------------- */}
                {indexChart === 3 &&
                    <div className="lex p-2  mt-5  bg-white rounded   ">
                         <div className='flex items-center justify-end '>
                       
                       <BtnFillterChart />
                      
                   </div>
                    <p className=' text-xl font-semibold '> Tổng quan lợi nhuận</p>
                    <div className="divider mt-2 mb-0 w-1/2"></div>
                   <BarChart/>

                    </div>
                }
            </div>

        </div>
    )
}

export default Dashboard;