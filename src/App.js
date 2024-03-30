import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";

const sections = [
  { title: "Academic", url: "academic" },
  { title: "Career", url: "career" },
  { title: "Campus", url: "campus" },
  { title: "Culture", url: "culture" },
  { title: "Local Community", url: "local" },
  { title: "Social", url: "social" },
  { title: "Sports", url: "sports" },
  { title: "Health", url: "health" },
  { title: "Technology", url: "technology" },
  { title: "Travel", url: "travel" },
  { title: "Alumni", url: "alumni" },
];

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Navbar sections={sections} />
      <Routes>
        <Route
          path="/"
          element={<Blogs search={search} setSearch={setSearch} title="" />}
        />
        <Route
          path="/unsubscribed"
          element={<Blogs search={search} setSearch={setSearch} title="" />}
        />
        {sections.map((section) => (
          <Route
            key={section.url}
            path={`/${section.url}`}
            exact
            element={
              <Blogs
                search={search}
                setSearch={setSearch}
                title={section.title}
              />
            }
          />
        ))}
        <Route path="/:id" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
