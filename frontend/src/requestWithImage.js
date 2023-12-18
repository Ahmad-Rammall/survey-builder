import axios from "axios";

export const sendRequest = async ({
  route,
  body,
  method = "GET",
}) => {

  try {
    const response = await axios.request({
      url: `http://localhost:3000/${route}`,
      method,
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
