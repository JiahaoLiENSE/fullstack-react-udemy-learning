// express built-in packages
const { v4: uuidv4 } = require('uuid');
const { validationResult} = require('express-validator');
const bcrypt = require('bcryptjs'); // security hash password library
const jwt = require('jsonwebtoken');

// imports
const HttpError = require('../models/http-error');
const User = require('../models/user');

// GET request starts
const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed.', 500);
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Sign up failed.', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('User exists already, please login instead.', 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError('Could not create user, please try again.', 500);
        return next(error);
    }

    const createUser = new User ({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,
        places: []
    });
    // save data
    try {
        await createUser.save();
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again.');
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
          { userId: createUser.id, email: createUser.email },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again later.',
          500
        );
        return next(error);
    }

    res.status(201).json({ userId: createUser.id, email: createUser.email, token: token });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Logging in failed, try again.', 500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError('Invalid credentials, could not log in.', 403);
        return next(error);
    }

    let isValidpassword = false;
    try {
        isValidpassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Invalid credentials, Could not log you in.', 500);
        return next(error);
    }

    if (!isValidpassword) {
        const error = new HttpError('Could not log you in, please check your credentials and try agian.', 403);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
          { userId: existingUser.id, email: existingUser.email },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
    }

    res.json({ 
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;