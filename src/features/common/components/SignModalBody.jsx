import { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

function SignModalBody({ extraObject, closeModal }) {
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  const handleClear = () => {
    sign.clear();
    setUrl("");
  };

  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));

    extraObject.callBack(
      sign
        .getTrimmedCanvas()
        .toDataURL("mimetype", "base64string")
        .replace("data:image/png;base64,", "")
    );

    closeModal()
  };
  return (
    <div className="">
      <p>Kí trực tiếp vào đây</p>
      <SignatureCanvas
        canvasProps={{ width: 400, height: 200, className: "sigCanvas" }}
        ref={(data) => setSign(data)}
      />
      <button
        onClick={handleClear}
        type="button"
        className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
      >
        Xoá
      </button>
      <button
        onClick={handleGenerate}
        type="button"
        className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
      >
        Tạo chữ kí
      </button>
    </div>
  );
}

export default SignModalBody;
