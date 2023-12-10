const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            // console.log("accessToken", accessToken);
            // console.log("refreshToken", refreshToken);
            // console.log("profile", profile);
            // console.log("done", done);
            done(null, profile);
        }
    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            // console.log("accessToken", accessToken);
            // console.log("refreshToken", refreshToken);
            // console.log("profile", profile);
            // console.log("done", done);
            done(null, profile);
        }
    )
);

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: "/auth/discord/callback",
            scope: scopes
        },
        async function (accessToken, refreshToken, profile, done) {
            // console.log("accessToken", accessToken);
            // console.log("refreshToken", refreshToken);
            // console.log("profile", profile);
            // console.log("done", done);
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});