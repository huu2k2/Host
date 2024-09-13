function BtnFillterChart() {
    return (
        <div className="flex gap-3">
            <button
                className="p-2 bg-[#94a3b8]  rounded w-16 active:bg-[#1E429F] active:text-gray-400  text-white">
                1T
            </button>

            <button
                className="p-2 bg-[#94a3b8]  rounded w-16 active:bg-[#1E429F] active:text-gray-400  text-white">
                3T
            </button>  <button
                className="p-2 bg-[#94a3b8]  rounded w-16 active:bg-[#1E429F] active:text-gray-400  text-white">
                6T
            </button>  <button
                className="p-2 bg-[#94a3b8]  rounded w-16 active:bg-[#1E429F] active:text-gray-400  text-white">
                1N
            </button>

        </div>
    );
}

export default BtnFillterChart;