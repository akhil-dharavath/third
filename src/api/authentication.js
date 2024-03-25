import axios from "axios";

const loginApi = async (data) => {
  try {
    const response = await axios({
      headers: { "content-type": "application/json" },
      url: `${process.env.REACT_APP_URL}/auth/login`,
      method: "POST",
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const registerApi = async (data) => {
  try {
    const response = await axios({
      headers: { "content-type": "application/json" },
      url: `${process.env.REACT_APP_URL}/auth/register`,
      method: "POST",
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getUserApi = async () => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/auth/getuser`,
      method: "GET",
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getAllUsers = async () => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/auth/getall`,
      method: "GET",
    });
    return response;
  } catch (error) {
    return error;
  }
};

const disableUser = async (user) => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/auth/disable`,
      method: "PUT",
      data: JSON.stringify({ user }),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const enableUser = async (user) => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/auth/enable`,
      method: "PUT",
      data: JSON.stringify({ user }),
    });
    return response;
  } catch (error) {
    return error;
  }
};

export {
  loginApi,
  registerApi,
  getUserApi,
  getAllUsers,
  disableUser,
  enableUser,
};
