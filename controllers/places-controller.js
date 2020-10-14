// express built-in packages
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
// imports
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');

// GET request starts
const getPlaceById = async (req, res, next) => {
    const placesId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placesId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not fina a place.', 500);
        return next(error);
    }

    if(!place) {
        const error = new HttpError("Could not find a place for the provided id.", 404);
        return next(error);
    }

    // formalize id format, produce a string
    res.json({ place: place.toObject( { getters: true }) });  // => { place } => { place: place }
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid; // { uid: 'u1' }

    // let places;
    let userWithPlaces;
    try {
        /*
            Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). 
            We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query.
        */
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        const error = new HttpError('Fetching places failed, please try agian.');
        return next(error);
    }
    
    // if (!places || places.length === 0) {
    if(!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(new HttpError("Could not find places for the provided user id.", 404));
    }
    // using map porperty because this will return an array and map all single objects
    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });  // => { place } => { place: place }
};
// end of GET request

// POST request starts
const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }
    const createPlace = new Place({
        //id: uuidv4(), // random id.
        title,
        description,
        location: coordinates,
        image: req.file.path,
        address,
        creator: req.userData.userId
    });

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError('Creating place failed, please try again.');
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.');
        return next(error);
    }

    try {
        // Transactions let you execute multiple operations in isolation and potentially undo all the operations if one of them fails
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createPlace.save({ session: sess });
        user.places.push(createPlace);
        await user.save({ session: sess });
        // Once the transaction is committed, the write operation becomes visible outside of the transaction.
        await sess.commitTransaction();
    } catch (err){
        const error = new HttpError('Creating place failed, try again!', 500);
        return next(error);
    }

    res.status(201).json({place: createPlace});
};

// PATCH request starts
const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update place.', 500);
        return next(error);
    }

    if (place.creator.toString() !== req.userData.userId) {
        const error = new HttpError('You are not allowed to edit this place.', 401);
        return next(error);
    }
    // // extract and make a copy of DUMMY_PLACES instead updating directly on original array
    // const updatePlace = { ...DUMMY_PLACES.find(p => {
    //     return p.id = placeId;
    // }) };
    // // find the copy of DUMMY_PLACES info
    // const placeIndex = DUMMY_PLACES.findIndex(p => {
    //     return p.id = placeId;
    // });
    place.title = title;
    place.description = description;

    try {
        // store data
        await place.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update place.', 500);
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });

};
// PATCH request ends

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    
    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find place for this id.', 404);
        return next(error);
    }

    if (place.creator.id !== req.userData.userId) {
        const error = new HttpError('You are not allowed to edit this place.', 401);
        return next(error);
    }

    const imagePath = place.image; // fetch image string from database.

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    fs.unlink(imagePath, err => {
        console.log(err);
    });
    
    res.status(200).json({ message: 'Deleted place.'});
};
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;