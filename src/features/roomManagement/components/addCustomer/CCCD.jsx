import React, { useEffect, useState, useRef } from "react";
import { Modal } from "flowbite-react";
import { AiFillCloseCircle } from "react-icons/ai";
import AddImg from "../../../../assets/addImg.png"; // Ensure this path is correct

const CCCD = ({
  title,
  title2,
  defaultValue,
  updateType,
  setCCCD,
}) => {
  const [value, setValue] = useState(defaultValue || "");
  const [count, setCount] = useState(defaultValue ? 1 : 0);
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(defaultValue ? `data:image/jpeg;base64,${defaultValue}` : "");
  const inputFileRef = useRef(null);

  useEffect(() => {
    setValue(defaultValue ?defaultValue: "");
    setImagePreview(defaultValue ? defaultValue : "");
    setCount(defaultValue ? 1 : 0);
  }, [defaultValue]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateInputValue = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      const imageData = `data:image/jpeg;base64,${base64String}`;
      setValue(imageData);
      setImagePreview(imageData);
      setCount(1);
      setCCCD((prev) => ({
        ...prev,
        ...(updateType === "beforeIdentificationBase64"
          ? { mt: base64String }
          : { ms: base64String }),
      }));
    };
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateInputValue(file);
    }
  };

  const handleUploadImg = () => {
    inputFileRef.current.click();
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setValue("");
    setCount(0);
  };

  const handleClear = () => {
    handleRemoveImage();
    handleClose();
  };

  const handleSave = () => {
    setValue(imagePreview);
    handleClose();
  };

  return (
    <div className="flex justify-between items-center mb-5 mt-5">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm font-medium text-gray-900">{title2}</p>
      </div>
      <div className="flex items-center justify-center w-80">
        <button
          type="button"
          onClick={handleOpen}
          className={`text-white w-full border ${
            count === 1
              ? "bg-rose-600 border-rose-600"
              : "bg-black border-black"
          } focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2`}
        >
          {count === 1 ? "Đã tải" : "Tải hình ảnh"}
        </button>
      </div>

      <Modal
        show={open}
        size="lg"
        position={"center"}
        onClose={handleClose}
        popup
        className="flex items-center justify-center bg-gray-500 bg-opacity-35"
      >
        <Modal.Header className="w-full text-center">
          Tải hình ảnh
        </Modal.Header>
        <Modal.Body className="w-full flex flex-col justify-center items-center py-4 border">
          <div className="relative flex flex-col justify-center items-center">
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
        </Modal.Body>
        <Modal.Footer className="w-full flex justify-end gap-2 py-5">
          <button
            onClick={handleClear}
            type="button"
            className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
          >
            Xóa
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
          >
            Lưu
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CCCD;
