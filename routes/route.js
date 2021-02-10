const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const authToken = require("../middlewares/auth");
const makeAdmin = require("../middlewares/isAdmin");

//REGISTRATION AND AUTH

router.get("/users", auth.getSingUp);
router.get("/auth", auth.getLogIn);
router.post("/users", auth.postSignUp);
router.post("/auth", auth.postLogin);
router.put("/users", authToken.verifyToken, auth.editPorfil);
//for Admin
router.get("/users", authToken.verifyToken, auth.isAdmin, auth.getAllUsers);

//POST ACCTION FOR ADMIN AND USER
//for users
router.get("/posts", auth.getAllPosts);
router.get("/posts/:post_Id", auth.getOnePost);
router.get(" /search", auth.findPostBySearch);
router.post("/postcategory", auth.getAllPostsByCategory);
// router.get("/posts", auth.readMore);

//For Admin
router.get(
  "/posts/all",
  authToken.verifyToken,
  auth.isAdmin,
  auth.getAllPosts2
);
router.post("/posts", authToken.verifyToken, auth.isAdmin, auth.postPosts);
router.put("/:post_Id", authToken.verifyToken, auth.isAdmin, auth.editPost);
router.delete(
  "/:post_Id",
  authToken.verifyToken,
  auth.isAdmin,
  auth.deletePost
);

//COMMENT FOR AUTHENTICATED USERS
router.get("/comment/:post_Id", auth.getAllCommentByPost);
router.post("/comment/:post_Id", authToken.verifyToken, auth.postComments);

//For admin
router.delete(
  "comments/:comment_Id",
  authToken.verifyToken,
  auth.isAdmin,
  auth.deleteComment
);

//CATEGORIES
router.post(
  "/categories",
  auth.isAdmin,
  authToken.verifyToken,
  auth.postCategory
);

//VERIFICATION OF USERS TO HAVE SOME ACCESS
router.post("/users/verification", authToken.verifyToken, auth.isVerified);

//make Admin for superAdmin
router.post(
  "/:user_Id",
  auth.isAdmin,
  authToken.verifyToken,
  makeAdmin.isSuperAdmin
);

module.exports = router;
