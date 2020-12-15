const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "";

async function getCoordsForAdress(adress) {
    //Random DUMMY generator
    return {
        lat: 40,
        lng: -73,
    };

    //WITH GOOGLE MAPS
    // axios.get(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //   adress
    // )}&key=${API_KEY}`
    // );

    // const data = response.data;

    // if (!data || data.status === "ZERO_RESULTS") {
    //     const error = new HttpError("Could not find location", 422);
    //     throw error;
    // }

    // const coordinates = data.results[0].geometry.location;

    // return coordinates;
}

module.exports = getCoordsForAdress;