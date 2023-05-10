const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/issues');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post( upload.array('image'), catchAsync(campgrounds.createCampground))


router.get('/new',  campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put( upload.array('image'),  catchAsync(campgrounds.updateCampground))
    .delete( catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', catchAsync(campgrounds.renderEditForm))



module.exports = router;