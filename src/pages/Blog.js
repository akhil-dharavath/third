import React, { useEffect, useState } from "react";
import { blogs as blogsList } from "../config/blogs";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Link } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { login } from "../config/login";

const Blog = ({ blogsList: blogs, setBlogs }) => {
  const location = useLocation().pathname.slice(1);
  const blog = blogsList.filter(
    (blog) => blog.id.toString() === location.toString()
  )[0];
  let description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    cover,
    category,
    id,
    likes,
    comments;
  if (blog) {
    description = blog.description;
    title = blog.title;
    createdAt = blog.createdAt;
    authorName = blog.authorName;
    authorAvatar = blog.authorAvatar;
    cover = blog.cover;
    category = blog.category;
    id = blog.id;
    likes = blog.likes;
    comments = blog.comments;
  }

  const navigate = useNavigate();
  const handleDelete = () => {
    setBlogs(blogs.filter((blo) => blo.id !== blog.id));
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      navigate("/login");
    }
  }, [navigate]);

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment === "") {
      return;
    }
    const okay = {
      description,
      title,
      createdAt,
      authorName,
      authorAvatar,
      cover,
      category,
      id,
      likes,
      comments: [
        ...comments,
        { user: Number(localStorage.getItem("userid")), comment },
      ],
    };
    const old = blogsList.filter((blo) => blo.id !== okay.id);
    setBlogs([okay, ...old]);
    const subCategory = category.split(" ");
    setComment("");
    navigate(`/${subCategory[0].toLowerCase()}`);
  };
  console.log(category);

  useEffect(() => {
    // navigate("/");
    handleClose();
    // setBlogs(blogs);
    // eslint-disable-next-line
  }, [blogs]);

  return (
    <>
      <section className="text-gray-600 body-font">
        <span
          className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest"
          style={{ marginTop: 30, marginLeft: 100 }}
        >
          {blog ? blog.category : ""}
        </span>
        {localStorage.getItem("role") === "Moderator" && (
          <Button
            color="error"
            variant="outlined"
            style={{
              marginTop: -30,
              marginLeft: "auto",
              marginRight: 100,
              display: "block",
            }}
            onClick={() => handleDelete()}
          >
            Delete Post
          </Button>
        )}
        <div className="container mx-auto flex px-5 pt-12 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={blog ? blog.cover : ""}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {blog ? blog.title : ""}
            </h1>
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
          className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-0 w-full"
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
            onClick={() => handleClickOpen()}
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
        <Link href="/" className="inline-flex items-center mx-5 mb-5">
          <img
            alt="blog"
            src="https://dummyimage.com/104x104"
            className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
          />
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium text-gray-900">
              {blog ? blog.authorName : ""}
            </span>
            <span className="text-gray-400 text-xs tracking-widest mt-0.5">
              {blog ? blog.createdAt : ""}
            </span>
          </span>
        </Link>
      </section>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title">Comments</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="comments">
              {comments.length > 0 &&
                comments.map((comment, index) => (
                  // <div key={index}>{comment.user} {comment.comment}</div>
                  <div key={index} className="d-flex">
                    <img
                      src={require("../assets/author.jpg")}
                      alt="author"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        marginRight: 10,
                        marginBottom: 10,
                      }}
                    />
                    <div className="text-black">
                      <b>
                        {login.length > 0 &&
                          login.filter((user) => user.id === comment.user)[0]
                            .name}
                      </b>
                      <br />
                      {comment.comment}
                    </div>
                  </div>
                ))}
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  width: "100%",
                  position: "relative",
                }}
              >
                <textarea
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="comment-input"
                  rows={4}
                />
                <button className="btn btn-primary my-2 w-auto" type="submit">
                  Post
                </button>
              </form>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Blog;
