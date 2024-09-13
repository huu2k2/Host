const postCCCD = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/v2/IDRecognitions/get-id-infor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  
    return response.json();
  };
  

  export {postCCCD}