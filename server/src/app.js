import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';

export const app = express();
export const port = 3000;

app.set("view engine", "ejs")

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

import {userRouter} from './routes/user.route.js';
import {mediaRouter} from './routes/media.route.js';
import {playlistRouter} from './routes/playlists.route.js';

app.get("/", (req, res)=>{
    res.send("Hello World")
})
app.use('/auth/', userRouter);
app.use('/media', mediaRouter);
app.use('/savedPlaylist', playlistRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
    // throw new Error(404)c
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});