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
            author: '645a99faab28f11b24a0f579',
            location: `${cities[i].city}, ${cities[i].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
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