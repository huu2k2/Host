export async function auth(userName, password) {
  // const url = `${process.env.REACT_APP_BASE_URL}/accounts/sign-in`;
  const url = `${process.env.REACT_APP_BASE_URL}/accounts/sign-in`;
  // const url = 'http://localhost:8080/api/accounts/sign-in';
  const data = {
    userName: userName,
    password: password

  };

  try {


    const response = await fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      localStorage.setItem("token", jsonResponse.token)
      return jsonResponse;
    } else {
      return false;
    }
  } catch (error) {
    
    console.error(new Error(`API Lỗi đăng nhập: ${error.message}`))
    return false
  }
}
