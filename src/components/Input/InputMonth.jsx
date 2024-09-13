import { useState } from "react";





function InputMonth({ lable }) {
    const months = [
        {
            label: "tháng 1",
            value: 1
        },
        {
            label: "tháng 2",
            value: 2
        },
        {
            label: "tháng 3",
            value: 3
        }, {
            label: "tháng 4",
            value: 4
        }, {
            label: "tháng 5",
            value: 5
        }, {
            label: "tháng 6",
            value: 6
        }, {
            label: "tháng 7",
            value: 7
        }, {
            label: "tháng 8",
            value: 8
        }, {
            label: "tháng 9",
            value: 9
        }, {
            label: "tháng 10",
            value: 10
        }, {
            label: "tháng 11",
            value: 11
        }, {
            label: "tháng 12",
            value: 12
        },
    ];

    const years = Array.from({ length: 20 }, (v, i) => ({
        label: (i + 2010),
        value: i + 2010
    }));

    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSave = () => {
        setOpen(false);
        // Lưu giá trị tháng và năm
    };

    return (
        <div className=" flex flex-col ">
            <p className="flex justify-start text-[20px] text-gray-500">
                {lable}
            </p>
            <div className="flex gap-1">
                <div className="flex flex-col" >
                    <select
                        className=" rounded    h-9"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        {months.map((month, index) => (
                            <option
                                key={index}
                                value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col" >
                    <select
                        className=" rounded h-9"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        {years.map((year, index) => (
                            <option key={index} value={year.value}>
                                {year.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div >
    );

}

export default InputMonth;