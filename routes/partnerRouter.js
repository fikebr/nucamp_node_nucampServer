const express = require('express');
const partnerRouter = express.Router();

const section = 'partner'

partnerRouter.route('/')
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

partnerRouter.route('/:partnerId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the ${section} ${req.params.partnerId} to you`);
})
.post((req, res) => {
    res.end(`Will add the ${section}: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /${section}s`);
})
.delete((req, res) => {
    res.end(`Deleting ${section} ${req.params.partnerId}`);
});

module.exports = partnerRouter;

