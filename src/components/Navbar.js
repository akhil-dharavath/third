import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { createBlogApi } from "../api/blogs";
import {
  disableUser,
  enableUser,
  getAllUsers,
  getUserApi,
} from "../api/authentication";

const Navbar = ({ sections }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
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
    title: "",
    description: "",
    cover: "",
    authorName: "",
    createdAt: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPost({ ...addPost, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createBlogApi(addPost);
    if (res.data) {
      handleClose();
      const path = addPost.category.toLowerCase();
      navigate(`/${path}`);
    } else {
      alert(res.response.data.message);
    }
  };

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    if (localStorage.getItem("token")) {
      const res = await getUserApi();
      if (res.data) {
        setUser(res.data);
      } else {
        alert(res.response.data.message);
      }
      if (res.data.role === "Administrator") {
        let resp = await getAllUsers();
        if (resp.data) {
          setUsers(resp.data);
        } else {
          alert(resp.response.data.message);
        }
      }
    }
  };

  const fetchUsers = async () => {
    let resp = await getAllUsers();
    if (resp.data) {
      setUsers(resp.data);
    } else {
      alert(resp.response.data.message);
    }
  };

  const handleEnableDisableUser = async (userId, enable) => {
    if (enable) {
      await enableUser(userId);
    } else {
      await disableUser(userId);
    }
    // Refetch users after enabling/disabling user
    fetchUsers();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  return (
    <header
      className="text-gray-600 body-font bg-gray-800"
      style={{ display: !localStorage.getItem("token") && "none" }}
    >
      {localStorage.getItem("token") && (
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
            {user && user.username && user.username.split(" ")[0]}
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item">{user && user.username}</Link>
            </li>
            <li>
              <Link className="dropdown-item">{user && user.email}</Link>
            </li>
            <li>
              <Link className="dropdown-item">{user && user.role}</Link>
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
            {user && user && user.role === "Administrator" && (
              <>
                <li>
                  <Link className="dropdown-item" onClick={() => setShow(true)}>
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
                <MenuItem value="Academic">Academic</MenuItem>
                <MenuItem value="Career">Career</MenuItem>
                <MenuItem value="Campus">Campus</MenuItem>
                <MenuItem value="Culture">Culture</MenuItem>
                <MenuItem value="Local Community">Local Community</MenuItem>
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Health and Wellness">
                  Health and Wellness
                </MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Alumni">Alumni</MenuItem>
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
            {users &&
              users.length > 0 &&
              users
                .filter((user) => user.role !== "Administrator")
                .map((user) => (
                  <Box
                    key={user._id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={user.enable ? true : false}
                          onChange={() =>
                            handleEnableDisableUser(user._id, !user.enable)
                          }
                        />
                      }
                      label={user.username}
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
          </DialogActions>
        </Dialog>
      )}
    </header>
  );
};

export default Navbar;
