import React, { useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllBlogsApi, getTopStoriesApi } from "../api/blogs";
import { getUserApi } from "../api/authentication";
import axios from "axios";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";

const Blogs = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.slice(1);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState({});
  const [topStories, setTopStories] = useState([]);

  const getBlogs = async () => {
    const res = await getAllBlogsApi();
    if (res.data) {
      setBlogs(res.data);
    } else {
      alert(res.response.data.message);
    }
  };

  const getUser = async () => {
    const res = await getUserApi();
    if (res.data) {
      setUser(res.data);
    } else {
      alert(res.response.data.message);
    }
  };
  // console.log(search);

  const getAddress = async () => {
    const res = await axios({ url: "https://ipapi.co/json/", method: "GET" });
    if (res && res.data) {
      setAddress(res.data);
    } else {
      alert("trouble finding your location");
    }
  };

  const getTopStories = async () => {
    if (address && address.region) {
      const res = await getTopStoriesApi(address.region);
      if (res && res.data) {
        setTopStories(res.data);
      } else {
        console.log(res);
        // alert(res.response.data.message);
      }
    }
  };
  // console.log(topStories);

  useEffect(() => {
    getBlogs();
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUser();
    }
    getAddress();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTopStories();
    // eslint-disable-next-line
  }, [address]);

  return (
    <section className="text-gray-600 body-font mx-5 overflow-hidden">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography sx={{mr:2}}>Search Blog: </Typography>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blog"
          size="small"
          className="pt-4 pb-4"
        />
      </div>
      <div className="container py-12 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100 all-blogs">
          {topStories &&
            topStories.length > 0 &&
            topStories.map((story) => (
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                      {story.source.slice(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  title={story.source}
                  subheader={story.date}
                />
                <CardMedia
                  component="img"
                  height="auto"
                  image={story.thumbnail}
                  alt={story.title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ hyphens: "auto" }}
                  >
                    {story.title}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <a
                    href={story.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: "auto",
                      fontSize: "14px",
                      color: blue[700],
                    }}
                  >
                    LEARN MORE
                  </a>
                </CardActions>
              </Card>
            ))}

          {/* {blogs && blogs.length > 0 ? (
            blogs
              .filter((blog) => blog.category.toLowerCase().includes(location))
              .map((blog) => <BlogItem key={blog._id} blog={blog} />)
          ) : (
            <p className="text-center mt-5">Trouble finding blogs</p>
          )} */}
          {location === "unsubscribed" ? (
            blogs && blogs.length > 0 ? (
              blogs
                .filter((blog) => {
                  // Check if user.unSubscribed exists and contains blog._id
                  return !(
                    user.unSubscribed && !user.unSubscribed.includes(blog._id)
                  );
                })
                .filter(
                  (blog) =>
                    search === undefined ||
                    blog.title.toLowerCase().includes(search)
                )
                .map((blog) => <BlogItem key={blog._id} blog={blog} />)
            ) : (
              <p className="text-center mt-5">Trouble finding blogs</p>
            )
          ) : blogs && blogs.length > 0 ? (
            blogs
              .filter((blog) => {
                // Check if user.unSubscribed exists and contains blog._id
                return !(
                  user.unSubscribed && user.unSubscribed.includes(blog._id)
                );
              })
              .filter((blog) => blog.category.toLowerCase().includes(location))
              .filter(
                (blog) =>
                  search === undefined ||
                  blog.title.toLowerCase().includes(search)
              )
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
