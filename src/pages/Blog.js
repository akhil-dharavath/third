import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Link } from "@mui/material";
import {
  deleteBlogApi,
  getOneBlogApi,
  subscribeApi,
  unSubscribeApi,
} from "../api/blogs";
import { getUserApi } from "../api/authentication";
import { enqueueSnackbar } from "notistack";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState({});
  const [subscribed, setSubscribed] = useState(null);

  const getBlog = async () => {
    const res = await getOneBlogApi(id);
    if (res.data) {
      setBlog(res.data);
    } else {
      alert(res.response.data.messege);
    }
  };

  const getUser = async () => {
    const res = await getUserApi();
    if (res.data) {
      setUser(res.data);
      const count = res.data.unSubscribed.filter((sub) => sub === id).length;
      setSubscribed(count === 0);
    } else {
      alert(res.response.data.messege);
    }
  };

  useEffect(() => {
    getUser();
    getBlog();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  const handleDelete = async () => {
    const res = await deleteBlogApi(id);
    if (res.data) {
      enqueueSnackbar("Successfully blog has been deleted!", { variant: "success" });
      navigate("/");
    } else {
      alert(res.response.data.message);
    }
  };
  
  const handleSubscribe = async () => {
    const res = await subscribeApi(id);
    if (res.data) {
      setSubscribed(true);
    } else {
      alert(res.response.data.message);
    }
  };

  const handleUnSubscribe = async () => {
    const res = await unSubscribeApi(id);
    if (res.data) {
      setSubscribed(false);
    } else {
      alert(res.response.data.message);
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            sx={{ width: "auto" }}
            className="mx-2"
            onClick={() =>
              subscribed ? handleUnSubscribe() : handleSubscribe()
            }
          >
            {subscribed ? "Unsubscribe" : "Subscribe"}
          </Button>
          {user && user.role === "Moderator" && (
            <Button
              color="error"
              variant="outlined"
              sx={{ width: "auto" }}
              className="mx-2"
              onClick={() => handleDelete()}
            >
              Delete Blog
            </Button>
          )}
        </div>
        <div className="container mx-auto flex px-5 pt-6 items-center justify-center flex-col">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {blog ? blog.title : ""}
          </h1>
          <Link
            // href="/"
            className="inline-flex justify-start items-center mx-5 mb-0 blog-author"
          >
            <img
              alt="blog"
              src="https://dummyimage.com/104x104"
              className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
            />
            <span className="flex-grow flex flex-col pl-4">
              <span className="title-font text-lg text-gray-900">
                {blog ? blog.authorName : ""} |{" "}
                <span className=" text-base text-gray-700">
                  {blog ? blog.createdAt.slice(0, 10) : ""}
                </span>
              </span>
              {/* <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                {blog ? blog.createdAt.slice(0, 10) : ""}
              </span> */}
            </span>
          </Link>

          <span className="inline-block py-1 px-3 mx-5 mb-4 mt-3 rounded bg-indigo-100 text-indigo-500 font-medium tracking-widest blog-category">
            {blog ? blog.category : ""}
          </span>

          <img
            className="w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={blog ? blog.cover : ""}
          />
          <div className="text-center lg:w-2/3 w-full">
            <p className="mb-8 leading-relaxed">
              {blog ? blog.description : ""}. Lorem Ipsum is simply dummy text
              of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <div className="flex justify-center"></div>
          </div>
        </div>
        <div
          className="flex items-center flex-wrap pb-4 mb-4 border-b-4 border-indigo-400 mt-0 w-full"
          style={{ maxWidth: "90vw", margin: "auto" }}
        >
          <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
            <svg
              className="w-4 h-4 mr-1"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {blog ? blog.likes : ""}
          </span>
          <span
            className="text-gray-400 inline-flex items-center leading-none text-sm"
            // onClick={() => handleClickOpen()}
          >
            <svg
              className="w-4 h-4 mr-1"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
            </svg>
            {blog ? blog.comments.length : ""}
          </span>
        </div>
      </section>
    </>
  );
};

export default Blog;
