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
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service:"gmail",
      host: "smtp.gmail.com",
      secure: false, // true for 465, false for other ports
      auth: {
        // user: "sid.mishra190601@gmail.com",
        user:`${process.env.NODEMAILER_EMAIL}`, // generated ethereal user
        // pass: "somviedqzrgdgyyh", // generated ethereal password
        pass: `${process.env.NODEMAILER_KEY}`
      },  
    });
  
    // send mail with defined transport object
  
  
    let info = await transporter.sendMail({
    //   from: 'sid.mishra190601@gmail.com', // sender address
    //   to: `${data[selectedCategory-1]["email"]}`, // list of receivers
    //   cc:`${cc_mail}`,
    //   subject: `${data[selectedCategory-1]["subject"]}`, // Subject line
    //   text: `${data[selectedCategory-1]["body"]}\n\n Location \n${locationString}`, // plain text body
    //   attachments:[{
    //     filename:`${fileName}`,
    //     path:`./uploads/${fileName}`
    //   }],

    from:'sid.mishra190601@gmail.com',
    to:`${data[0]['mail']}`,
    cc:`${campground.author}`,
    subject:'This is test case',
    text:'Test content',
   // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({}).populate('popupText');
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    req.body.campground.title= `${req.body.campground.location} ${req.body.campground.type}`
    console.log(req.body, req.files);
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await campground.save();
    console.log(campground.author);
    main(campground).catch(console.error);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/issues/${campground._id}`)
}

module.exports.showCampground = async (req, res,) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/issues');
    }
    console.log("aaaaaa",(campground));
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