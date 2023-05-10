require('dotenv').config();

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: 'KartikGupta@gamil.com',
            title: `${ cities[i].name} ${ cities[i].state} Potholes`,
            type: 'Potholes',
            location: `${ cities[i].name} ${ cities[i].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[i].lon,
                    cities[i].lat,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbuho0uxm/image/upload/v1683659547/YelpCamp/dbjub8xmhvmj66zm8nzs.jpg',
                    filename: 'YelpCamp/dbjub8xmhvmj66zm8nzs'
                },
                {
                    url: 'https://res.cloudinary.com/dbuho0uxm/image/upload/v1683659518/YelpCamp/jvbxt5qp3nlx3ujypaxn.jpg',
                    filename: 'YelpCamp/jvbxt5qp3nlx3ujypaxn'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})