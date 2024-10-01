const moment = require('moment');
const mongoose  = require('mongoose');

const uri = 'mongodb+srv://anjaneyullu:8sz7REzr1AMxDtNt@rentbike.tdqmjpe.mongodb.net/?retryWrites=true&w=majority&appName=RentBike';

const db = mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = db;