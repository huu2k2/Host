export const fetchListBank = async () => {
  try {
    const url = `https://api.vietqr.io/v2/banks`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    return data.data; 
  } catch (error) {
    throw error;
  }
};
