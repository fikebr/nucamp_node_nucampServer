const express = require('express');
const favoriteRouter = express.Router();
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');


const section = 'favorite'

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
    .populate('user')
    .populate('campsites')
    .then(favorites => {
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
        if (favorite) {
            favorite.campsites.concat(req.body)
            req.body.forEach(campsite => {
                if (!favorite.campsites.includes(campsite)) {
                    favorite.campsites.push(campsite);
                }
            });
            favorite.save()
            .then(favorite => {
                console.log(`${section} posted: `, favorite);
                res.json(favorite);
            })
        } else {
            Favorite.create({'user': req.user._id, 'campsites': [...req.body]})
            .then(favorite => {
                console.log(`${section} posted: `, favorite);
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /${section}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id })
    .then(favorite => {
        if (favorite) {
            console.log(`${section} deleted: `, favorite);
            res.json(favorite);
        } else {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'text/plain');
            res.end('You do not have any favorites to delete.');
        }
    })
    .catch(err => next(err));
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`get operation not supported on /${section}s/${req.params.campsiteId}`);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user:req.user._id})
    .then(favorite => {
        if (favorite) {
            if (favorite.campsites.includes(req.params.campsiteId)) {
                res.setHeader('Content-Type', 'text/plain');
                res.end("That campsite is already in the list of favorites!");
            } else {
                // ad the favorite to the array and save
                favorite.campsites.push(req.params.campsiteId);
                favorite.save()
                .then(favorite => {
                    console.log(`${section} posted: `, favorite);
                    res.json(favorite);
                })
                .catch(err => next(err));
            }
        } else {
            Favorite.create({'user': req.user._id, 'campsites': [req.params.campsiteId]})
            .then(favorite => {
                console.log(`${section} posted: `, favorite);
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`put operation not supported on /${section}s/${req.params.campsiteId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
        if (favorite) {
            if (favorite.campsites.includes(req.params.campsiteId)) {
                favorite.campsites = favorite.campsites.filter(id => {id !== req.params.campsiteId})
            }
            favorite.save()
            .then(favorite => {
                console.log(`${section} posted: `, favorite);
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end("This user has no favorites to delete");
        }
    })
    .catch(err => next(err));
});

module.exports = favoriteRouter;

