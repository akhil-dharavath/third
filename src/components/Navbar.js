import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { login } from "../config/login";

const Navbar = ({ sections, blogs, setBlogs, setDisabledAccts }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddPost({
      id: Math.floor(Math.random() * 1000000),
      title: "",
      description: "",
      cover: "",
      authorName: "",
      createdAt: "",
      category: "",
      authorAvatar: require("../assets/author.jpg"),
      likes: 0,
      comments: [],
    });
  };

  const [addPost, setAddPost] = useState({
    id: Math.floor(Math.random() * 1000000),
    title: "",
    description: "",
    cover: "",
    authorName: "",
    createdAt: "",
    category: "",
    authorAvatar: require("../assets/author.jpg"),
    likes: 0,
    comments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPost({ ...addPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlogs([...blogs, addPost]);
    setAddPost({
      id: Math.floor(Math.random() * 1000000),
      title: "",
      description: "",
      cover: "",
      authorName: "",
      createdAt: "Academic",
      category: "",
      authorAvatar: require("../assets/author.jpg"),
      likes: 0,
      comments: [],
    });
    handleClose();
    const path = addPost.category.toLowerCase();
    navigate(`/${path}`);
  };

  const [selectedSwitches, setSelectedSwitches] = useState([]);

  // Function to toggle the selected state of a switch
  const handleSwitchToggle = (id) => {
    setSelectedSwitches((prevSelectedSwitches) => {
      if (prevSelectedSwitches.includes(id)) {
        return prevSelectedSwitches.filter((switchId) => switchId !== id);
      } else {
        return [...prevSelectedSwitches, id];
      }
    });
  };

  const handleUpdate = () => {
    setShow(false);
    localStorage.setItem("selectedIds", selectedSwitches);
    setDisabledAccts(selectedSwitches);
  };

  const selectedIds = localStorage.getItem("selectedIds");
  const ids = selectedIds ? selectedIds.split(",") : [];

  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
    navigate("/login");
    location.reload();
  };

  return (
    <header
      className="text-gray-600 body-font bg-gray-800"
      style={{ display: !localStorage.getItem("name") && "none" }}
    >
      {localStorage.getItem("name") && (
        <div className="mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <Link
            to={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-0 md:mb-0"
          >
            <span className="ml-3 text-xl">Blogs</span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            {sections.map((section) => (
              <Link
                key={section.url}
                to={`/${section.url}`}
                className="mr-5 hover:text-gray-900"
              >
                {section.title}
              </Link>
            ))}
          </nav>
          <a
            className="nav-link dropdown-toggle"
            href="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {localStorage.getItem("name").split(" ")[0]}
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item">
                {localStorage.getItem("name")}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item">
                {localStorage.getItem("email")}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item">
                {localStorage.getItem("role")}
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" onClick={handleClickOpen}>
                Add Post
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            {localStorage.getItem("role") &&
              localStorage.getItem("role") === "Administrator" && (
                <>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => setShow(true)}
                    >
                      Manage Login Accounts
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </>
              )}
            <li>
              <Link
                className="dropdown-item"
                style={{ color: "red" }}
                onClick={() => handleLogout()}
              >
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Add a Blog"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              className={"my-2"}
              fullWidth
              label="Title"
              variant="outlined"
              value={addPost.title}
              name="title"
              onChange={(e) => handleChange(e)}
              required
              size="small"
            />
            <TextField
              className={"my-2"}
              fullWidth
              label="Description"
              variant="outlined"
              value={addPost.description}
              name="description"
              onChange={(e) => handleChange(e)}
              required
              size="small"
            />
            <TextField
              className={"my-2"}
              fullWidth
              // label="Date Published"
              variant="outlined"
              value={addPost.createdAt}
              name="createdAt"
              onChange={(e) => handleChange(e)}
              required
              type="date"
            />
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                name="category"
                value={addPost.category}
                onChange={(e) => handleChange(e)}
                size="small"
              >
                <MenuItem value="Career">Career</MenuItem>
                <MenuItem value="Culture">Culture</MenuItem>
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Health and Wellness">
                  Health and Wellness
                </MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className={"my-2"}
              fullWidth
              label="Author Name"
              variant="outlined"
              value={addPost.authorName}
              name="authorName"
              onChange={(e) => handleChange(e)}
              required
              size="small"
            />
            <TextField
              className={"my-2"}
              fullWidth
              label="Image link (https)"
              variant="outlined"
              value={addPost.cover}
              name="cover"
              onChange={(e) => handleChange(e)}
              required
              size="small"
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" sx={{ width: "auto" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button color="success" sx={{ width: "auto" }} type="submit">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {show && (
        <Dialog open={show} onClose={() => setShow(false)} fullWidth>
          <DialogTitle>Manage Login Accounts</DialogTitle>
          <DialogContent>
            {login &&
              login.length > 0 &&
              login
                .filter((user) => user.role !== "Administrator")
                .map((user) => (
                  <Box
                    key={user.id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>{user.name}</Typography>
                    <Checkbox
                      defaultChecked={
                        ids.length > 0 &&
                        ids.filter((acct) => acct === user.id.toString())
                          .length > 0
                          ? false
                          : true
                      }
                      onChange={() => handleSwitchToggle(user.id)}
                    />
                  </Box>
                ))}
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              sx={{ width: "auto" }}
              onClick={() => setShow(false)}
            >
              Close
            </Button>
            <Button sx={{ width: "auto" }} onClick={() => handleUpdate()}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </header>
  );
};

export default Navbar;
