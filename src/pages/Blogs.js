import React, { useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllBlogsApi } from "../api/blogs";

const Blogs = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname.slice(1);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const res = await getAllBlogsApi();
    if (res.data) {
      setBlogs(res.data);
    } else {
      alert(res.response.data.message);
    }
  };

  useEffect(() => {
    getBlogs();
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="text-gray-600 body-font mx-5 overflow-hidden">
      <div className="container py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100 all-blogs">
          {blogs && blogs.length > 0 ? (
            blogs
              .filter((blog) => blog.category.toLowerCase().includes(location))
              .map((blog) => <BlogItem key={blog._id} blog={blog} />)
          ) : (
            <p className="text-center mt-5">Trouble finding blogs</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
