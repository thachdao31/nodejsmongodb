const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');
const {connectToDb, getDb} = require('./initDB');
const userRoute = require('./Routes/UserRoute')
const userCheckinReportRoute = require('./Routes/UserCheckinReportRoute');

const app = express();

connectToDb((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to DB");
    }
});

app.get('/', async (req, res) => {
    res.send(await getDb().collection('users').find({}).toArray());
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoute);
app.use('/users/checkin', userCheckinReportRoute)

app.listen(3000);