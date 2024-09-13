export const fetchWard = async (id) => {
  try {
    // Construct the URL with the provided ID
    const url = `https://vapi.vnappmob.com/api/province/ward/${id}`;

    // Make an HTTP GET request using Fetch API
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });

    // Parse response as JSON
    const data = await response.json();

    // Return the data
    return data.results;    ;
  } catch (error) {
    // If an error occurs, throw the error
    throw error;
  }
};
