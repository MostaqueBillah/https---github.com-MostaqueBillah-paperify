

const express = require("express");
const router = express.Router();

const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const logoutController = require("../controllers/logout");
const isLoggedInController = require("../controllers/isLoggedIn");
const adminloginController = require("../controllers/adminlogin");
const userlistController = require("../controllers/userlist");
const blogController = require("../controllers/blog");
const bloglistController = require("../controllers/bloglist");
const selfbloglistController = require("../controllers/selfbloglist");
const colablistController = require("../controllers/colablist");
const selfcolablistController = require("../controllers/selfcolablist");

router.get("/", isLoggedInController, (req, res) => {
    if (req.user) {
        res.render("paperify", { user: req.user, role: req.role });
    } else if (req.admin) {
        res.render("paperify", { user: req.admin, role: req.role });
    } else {
        res.render("index");
    }
});


router.get("/register", isLoggedInController, (req, res) => {
    if (req.user || req.admin) {
        res.redirect("/");
    } else {
        res.render("register");
    }
});
router.get("/success", isLoggedInController, (req, res) => {
    if (req.user) {
        res.render("success", { user: req.user, role: req.role });
    } else if (req.admin) {
        res.render("success", { user: req.admin, role: req.role });
    } else if (req.counselor) {
        res.render("success", { user: req.counselor, role: req.role });
    } else {
        res.render("index");
    }
});
router.post("/register", registerController);

router.get("/login", isLoggedInController, (req, res) => {
    if (req.user || req.admin) {
        res.redirect("/");
    } else {
        res.render("login");
    }
});

router.post("/login", loginController);

router.get("/adminlogin", isLoggedInController, (req, res) => {
    if (req.user || req.admin) {
        res.redirect("/");
    } else {
        res.render("adminLogin");
    }
});

router.post("/adminlogin", adminloginController);





router.get(
    "/userlist",
    isLoggedInController,
    userlistController.getUserlist,
    (req, res) => {
        if (req.admin) {
            if (req.userlist) {
                res.render("userlist", {
                    user: req.admin,
                    role: req.role,
                    userlist: req.userlist,
                });
            } else {
                res.render("userlist", {
                    user: req.admin,
                    role: req.role,
                    userlist: "",
                });
            }
        } else {
            res.render("index");
        }
    }
);


router.get(
    "/userlist/:uId",
    isLoggedInController,
    userlistController.deleteUser,
    (req, res) => {
        if (req.admin) {
            res.redirect(`/userlist`);
        } else if (req.user) {
            res.redirect("/");
        } else {
            res.render("index");
        }
    }
);


router.get(
    "/bloglist",
    isLoggedInController,
    bloglistController.getBloglist,
    (req, res) => {
        if (req.user) {
            if (req.bloglist) {
                res.render("bloglist", {
                    user: req.user,
                    role: req.role,
                    bloglist: req.bloglist,
                });
            } else {
                res.render("bloglist", {
                    user: req.user,
                    role: req.role,
                    bloglist: "",
                });
            }
        } else if (req.admin) {
            if (req.bloglist) {
                res.render("bloglist", {
                    user: req.admin,
                    role: req.role,
                    bloglist: req.bloglist,
                });
            } else {
                res.render("bloglist", {
                    user: req.admin,
                    role: req.role,
                    bloglist: "",
                });
            }
        } else {
            res.render("index");
        }
    }
);

router.post(
    "/bloglist",
    isLoggedInController,
    bloglistController.createBlog,
    (req, res) => {
        if (req.admin || req.user) {
            res.redirect(`/bloglist`);
        } else {
            res.render("index");
        }
    }
);
router.get(
    "/bloglist/:bId/:uId",
    isLoggedInController,
    bloglistController.deleteBlog,
    (req, res) => {
        if (req.admin || req.user) {
            res.redirect(`/bloglist`);
        } else {
            res.render("index");
        }
    }
);

router.get(
    "/blog/:bId",
    isLoggedInController,
    blogController.getBlog,
    (req, res) => {
        if (req.blog) {
            if (req.user) {
                console.log(req.blog);
                res.render("blog", {
                    user: req.user,
                    role: req.role,
                    blog: req.blog,
                });
            } else if (req.blog && req.admin) {
                res.render("blog", {
                    user: req.admin,
                    role: req.role,
                    blog: req.blog,
                });
            } 
        } else {
            if (req.user) {
                res.render("blog", {
                    user: req.user,
                    role: req.role,
                    blog: "",
                });
            } else if (req.admin) {
                res.render("blog", {
                    user: req.admin,
                    role: req.role,
                    blog: "",
                });
            } 
        }
    }
);

router.get("/logout", logoutController);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get(
    "/selfbloglist",
    isLoggedInController,
    selfbloglistController.getselfbloglist,
    (req, res) => {
        if (req.user) {
            if (req.selfbloglist) {
                res.render("selfbloglist", {
                    user: req.user,
                    role: req.role,
                    selfbloglist: req.selfbloglist,
                });
            } else {
                res.render("selfbloglist", {
                    user: req.user,
                    role: req.role,
                    selfbloglist: "",
                });
            }
        } else if (req.admin) {
            if (req.selfbloglist) {
                res.render("selfbloglist", {
                    user: req.admin,
                    role: req.role,
                    selfbloglist: req.bloglist,
                });
            } else {
                res.render("selfbloglist", {
                    user: req.admin,
                    role: req.role,
                    selfbloglist: "",
                });
            }
        } else {
            res.render("index");
        }
    }
);

router.get(
    "/selfbloglist/:bId/:uId",
    isLoggedInController,
    selfbloglistController.deleteBlog,
    (req, res) => {
        if (req.admin || req.user) {
            res.redirect(`/selfbloglist`);
        } else {
            res.render("index");
        }
    }
);




///////////////////////////////////////////////////////////////////////////////////////
router.get(
    "/colablist",
    isLoggedInController,
    colablistController.getColablist,
    (req, res) => {
        if (req.user) {
            if (req.colablist) {
                res.render("colablist", {
                    user: req.user,
                    role: req.role,
                    colablist: req.colablist,
                });
            } else {
                res.render("colablist", {
                    user: req.user,
                    role: req.role,
                    colablist: "",
                });
            }
        } else if (req.admin) {
            if (req.colablist) {
                res.render("colablist", {
                    user: req.admin,
                    role: req.role,
                    colablist: req.colablist,
                });
            } else {
                res.render("colablist", {
                    user: req.admin,
                    role: req.role,
                    colablist: "",
                });
            }
        } else {
            res.render("index");
        }
    }
);

router.post(
    "/colablist",
    isLoggedInController,
    colablistController.createColab,
    (req, res) => {
        if (req.admin || req.user) {
            res.redirect(`/bloglist`);
        } else {
            res.render("index");
        }
    }
);
router.get(
    "/colablist/:bId/:uId",
    isLoggedInController,
    colablistController.deleteColab,
    (req, res) => {
        if (req.admin || req.user) {
            res.redirect(`/colablist`);
        } else {
            res.render("index");
        }
    }
);
////////////////////////////////////////////////////////////////
router.get(
    "/selfcolablist",
    isLoggedInController,
    selfcolablistController.getselfcolablist,
    (req, res) => {
        if (req.user) {
            if (req.selfcolablist) {
                res.render("selfcolablist", {
                    user: req.user,
                    role: req.role,
                    selfcolablist: req.selfcolablist,
                });
            } else {
                res.render("selfcolablist", {
                    user: req.user,
                    role: req.role,
                    selfcolablist: "",
                });
            }
        } else if (req.admin) {
            if (req.selfcolablist) {
                res.render("selfcolablist", {
                    user: req.admin,
                    role: req.role,
                    selfcolablist: req.colablist,
                });
            } else {
                res.render("selfcolablist", {
                    user: req.admin,
                    role: req.role,
                    selfcolablist: "",
                });
            }
        } else {
            res.render("index");
        }
    }
);

router.get(
    "/selfcolablist/:bId/:uId",
    isLoggedInController,
    selfcolablistController.deleteselfColab,
    (req, res) => {
        if (req.admin || req.user) {
            res.redirect(`/selfcolablist`);
        }  else {
            res.render("index");
        }
    }
);
////////////////////////////////////////////////////////////////
// router.get("/logout", logoutController);
module.exports = router;