import axios from "axios";

export const fetchDetailsHome = async (id) => {
  try {
    // Retrieve JWT token from local storage
    const tokenJWT = localStorage.getItem("token");

    // Construct the URL with the provided ID
    const url = `/houses/get-full-house-information-by-id/${id}`;
    // Make an HTTP GET request using Axios
    const response = await axios.get(url, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${tokenJWT}`, // Include the JWT token in the Authorization header
      },
    });

    // Return the data from the response
    return response.data.response;
  } catch (error) {
    // If an error occurs, throw the error
    throw error;
  }
};
