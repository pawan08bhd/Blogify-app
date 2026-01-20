const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blogs");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },


  filename: function (req, file, cb) {
     const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });


router.get("/add-blog", (req, res) => {
  res.render("addBlog", { user: req.user });
});


router.get("/:Id", async (req, res) => {
   const blog = await Blog.findById(req.params.Id).populate("createdBy");
   const comments = await Comment.find({ blog: req.params.Id }).populate("createdBy");
   return res.render("blog", { blog, user: req.user, comments });
  });

  router.post("/comment/:blogId", async (req, res) => {
    const { comment } = req.body;
    await Comment.create({
      content: comment,
      blog: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  });
  

router.post("/", upload.single('coverImage'),async (req, res) => {
    const { title, body } = req.body;
  const blog= await Blog.create({
    title,
    body,
    coverImageURL:`/uploads/${req.file.filename}` ,
    createdBy: req.user._id,
   });
 return res.redirect(`/blog/${blog._id}`);
});



module.exports = router;