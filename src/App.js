import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import { blogs } from "./config/blogs";
import { useState } from "react";
import Blog from "./pages/Blog";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const sections = [
  { title: "Academic", url: "academic" },
  { title: "Career", url: "career" },
  { title: "Campus", url: "campus" },
  { title: "Culture", url: "culture" },
  { title: "Local Community", url: "local" },
  { title: "Social", url: "social" },
  { title: "Sports", url: "sports" },
  { title: "Health and Wellness", url: "health" },
  { title: "Technology", url: "technology" },
  { title: "Travel", url: "travel" },
  { title: "Alumni", url: "alumni" },
];

function App() {
  const [blogsList, setBlogsList] = useState(blogs);
  const [disabledAccts, setDisabledAccts] = useState([]);

  return (
    <BrowserRouter>
      <Navbar
        sections={sections}
        blogs={blogsList}
        setBlogs={setBlogsList}
        setDisabledAccts={setDisabledAccts}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Blogs title="" blogsList={blogsList} setBlogsList={setBlogsList} />
          }
        />
        <Route
          path="/academic"
          element={
            <Blogs
              title="Academic"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/career"
          element={
            <Blogs
              title="Career"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/campus"
          element={
            <Blogs
              title="Campus"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />

        <Route
          path="/culture"
          element={
            <Blogs
              title="Culture"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/local"
          element={
            <Blogs
              title="Local Community"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/social"
          element={
            <Blogs
              title="Social"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/sports"
          element={
            <Blogs
              title="Sports"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/health"
          element={
            <Blogs
              title="Health and Wellness"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/technology"
          element={
            <Blogs
              title="Technology"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/travel"
          element={
            <Blogs
              title="Travel"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/alumni"
          element={
            <Blogs
              title="Alumni"
              blogsList={blogsList}
              setBlogsList={setBlogsList}
            />
          }
        />
        <Route
          path="/:id"
          element={<Blog blogs={blogsList} setBlogs={setBlogsList} />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/login"
          element={<Login disabledAccts={disabledAccts} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
