const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3001/";

router.get("/login/success", (req, res) => {
    console.log(req)
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    }
});
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL + "login");
});

router.get("/google", passport.authenticate("google", {scope: ["profile"]}));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/github", passport.authenticate("github", {scope: ["profile"]}));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/twitter", passport.authenticate("twitter", {scope: ["profile"]}));

router.get(
    "/github/callback",
    passport.authenticate("twitter", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/discord", passport.authenticate("discord"), (req, res) => {
    res.redirect("discord/callback")
});

router.get(
    "/discord/callback",
    passport.authenticate("discord", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/linkedin", passport.authenticate("linkedin"));

router.get(
    "/linkedin/callback",
    passport.authenticate("linkedin", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/reddit", passport.authenticate("reddit"));

router.get(
    "/reddit/callback",
    passport.authenticate("reddit", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = router