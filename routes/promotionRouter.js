const express = require('express');
const promotionRouter = express.Router();

const section = 'promotion'

promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send all the ${section}s to you`);
})
.post((req, res) => {
    res.end(`Will add the ${section}: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /${section}`);
})
.delete((req, res) => {
    res.end(`Deleting all ${section}s`);
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the ${section} ${req.params.promotionId} to you`);
})
.post((req, res) => {
    res.end(`Will add the ${section}: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /${section}s`);
})
.delete((req, res) => {
    res.end(`Deleting ${section} ${req.params.promotionId}`);
});

module.exports = promotionRouter;

