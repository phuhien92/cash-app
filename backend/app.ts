import express from 'express';
import path from 'path';
import logger from "morgan";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";

import auth from "./auth";
import testapi from "./testapi";

require("dotenv").config();

const corsOption = {
    origin: `http://localhost:8888`,
    credentials: true,
};

const app = express();
app.use(cors(corsOption));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
        secret: "session secret",
        resave: false,
        saveUninitialized: false,
        unset: "destroy"
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(auth);
app.use(testapi)

app.use(express.static(path.join(__dirname,"../public")));
app.listen(8889);