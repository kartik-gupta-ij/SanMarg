const Campground = require('../models/campground');
// const data=require("./utils/templates.js")
const data=require('../utils/templates')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");
const nodemailer=require('nodemailer')


async function main(campground) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service:"gmail",
      host: "smtp.gmail.com",
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sid.mishra190601@gmail.com",
        // user:`${process.env.NODEMAILER_EMAIL}`, // generated ethereal user
        pass: "somviedqzrgdgyyh", // generated ethereal password
        // pass: `${process.env.NODEMAILER_KEY}`
      },  
    });
  
    // send mail with defined transport object
  
  
    let info = await transporter.sendMail({

    from:'sid.mishra190601@gmail.com',
    to:`hrkkrh01@gmail.com`,
    cc:`${campground['author']}`,
    subject:`${campground['type']}`,
    text:`Your Complaint has been received.\n\nComplaint:${campground.type}, \n\n Location:${campground.location}`,
   // html body
    });
}


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({}).populate('popupText');
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {

    req.body.campground.title= ` [ ${req.body.campground.type} ] ${req.body.campground.location} `
    const campground = new Campground(req.body.campground);
    if(req.body.campground.latitude || req.body.campground.longitude){
        campground.geometry.coordinates[0]=req.body.campground.longitude
        campground.geometry.coordinates[1]=req.body.campground.latitude
        campground.geometry.type="Point"
    }
    else{
        const geoData = await geocoder.forwardGeocode({
            query: req.body.campground.location,
            limit: 1
        }).send()
        campground.geometry = geoData.body.features[0].geometry
    }
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await campground.save();
    main(campground).catch(console.error);
    req.flash('success', 'Thank you for your submission!. Your request has been recieved and will be forwarded to respective corporation as soon as possible');
    res.redirect(`/issues/${campground._id}`)
}

module.exports.showCampground = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews'
    })
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/issues');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/issues');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/issues/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/issues');
}