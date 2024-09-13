export const fetchProvinces = () => {
  async function fetchData() {
    try {
      const response = await fetch(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      if (!response.ok) {
        throw new Error("Lỗi mạng");
      }
      const data = await response.json();


      return await data.map((item) => ({
        value: item.code,
        label: `${item.name}`,
      }));
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      return [];
    }
  }

  // trả về mảng thành phố
  return fetchData();
};

export const fetchDistrict = (cityCode) => {
  async function fetchData() {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
      );
      if (!response.ok) {
        throw new Error("Lỗi mạng");
      }
      const data = await response.json();


      return await data.districts.map((item) => ({
        value: item.code,
        label: `${item.name}`,
      }));
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      return [];
    }
  }

  // trả về mảng thành phố
  return fetchData();
};

export const fetchWard = (idDistrict) => {
  async function fetchData() {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/d/${idDistrict}?depth=2`
      );
      if (!response.ok) {
        throw new Error("Lỗi mạng");
      }
      const data = await response.json();


      return await data.wards.map((item) => ({
        value: item.code,
        label: `${item.name}`,
      }));
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      return [];
    }
  }

  // trả về mảng thành phố
  return fetchData();
};

export const fetchNameProvinces = async (code) => {
  try {
    const response = await fetch(
      `https://provinces.open-api.vn/api/p/${code}?depth=1`
    );

    if (!response.ok) {
      throw new Error("Lỗi mạng");
    }

    const data = await response.json();


    return data.name;
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
    return "";
  }
};
