import React, { useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import { useLocation, useNavigate } from "react-router-dom";

const Blogs = ({ blogsList, setBlogsList }) => {
  const location = useLocation().pathname.slice(1);
  const [blog, setBlog] = useState(blogsList);

  const navigate = useNavigate();
  useEffect(() => {
    if (location === "") {
      setBlog(blogsList);
    } else {
      setBlog(
        blogsList.filter((li) => li.category.toLowerCase().includes(location))
      );
    }
    if (!localStorage.getItem("name")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <section className="text-gray-600 body-font mx-5 overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 mx-5 divide-gray-100">
          {blog &&
            blog.length > 0 &&
            blog.map((blo) => (
              <BlogItem
                key={blo.id}
                blog={blo}
                blogs={blogsList}
                setBlogs={setBlogsList}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
