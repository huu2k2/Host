import InputText from "../../../components/inputDrawRIght/InputText";


function ModalWater({ extraObject, closeModal }) {
    return (
        <>
            <div className="mt-2">
                <InputText
                    defaultValue="2000000"

                    lable="Số nước cũ"
                    disabled='true'
                />
            </div>
            <div className="mt-2">
                <InputText
                    // defaultValue={formatPrice(2000000)}

                    lable="Số nước mới"
                />

            </div>
            <div className="flex justify-end  gap-3">

                <button className="active:bg-rose-500 p-[8px] text-white rounded-md bg-rose-600"> Xác nhận </button>
            </div>

        </>

    );
}

export default ModalWater;