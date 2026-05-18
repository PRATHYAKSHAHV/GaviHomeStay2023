import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Rooms } from "./pages/Rooms";
import { Gallery } from "./pages/Gallery";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Booking } from "./pages/Booking";
import { Posts } from "./pages/Posts";
import { AdminPosts } from "./pages/AdminPosts";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "rooms", Component: Rooms },
      { path: "gallery", Component: Gallery },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "posts", Component: Posts },
      { path: "admin/posts", Component: AdminPosts },
      { path: "booking", Component: Booking },
      { path: "*", Component: NotFound },
    ],
  },
]);
