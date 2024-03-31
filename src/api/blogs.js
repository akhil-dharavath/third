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

const subscribeApi = async (id) => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/blogs/subscribe/${id}`,
      method: "PUT",
    });
    return response;
  } catch (error) {
    return error;
  }
};

const unSubscribeApi = async (id) => {
  const authtoken = localStorage.getItem("token");
  try {
    const response = await axios({
      headers: { "content-type": "application/json", authtoken },
      url: `${process.env.REACT_APP_URL}/blogs/unsubscribe/${id}`,
      method: "PUT",
    });
    return response;
  } catch (error) {
    return error;
  }
};

const openaiCommentApi = async (title, description) => {
  try {
    const response = await axios({
      headers: { "content-type": "application/json" },
      url: `${process.env.REACT_APP_URL}/blogs/comment/openai-comment`,
      method: "POST",
      data: JSON.stringify({ title, description }),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getTopStoriesApi = async (city) => {
  try {
    const response = await axios({
      headers: { "content-type": "application/json" },
      url: `${process.env.REACT_APP_URL}/blogs/stories/${city}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    return error;
  }
};
const suggestApi = async (city, question, temperature, weather) => {
  try {
    const response = await axios({
      headers: { "content-type": "application/json" },
      url: `${process.env.REACT_APP_URL}/blogs/search/event`,
      method: "POST",
      data: JSON.stringify({ city, question, temperature, weather }),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getEventApi = async (question) => {
  try {
    const response = await axios({
      headers: { "content-type": "application/json" },
      url: `${process.env.REACT_APP_URL}/blogs/get/event`,
      method: "POST",
      data: JSON.stringify({ question }),
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
  subscribeApi,
  unSubscribeApi,
  openaiCommentApi,
  getTopStoriesApi,
  suggestApi,
  getEventApi
};
