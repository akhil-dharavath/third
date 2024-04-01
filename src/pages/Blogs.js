import React, { useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllBlogsApi,
  getEventApi,
  getTopStoriesApi,
  suggestApi,
} from "../api/blogs";
import { getUserApi } from "../api/authentication";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import Spinner from "../components/Spinner";

const Blogs = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.slice(1);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState({});
  const [topStories, setTopStories] = useState([]);

  // openai
  const [first, setFirst] = React.useState("");
  const [second, setSecond] = React.useState([]);

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
        alert(res.response.data.message);
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

  const [openFirst, setOpenFirst] = React.useState(false);
  const [firstLoading, setFirstLoading] = React.useState(false);

  const [openSecond, setOpenSecond] = React.useState(false);
  const [secondLoading, setSecondLoading] = React.useState(false);
  const secondSubmit = async (question) => {
    const res = await getEventApi(question);
    if (res.data) {
      setSecond(res.data);
      setSecondLoading(false);
      return;
    } else {
      setSecondLoading(false);
      alert(res.response.data.message);
      return;
    }
  };
  const handleClickOpenSecond = () => {
    setOpenSecond(true);
  };
  const handleCloseSecond = () => {
    setOpenSecond(false);
    setSecond([]);
    setLocate("");
  };

  const [locate, setLocate] = React.useState("");

  const handleClickOpenFirst = async () => {
    setOpenFirst(true);
  };

  const firstSubmit = async (city, question, temperature, weather) => {
    const res = await suggestApi(city, question, temperature, weather);
    if (res.data) {
      setFirst(res.data);
      setFirstLoading(false);
      return;
    } else {
      setFirstLoading(false);
      alert(res.response.data.message);
      return;
    }
  };

  const handleCloseFirst = () => {
    setOpenFirst(false);
    setFirst("");
    setLocate("");
  };

  const getLocation = () => {
    if (address && address.region) {
      setLocate(`${address.city}, ${address.region}`);
    } else {
      alert(
        "Cannot access your location. You might have been blocked loaciton for the browser. Please allow loaction to see your current location"
      );
    }
  };

  useEffect(() => {
    getAddress();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="text-gray-600 body-font mx-5 overflow-hidden">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mr: 2 }}>Search Blog: </Typography>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blog"
          size="small"
          className="pt-4 pb-4"
        />
        <Button
          variant="outlined"
          size="small"
          sx={{ ml: 2, width: "auto" }}
          onClick={handleClickOpenFirst}
        >
          Suggest activity
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ ml: 2, width: "auto" }}
          onClick={handleClickOpenSecond}
        >
          Real time events
        </Button>
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
      <Dialog
        open={openFirst}
        onClose={handleCloseFirst}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const question = formJson.question;
            if (address && address.city) {
              setFirstLoading(true);
              const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${address.latitude}&lon=${address.longitude}&exclude=minutely&units=metric&appid=117bfe6be263d54afb55f47b46b6daf1`
              );
              firstSubmit(
                address.city,
                question,
                res.data.current.temp,
                res.data.daily[0].weather[0].main
              );
            } else {
              alert("trouble finding your location");
            }
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {"Suggest Activities"}
          <Button
            variant="outlined"
            sx={{ width: "auto" }}
            onClick={() => getLocation()}
          >
            Get location
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Recommend activities based on current weather conditions.
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            placeholder="Search event"
            size="small"
            name="question"
          />
          {locate !== "" && (
            <Typography sx={{ mt: 1, mb: 1 }}>
              Your current location is {locate}
            </Typography>
          )}
          {firstLoading ? (
            <Spinner />
          ) : (
            <Typography sx={{ mt: 1, mb: 1 }}>{first}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFirst} sx={{ width: "auto" }}>
            Cancel
          </Button>
          <Button type="submit" sx={{ width: "auto" }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSecond}
        onClose={handleCloseSecond}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const question = formJson.question;
            secondSubmit(question);
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {"Real time events"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search real-time events / search (current sports events).
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            placeholder="Search event"
            size="small"
            name="question"
          />
          {secondLoading ? (
            <Spinner />
          ) : (
            second &&
            second.length > 0 &&
            second.map((done) => (
              <Typography key={done.title} sx={{ mt: 1, mb: 1 }}>
                <a
                  target="_blank"
                  href={done.link}
                  rel="noreferrer"
                  className="text-black no-underline"
                >
                  {done.title}
                </a>
              </Typography>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSecond} sx={{ width: "auto" }}>
            Cancel
          </Button>
          <Button type="submit" sx={{ width: "auto" }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Blogs;
