import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { addCommentApi, openaiCommentApi } from "../api/blogs";
import { getAllUsers } from "../api/authentication";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Badge, Button } from "@mui/material";

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    cover,
    category,
    _id,
    likes,
    comments,
  },
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [users, setUsers] = useState({});
  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    if (res.data) {
      setUsers(res.data);
    } else {
      alert("You are not Authorized");
    }
  };

  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      return;
    }
    const res = await addCommentApi(_id, comment);
    if (res.data) {
      handleClose();
      window.location.reload();
    } else {
      alert(res.response.data.message);
    }
  };

  const generateComment = async () => {
    const res = await openaiCommentApi(title, description);
    if (res.data) {
      setComment(res.data);
    } else {
      alert(res.response.data.message);
    }
  };

  const navigate = useNavigate();
  const handleMoreDetails = () => {
    navigate(`/${_id}`);
  };

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
              {authorName.slice(4, 5).toUpperCase()}
            </Avatar>
          }
          title={authorName}
          subheader={createdAt.slice(0, 10)}
        />
        <CardMedia component="img" height="194" image={cover} alt={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ hyphens: "auto" }}
          >
            {title.length > 50 ? `${title.slice(0, 50)}...` : title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.length > 80
              ? `${description.slice(0, 80)}...`
              : description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Badge badgeContent={likes} color="primary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="comment" onClick={() => handleClickOpen()}>
            <Badge badgeContent={comments.length} color="primary">
              <CommentIcon />
            </Badge>
          </IconButton>
          <Button
            onClick={handleMoreDetails}
            sx={{ marginLeft: "auto" }}
            size="small"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
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
                        {users &&
                        users.length > 0 &&
                        users.filter((user) => user._id === comment.user)
                          .length > 0
                          ? users.filter((user) => user._id === comment.user)[0]
                              .username
                          : "Unknown"}
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
                <div className="d-flex">
                  <Button
                    variant="contained"
                    onClick={() => generateComment()}
                    sx={{ margin: "10px 5px" }}
                  >
                    Auto Generate
                  </Button>
                  <Button
                    variant="outlined"
                    type="submit"
                    sx={{ margin: "10px 5px" }}
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogItem;
