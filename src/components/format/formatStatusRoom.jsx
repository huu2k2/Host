export const formatStatusRoom = (status) => {
  switch (status) {
    case "0":
      return "Phòng trống";
    case "1":
      return "Sắp trống";
    case "2":
      return "Đã đặt cọc";
    case "3":
      return "Đã cho thuê";
    case "4":
      return "Hợp đồng quá hạn";
    case "5":
      return "Đang nợ tiền";

    default:
      return "Phòng trống";
  }
};
