import { useContext, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { UserContext } from "..";

function FillterMonth() {

    const value = useContext(UserContext);
    // Lấy thời gian hiện tại
    // Lưu ý: getMonth() trả về giá trị từ 0-11


    // const [month, setMonth] = useState(thisMonth);
    // Tạo mảng tháng
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }

    return (
        <div className="flex w-full my-2">
            <button
                onClick={() => value.setYear(value.year - 1)}
                className="flex items-center w-[160px] justify-center px-4 py-1 mr-2 bg-gray-200 rounded-xl"
            >
                <FaChevronLeft />
                <p>năm trước</p>
            </button>

            <div className="flex w-full gap-2">
                {months.map((item) => (
                    <button
                        key={item}
                        onClick={() => value.setMonth(item)}
                        className={`flex justify-center flex-col items-center duration-300 rounded w-1/12 hover:bg-rose-300 active:bg-red-400  ${item === value.month ? "border border-rose-600  scale-[1.15] translate-y-[-4px]" : "bg-gray-200"}`}
                    >
                        <p className={`font-bold ${item === value.month ? "text-rose-600" : ""}`}>T.{item}</p>
                        <span className={`${item === value.month ? "text-rose-600" : ""}`}>{value.year}</span>
                    </button>
                ))}
            </div>

            <button
                onClick={() => value.setYear(value.year + 1)}
                className="flex items-center w-[160px] justify-center px-4 py-2 ml-2 bg-gray-200 rounded-xl"
            >
                <p>năm sau</p>
                <FaChevronRight />
            </button>
        </div>
    );
}

export default FillterMonth;
