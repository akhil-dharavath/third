import React, { useEffect } from "react";
import { blogs } from "../config/blogs";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Link } from "@mui/material";

const Blog = ({ blogs: blogsList, setBlogs }) => {
  const location = useLocation().pathname.slice(6);

  const blog = blogs.filter(
    (blog) => blog.id.toString() === location.toString()
  )[0];

  const navigate = useNavigate();
  const handleDelete = () => {
    setBlogs(blogsList.filter((blo) => blo.id !== blog.id));
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      navigate("/login");
    }
  });

  return (
    // <section className="text-gray-600 body-font">
    //   <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
    //     <img
    //       className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
    //       alt="hero"
    //       src={blog.cover}
    //     />
    //     <div className="text-center lg:w-2/3 w-full">
    //       <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
    //         {blog.title}
    //       </h1>
    //       <p className="mb-8 leading-relaxed">{blog.description}</p>
    //       <div className="flex justify-center">
    //         {blog.role==="Moderator" && <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
    //           Delete Post
    //         </button>}
    //         <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
    //           Comment
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className="blog-post bg-dark" style={{minHeight:'100vh'}}>
      {localStorage.getItem("role") === "Moderator" && (
        <Button color="error" className="mx-5 mt-3" onClick={() => handleDelete()}>
          Delete Post
        </Button>
      )}
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-5 mx-auto">
          <div class="flex flex-wrap -m-12 mx-auto">
            <div class="p-12 flex flex-col items-start">
              <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                {blog.category}
              </span>
              <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                {blog.title}
              </h2>
              <p class="leading-relaxed mb-8">{blog.description}</p>
              <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                <span class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                  <svg
                    class="w-4 h-4 mr-1"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {blog.likes}
                </span>
                <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                  <svg
                    class="w-4 h-4 mr-1"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                  {blog.comments.length}
                </span>
              </div>
              <Link href="/" class="inline-flex items-center">
                <img
                  alt="blog"
                  src="https://dummyimage.com/104x104"
                  class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
                <span class="flex-grow flex flex-col pl-4">
                  <span class="title-font font-medium text-gray-900">
                    {blog.authorName}
                  </span>
                  <span class="text-gray-400 text-xs tracking-widest mt-0.5">
                    {blog.createdAt}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
