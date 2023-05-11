const Campground = require('../models/campground');
const Review = require('../models/review');
const nodemailer=require('nodemailer')


async function main(campground,review) {
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
    subject:`Your complaint of ${campground['type']} has been updated.`,
    text:`Hello\n\nYour Complaint has been updated.
    \n\nNew complaint status : ${review.body}
    \n\nUpdate by : ${review.user}
    \n\nComplaint Type : ${campground.type},
     \nLocation : ${campground.location},
     \nApplication ID : ${campground._id}
     \n\nYou can check the status by clicking the link given below...
     \nhttps://sanmarg.onrender.com/issues/${campground._id}
     \n\nThank you`,
   // html body
    });
}

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user.username;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    main(campground,review)
    req.flash('success', 'Created new Status!');
    res.redirect(`/issues/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/issues/${id}`);
}
