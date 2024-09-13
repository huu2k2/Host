import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard"
import { useEffect } from "react";
import { getDashboadContent } from "../dashboardSlice";
import { formatPrice } from "../../../components/Input/Format";


function UserChannels() {

    const dispatch = useDispatch();

    const { stats, loading, error } = useSelector((state) => state.dashboard);
    useEffect(() => {
        dispatch(getDashboadContent());

    }, [dispatch]);

    const userSourceData = [
        { source: "Tiền thuê nhà", count: "10000000", conversionPercent: 10.2 },
        { source: "Tiền điện", count: "10000000", conversionPercent: 11.7 },
        { source: "Tiền nước", count: stats?.customerTotal, conversionPercent: 12.4 },
        { source: "Tiền internet", count: (stats?.managerTotal || 0) + (stats?.mainManagerTotal || 0), conversionPercent: 20.9 },
        { source: "Chi hoa hồng môi giới ", count: (stats?.managerTotal || 0) + (stats?.mainManagerTotal || 0), conversionPercent: 20.9 },
        { source: "Chi phí quản lý", count: (stats?.managerTotal || 0) + (stats?.mainManagerTotal || 0), conversionPercent: 20.9 },
        { source: "Chi hoàn tiền cọc", count: (stats?.managerTotal || 0) + (stats?.mainManagerTotal || 0), conversionPercent: 20.9 },
        { source: "Chi hoàn tiền kết thúc hợp đồng", count: (stats?.managerTotal || 0) + (stats?.mainManagerTotal || 0), conversionPercent: 20.9 },



    ];

    return (
        <>
            {/** Table Data */}
            <div className="card w-full bg-base-100 mt-4">

                <div className=" h-full mt-2">

                    <table className="min-w-full bg-white ">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border-b">#</th>
                                <th className="px-4 py-2 border-b text-left">Nội dung</th>
                                <th className="px-4 py-2 border-b text-left">Số Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userSourceData.map((u, k) => (
                                <tr key={k} className="hover:bg-gray-100">
                                    <td className=" px-4 py-2 text-center">{k + 1}</td>
                                    <td className=" px-4 py-2">{u.source}</td>
                                    <td className=" px-4 py-2">{`${formatPrice(u.count)} `}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>



        </>

    )

}

export default UserChannels