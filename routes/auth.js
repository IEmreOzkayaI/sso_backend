const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3001/";

router.get("/login/success", (req, res) => {
	const date = new Date();
	const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
	console.log(`[${time}]`, "ekrana sonucu yazdırıldı");
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
	// console.log(req);
	res.status(401).json({
		success: false,
		message: "failure",
	});
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(CLIENT_URL + "login");
});

const timer = (req , res , next) => {
	const date = new Date();
	const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
	console.log(`[${time}]`, "input time");
	next();
};

router.get("/google", passport.authenticate("google", {scope: ["profile"]}), (req, res) => {
	// display time in ss:mm:hh format
});

router.get(
	"/google/callback",timer,
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	}),
);

router.get("/github", passport.authenticate("github", {scope: ["profile"]}));

router.get(
	"/github/callback",timer,
	passport.authenticate("github", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);



router.get("/discord", passport.authenticate("discord"), (req, res) => {
	res.redirect("discord/callback");
});

router.get(
	"/discord/callback",timer,
	passport.authenticate(
		"discord",
		{
			successRedirect: CLIENT_URL,
			failureRedirect: "/login/failed",
		},
	)
);

module.exports = router;
