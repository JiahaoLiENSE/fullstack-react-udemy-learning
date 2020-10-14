// express built-in packages
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// imports
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

// bulit-in express middleware, static serving method just return a file but does not execute.
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
//serve public folder first when entering app
app.use(express.static(path.join('public')));

// deal with cros error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

// register middlewares
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// response back to index from public folder to deal with unknown route
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route.', 404);
//     throw error; // throw: use here as assynchourous (use next() when it is synchourous)
// });

// register error handling middlewares
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    // no header has been sent
    res.status(error.code || 500);
    res.json({message: error.message || "An known error occurred!"});
});

// process is global variable
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nermj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => { 
        console.log(err); 
    });
