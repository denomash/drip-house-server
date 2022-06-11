import mongoose from 'mongoose';

const DriverSchema = new mongoose.Schema({
    _id: String,
    name: String,
    phone: String,
    car_make: String,
    car_identity: String
});

const Driver = mongoose.model('Driver', DriverSchema, 'drivers');

export default Driver;