const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  admin_name: {
    type: String
  },
  city: {
    type: String
  },
  city_ascii: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  country: {
    type: String
  },
  iso2: {
    type: String
  },
  iso3: {
    type: String
  },
  capital: {
    type: String
  },
  population: {
    type: String
  }
});


let City = mongoose.model("City", citySchema, 'cities');
module.exports = City;
