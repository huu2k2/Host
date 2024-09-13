import InputText from "../../../components/inputDrawRIght/InputText";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRef, useState } from "react";
import AddImg from "../../../assets/addImg.png";
function ModalElectric({ extraObject, closeModal }) {
  const inputFileRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const updateInputValue = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      const imageData = `data:image/jpeg;base64,${base64String}`;
      //   updateFormValue({
      //     updateType,
      //     value: base64String,
      //   });

      setImagePreview(imageData);
    };
  };
  const handleUploadImg = () => {
    inputFileRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateInputValue(file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview("");
  };

  return (
    <>
      <div className="mt-2">
        <InputText
          defaultValue={(2000000).toLocaleString("vi-VN")}
          lable="Số điện cũ"
          disabled="true"
        />
      </div>
      <div className="mt-2">
        <InputText lable="Số điện mới" number="number" defaultValue={0} />
      </div>
      {/* them hình anh so dien */}

      <div className="relative flex flex-col justify-center items-center w-full h-[300px] border">
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-[400px] h-[250px] object-cover"
            />
            <AiFillCloseCircle
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white text-gray-600 cursor-pointer"
              onClick={handleRemoveImage}
            />
          </>
        ) : (
          <>
            <img
              src={AddImg}
              alt="img add"
              onClick={handleUploadImg}
              className="cursor-pointer"
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              ref={inputFileRef}
              accept=".png, .jpg, .jpeg, .gif"
            />
            <div className="w-full h-5 flex gap-1 text-sm font-normal justify-center">
              <span
                className="text-red-600 cursor-pointer"
                onClick={handleUploadImg}
              >
                Tải tệp tin
              </span>
              <span className="text-gray-600">hoặc kéo thả</span>
            </div>
            <div className="flex justify-center items-center text-xs text-gray-500 font-normal">
              <span>PNG, JPG, GIF tới 10MB</span>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end  gap-3 mt-5">
        <button className="active:bg-rose-500 p-[8px] text-white rounded-md bg-rose-600">
          {" "}
          Xác nhận{" "}
        </button>
      </div>
    </>
  );
}

export default ModalElectric;
