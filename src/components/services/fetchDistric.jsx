export const fetchDistrict = async () => {
  try {
    // Tạo URL với ID được cung cấp
    const url = `https://vapi.vnappmob.com/api/province/district/79`;

    // Thực hiện yêu cầu HTTP GET sử dụng Fetch API
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });

    // Phân tích phản hồi dưới dạng JSON
    const data = await response.json();
    

    // Trả về dữ liệu
    return data.results;
  } catch (error) {
    // Nếu có lỗi xảy ra, ném lỗi đó
    throw error;
  }
};
