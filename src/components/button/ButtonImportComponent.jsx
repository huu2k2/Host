import React from "react";

export const ButtonImportComponent = ({
  content = "",
  icon = "",
  callBack,
  bg = "red-600",
}) => {
  const styleBtn = (bg) => {
    let baseStyle =
      "px-5 h-[38px] p-[9px 17px 9px 15px] rounded-[6px] gap-[8px] mx-1 flex items-center";

    switch (bg) {
      case "white":
        return (
          baseStyle +
          " bg-white border text-gray-700 text-white hover:border-rose-700 "
        );

      case "red-600":
        return baseStyle + " bg-rose-600 hover:bg-rose-400 text-white";

      case "red-100":
        return baseStyle + " bg-rose-100 hover:bg-rose-400 text-white";

      default:
        return baseStyle + " bg-rose-600 hover:bg-rose-400 text-white";
    }
  };

  return (
    <>
      <input
        type="file"
        className="hidden"
        id="fileInput"
        onChange={callBack}
      />
      <label htmlFor="fileInput">
        <div className={styleBtn(bg)}>
          <div className="flex justify-center">
            {icon}
            <span className="ml-2">{content}</span>
          </div>
        </div>
      </label>
    </>
  );
};
