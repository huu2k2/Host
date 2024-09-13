import React, { useContext, useState } from 'react'
import { UserContext } from '../../features/transactions';

const Btnprocess = ({ setNum, num }) => {

    const value = useContext(UserContext);
    const [width, setWidth] = useState(false)
    return (
        <div className='flex bg-gray-100 py-2 items-center  gap-2'>
            <button
                onClick={() => {
                    setWidth(!width);
                    setNum(1);
                }}
                className={`bg-[#FFC04B] w-[120px] text-[20px] font-bold rounded-lg  text-white h-[50px]  `}
            >Tháng đầu

            </button>
            <div className={`flex items-center justify-start   gap-3  relative   overflow-hidden duration-500 ${width === false ? "w-[580px]" : "w-0"}`}>
                <button
                    onClick={() => setNum(1)}
                    className="flex items-center relative z-20 ">
                    <div className={`flex items-center px-4 py-2 rounded-l-lg  w-[230px] h-[50px] duration-500 ${num === 1 ? 'bg-[#FFC04B] text-white ' : 'bg-white'}`}>
                        <div className="flex-shrink-0">
                            <span className="block text-2xl font-bold text-[35px]">01</span>
                        </div>
                        <div className="ml-3 flex items-center">
                            <p className="text-[20px] font-bold">Chốt cọc</p>
                        </div>
                    </div>
                    <div className={`w-0 h-[50px] border-t-[24px] border-t-transparent border-b-[24px] border-b-transparent border-l-[24px] duration-500 ${num === 1 ? ' border-l-[#FFC04B] ' : 'border-l-white'} `}></div>
                </button>
                <button
                    onClick={() => setNum(2)}
                    className="flex items-center  ">
                    <div className={`flex items-cente px-4 py-2  pl-[70px] rounded-r-lg  w-[370px] h-[50PX] absolute left-[200px]  z-10 duration-500  ${num === 2 ? 'bg-[#FFC04B] text-white ' : 'bg-white'}`}>
                        <div className="flex-shrink-0">
                            <span className="block text-2xl font-bold text-[35px]">02</span>
                        </div>
                        <div className="ml-3 flex items-center">
                            <p className="text-[20px] font-bold  ">Thu tiền thuê tháng đầu</p>
                        </div>
                    </div>
                </button>
            </div>
            <button
                onClick={() => {
                    setWidth(!width);
                    setNum(3);
                }}

                className={`bg-[#0F2C67] w-[120px] text-[20px] font-bold rounded-lg h-[50PX] text-white  `}
            >Tháng {value.month}

            </button>
            <div className={`flex items-center justify-start   gap-3  relative   overflow-hidden duration-500 ${width === true ? "w-[750px]" : "w-0"}`}>
                <button
                    onClick={() => setNum(3)}
                    className="flex items-center relative z-30 ">
                    <div className={`flex items-center px-4 py-2 rounded-l-lg  w-[200px] h-[50PX] duration-500 ${num === 3 ? 'bg-[#0F2C67] text-white ' : 'bg-white'}`}>
                        <div className="flex-shrink-0">
                            <span className="block text-2xl font-bold text-[35px]">01</span>
                        </div>
                        <div className="ml-3 flex items-center">
                            <p className="text-[20px] font-bold">Ghi chỉ số </p>
                        </div>
                    </div>
                    <div className={`w-0 h-[50px] border-t-[24px] border-t-transparent border-b-[24px] border-b-transparent border-l-[24px] duration-500     ${num === 3 ? ' border-l-[#0F2C67] ' : 'border-l-white'} `}></div>
                </button>
                <button
                    onClick={() => setNum(4)}
                    className="flex items-center  z-20 absolute left-[180px] ">
                    <div className={`flex items-center px-4 py-2 rounded-l-lg  w-[250px] h-[50PX]   pl-[70px] duration-500 ${num === 4 ? 'bg-[#0F2C67] text-white ' : 'bg-white'}`}>
                        <div className="flex-shrink-0">
                            <span className="block text-2xl font-bold text-[35px]">02</span>
                        </div>
                        <div className="ml-3 flex items-center">
                            <p className="text-[20px] font-bold">Dịch vụ</p>
                        </div>
                    </div>
                    <div className={`w-0 h-[50px] border-t-[24px] border-t-transparent border-b-[24px] border-b-transparent border-l-[24px] duration-500 ${num === 4 ? ' border-l-[#0F2C67] ' : 'border-l-white'} `}></div>
                </button>
                <button
                    onClick={() => setNum(5)}
                    className="flex items-center  ">
                    <div className={`flex items-cente px-4 py-2  pl-[70px] rounded-r-lg  w-[260PX] h-[50PX] absolute left-[400px]  z-5 duration-500  ${num === 5 ? 'bg-[#0F2C67] text-white ' : 'bg-white'}`}>
                        <div className="flex-shrink-0">
                            <span className="block text-2xl font-bold text-[35px]">03</span>
                        </div>
                        <div className="ml-3 flex items-center">
                            <p className="text-[20px] font-bold  ">Gửi hóa đơn</p>
                        </div>
                    </div>
                </button>
            </div>

        </div >
    )
}

export default Btnprocess