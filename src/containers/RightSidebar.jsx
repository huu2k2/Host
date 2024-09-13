import { useDispatch, useSelector } from 'react-redux'
import NotificationBodyRightDrawer from '../features/common/components/NotificationBodyRightDrawer'
import { closeRightDrawer } from '../features/common/rightDrawerSlice'
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'
import CalendarEventsBodyRightDrawer from '../features/calendar/CalendarEventsBodyRightDrawer'
import CreateUserBodyRightDrawer from '../features/leads/components/CreateUserBodyRightDrawer'
import UpdateUserBodyRightDrawer from '../features/leads/components/UpdateUserBodyRightDrawer'
import CreateHomeBodyRightDrawer from '../features/homeManagement/components/CreateHomeBodyRightDrawer'
import CreatePolicyBodyRightDrawer from '../features/createHome/components/CreatePolicyBodyRightDrawer'
import CreateFurnituresBodyRightDrawer from '../features/createHome/components/CreateFurnituresBodyRightDrawer'
import UpdateRoomBodyRightDrawer from '../features/homeManagement/components/UpdateRoomBodyRightDrawer'
import ListHomeBodyRightDrawer from '../features/roomManagement/components/ListHomeBodyRightDrawer'
import DetailsRoomBodyRightDrawer from '../features/roomManagement/components/detailsRoom/DetailsRoomBodyRightDrawer'
import DepositRoomBodyRightDrawer from '../features/roomManagement/components/depositRoom/DepositRoomBodyRightDrawer'
import ContractRoomBodyRightDrawer from '../features/roomManagement/components/contractRoom/ContractRoomBodyRightDrawer'
import AddCustomerBodyRightDrawer from '../features/roomManagement/components/addCustomer/AddCustomerBodyRightDrawer'
import CreateRoomBodyRightDrawer from '../features/homeManagement/components/CreateRoomBodyRightDrawer'
import ExportContractRoom from '../features/roomManagement/components/contractRoom/ExportContractRoom'
import HistoryDepositBodyRight from '../features/transactions/components/HistoryDepositBodyRight'
import DepositQRBodyRight from '../features/transactions/components/DepositQRBodyRight'
import CreateBill from './../features/transactions/components/CreatBill';
import FirstMonthRentHistory from '../features/transactions/components/FirstMonthRentHistory'
import DetailsBrokerBodyRightDrawer from '../features/roomManagement/components/DetailsRoomBodyRightDrawer'



function RightSidebar() {

    const { isOpen, bodyType, extraObject, header, content } = useSelector(state => state.rightDrawer)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeRightDrawer(e))
    }



    return (
        <div className={" fixed overflow-hidden z-20 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " + (isOpen ? " transition-opacity opacity-100 duration-500 translate-x-0  " : " transition-all delay-500 opacity-0 translate-x-full  ")}>

            <section className={"w-100 md:w-[556px] right-0 absolute bg-base-100 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " + (isOpen ? " translate-x-0 " : " translate-x-full ")}>

                <div className="relative  pb-5 flex flex-col  h-full">

                    {/* Header */}
                    <div className="navbar   flex p-7 items-start  shadow-md bg-black text-xl justify-between">

                        <div className="flex items-center space-x-3">
                            <div>
                                <div className="font-bold text-white">{header}</div>
                                <div className="text-sm opacity-80 text-white ">{content}</div>
                            </div>
                        </div>
                        <button className="float-right btn bg-gray-700 btn-xs hover:bg-gray-500" onClick={() => close()}>
                            x
                        </button>
                    </div>


                    {/* ------------------ Content Start ------------------ */}
                    <div className="overflow-y-scroll pl-4 pr-4">
                        <div className="flex flex-col w-full">
                            {/* Loading drawer body according to different drawer type */}
                            {
                                {
                                    [RIGHT_DRAWER_TYPES.NOTIFICATION]: <NotificationBodyRightDrawer {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.CALENDAR_EVENTS]: <CalendarEventsBodyRightDrawer {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.CREATE_USER]: <CreateUserBodyRightDrawer {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.UPDATE_USER]: <UpdateUserBodyRightDrawer {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.CREATE_HOME]: <CreateHomeBodyRightDrawer {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.CREATE_POLICY]: <CreatePolicyBodyRightDrawer {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.CREATE_FURNITURE]: <CreateFurnituresBodyRightDrawer {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.UPDATE_ROOM]: <UpdateRoomBodyRightDrawer extraObject={extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.CREATE_ROOM]: <CreateRoomBodyRightDrawer extraObject={extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.LIST_HOME]: <ListHomeBodyRightDrawer {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.DETAILS_ROOM]: <DetailsRoomBodyRightDrawer extraObject={extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.DEPOSIT_ROOM]: <DepositRoomBodyRightDrawer extraObject={extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.ADD_CUSTOMER]: <AddCustomerBodyRightDrawer extraObject={extraObject} closeRightDrawer={close} />,

                                    [RIGHT_DRAWER_TYPES.CONTRACT_ROOM]: <ContractRoomBodyRightDrawer extraObject={extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.EXPORT_CONTRACT_ROOM]: <ExportContractRoom extraObject={extraObject} closeRightDrawer={close} />,

                                    [RIGHT_DRAWER_TYPES.DEPOSIT_HISTORY]: <HistoryDepositBodyRight {...extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.DEPOSIT_QR]: <DepositQRBodyRight closeRightDrawer={close} extraObject={extraObject} />,
                                    [RIGHT_DRAWER_TYPES.CREATE_BILL]: <CreateBill extraObject={extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.RENT_HISTORY]: <FirstMonthRentHistory extraObject={extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.BROKER]: <DetailsBrokerBodyRightDrawer extraObject={extraObject} closeRightDrawer={close} />,
                                    [RIGHT_DRAWER_TYPES.DEFAULT]: <div></div>
                                }[bodyType]
                            }

                        </div>
                    </div>
                    {/* ------------------ Content End ------------------ */}
                </div>

            </section>

            <section className=" w-screen h-full cursor-pointer " onClick={() => close()} ></section>
        </div>
    )
}

export default RightSidebar