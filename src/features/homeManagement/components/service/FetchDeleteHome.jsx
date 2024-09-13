import axios from "axios";

export const FetchDeleteHome = (id) => {
  const tokenJWT = localStorage.getItem("token");

  // Thay thế URL bằng địa chỉ API thực tế của bạn
  const url = `/houses/delete-house/${id}`;
  // Sử dụng axios để gửi yêu cầu DELETE đến API
  return axios.delete(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tokenJWT}`,
    },
  });
  // .then((response) => {
  //   // Xử lý phản hồi thành công nếu cần
  //   //console.log("Xóa nhà thành công:", response.data);
  //   return true;
  // })
  // .catch((error) => {
  //   // Xử lý lỗi nếu có
  //   console.error("Lỗi khi xóa nhà:", error);
  //   return false;
  // });
};
