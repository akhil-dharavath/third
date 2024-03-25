import axios from "axios";

const getAllBlogsApi = async () => {
  try {
    const response = await axios({
      headers: { "content-type": "application/json" },
      url: `${process.env.REACT_APP_URL}/blogs/`,
      method: "GET",
    });
    return response;
  } catch (error) {
    return error;
  }
};

const createBlogApi = async (data) => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/blogs`,
      method: "POST",
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getOneBlogApi = async (id) => {
  try {
    const response = await axios({
      headers: { "content-type": "application/json" },
      url: `${process.env.REACT_APP_URL}/blogs/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    return error;
  }
};

const deleteBlogApi = async (id) => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/blogs/${id}`,
      method: "DELETE",
    });
    return response;
  } catch (error) {
    return error;
  }
};

const addCommentApi = async (id, comment) => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/blogs/${id}`,
      method: "POST",
      data: JSON.stringify({comment}),
    });
    return response;
  } catch (error) {
    return error;
  }
};

export {
  getAllBlogsApi,
  createBlogApi,
  getOneBlogApi,
  deleteBlogApi,
  addCommentApi,
};
