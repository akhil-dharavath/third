import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { login } from "../config/login";

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    cover,
    category,
    id,
    likes,
    comments,
  },
  blogs,
  setBlogs,
}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [comment, setComment] = useState("");
  const navigate = useNavigate();
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
    const old = blogs.filter((blo) => blo.id !== okay.id);
    setBlogs([okay, ...old]);
    const subCategory = category.split(" ");
    setComment("");
    navigate(`/${subCategory[0].toLowerCase()}`);
  };

  useEffect(() => {
    navigate("/");
    handleClose();
    // setBlogs(blogs);
    // eslint-disable-next-line
  }, [blogs]);

  return (
    <div className="mx-5">
      <div className="py-8 flex mx-5 flex-wrap md:flex-nowrap">
        <div className="md:w-64 mx-5 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span className="font-semibold title-font text-gray-700">{category}</span>
          <span className="text-sm text-gray-500">{createdAt}</span>
        </div>
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{title}</h2>
          <p className="leading-relaxed">{description}</p>
          <Link to={`/${id}`} className="text-indigo-500 inline-flex items-center mt-4">Learn More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
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
    </div>
    
  );
};

export default BlogItem;
