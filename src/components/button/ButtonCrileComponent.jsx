import React from "react";
export const ButtonCrileComponent = ({
  content = "",
  icon = "",
  callBack,
  bg = "red-600",
}) => {
  const styleBtn = (bg) => {
    let baseStyle =
      "w-10 h-10 rounded-full border-1 flex items-center justify-center mx-1";

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
      <button className={styleBtn(bg)} onClick={callBack}>
        <div className="flex justify-center">
          {icon}
          <span className="ml-2 ">{content}</span>
        </div>
      </button>
    </>
  );
};
