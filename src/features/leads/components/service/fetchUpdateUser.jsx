const token = localStorage.getItem('token')
const fetchUpdateUser = async (userObj) => {
    return fetch(
      `${process.env.REACT_APP_BASE_URL}/accounts/update-user`,
      {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userObj),
      }
    )
      .then((data) => {
        if (data.ok) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        return false;
      });
  };

  export default fetchUpdateUser

