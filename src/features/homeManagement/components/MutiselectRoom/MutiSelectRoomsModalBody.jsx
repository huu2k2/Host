import SelectBox from "../../../../components/Input/SelectBox";
import InputFile from "../input/InputFile";
import InputText from "../input/InputText";
import { ListRoomSelected } from "./ListRoomSelected";

function MutiSelectRoomsModalBody({ extraObject, closeModal }) {
 
  const listRoomsChecked = extraObject.selectedOptions;

  return (
    <>
      {(() => {
        switch (extraObject.typeInput) {
          case "img":
            return <InputFile />;

          case "flor":
            return (
              <SelectBox
                options={[
                  { name: "Tầng 1", value: 1 },
                  { name: "Tầng 2", value: 2 },
                  { name: "Tầng 3", value: 3 },
                  { name: "Tầng 4", value: 4 },
                ]}
                placeholder="Chọn tầng"
                containerStyle="mt-1 w-full"
                defaultValue={0}
                updateType="role"
              />
            );
          case "type":
            return (
              <SelectBox
                options={[
                  { name: "Loại 1", value: "Loại 1" },
                  { name: "Loại 2", value: "Loại 2" },
                  { name: "Loại 3", value: "Loại 3" },
                  { name: "Loại 4", value: "Loại 4" },
                ]}
                placeholder="Chọn loại phòng"
                containerStyle="mt-1 w-full"
                defaultValue={0}
                updateType="role"
              />
            );

          case "price":
            return (
              <InputText
                type="number"
                placeholder="Nhập giá cho thuê"
                containerStyle="w-full"
              />
            );
          default:
            return null;
        }
      })()}

      <p className="text-sm leading-5 mt-5 font-medium">
        {extraObject.description}
      </p>

      <ListRoomSelected listRoomsChecked={listRoomsChecked} />

      <div className="flex justify-end">
        <button
          onClick={() => closeModal()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Huỷ
        </button>
        <button
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Thêm
        </button>
      </div>
    </>
  );
}

export default MutiSelectRoomsModalBody;
