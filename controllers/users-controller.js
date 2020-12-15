const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password");
    } catch (err) {
        const error = new HttpError("Fetching users failed", 500);
        return next(error);
    }

    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const singup = async(req, res, next) => {
    const errors = validationResult(req);
    const { name, email, password } = req.body;

    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid information, please check data", 422));
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError("Signing up failed", 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError("User already exists", 422);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png",
        password,
        places: [],
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError("Signing up failed", 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async(req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError("Loging in failed", 500);
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError("Invalid credentials", 401);
        return next(error);
    }

    res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.singup = singup;
exports.login = login;