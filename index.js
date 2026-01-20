const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const PORT = 7000;
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Blog = require("./models/blogs");

mongoose.connect('mongodb://localhost:27017/Blogify').then(() => {
    console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));



app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
   res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});



app.use('/user', userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})   