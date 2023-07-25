import express from "express";
import axios from "axios";
const googleRoutes = express.Router();
const getPlaceId = async (city, state) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city + " " + state}&types=(cities)&key=${process.env.GOOGLE_API_KEY}`);
        if (response.data.predictions.length > 0) {
            return response.data.predictions[0].place_id;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error(error);
    }
};
const getPhotoReference = async (placeId) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${process.env.GOOGLE_API_KEY}`);
        if (response.data.result.photos.length > 0) {
            return response.data.result.photos[0].photo_reference;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error(error);
    }
};
const getCityInformation = async (placeId) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number&key=${process.env.GOOGLE_API_KEY}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return { error: error.message };
    }
};
const getNearbyCities = async (latitude, longitude) => {
    try {
        const response = await axios.get(`http://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&cities=cities1000&radius=50&maxRows=10&username=${process.env.GEONAMES_USERNAME}`);
        if (response.data.geonames && response.data.geonames.length > 0) {
            const nearbyCities = response.data.geonames.map((city) => ({
                city: city.toponymName,
                state: city.adminName1,
                distance: city.distance,
                googlePlaceId: "",
                googlePlacesPhotoReference: "",
            }));
            return nearbyCities;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.error(error);
        return [];
    }
};
<<<<<<< HEAD
const getSuggestions = async (text) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=(cities)&key=${process.env.GOOGLE_API_KEY}`);
        return response.data.predictions;
=======
const getCityCoordinates = async (placeId) => {
    console.log(placeId);
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${process.env.GOOGLE_API_KEY}`);
        return response.data.result.geometry.location;
>>>>>>> main
    }
    catch (error) {
        console.error(error);
    }
};
<<<<<<< HEAD
=======
const getEstablishments = async (placeId, type) => {
    try {
        const { lat, lng } = await getCityCoordinates(placeId);
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=${type}&key=${process.env.GOOGLE_API_KEY}`);
        return response.data.results;
    }
    catch (error) {
        console.error(error);
    }
};
googleRoutes.get("/establishments", async (req, res, next) => {
    const { id, type } = req.query;
    try {
        const nearbyPlaces = await getEstablishments(id, type);
        res.json(nearbyPlaces);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
googleRoutes.get("/cityImage", async (req, res, next) => {
    const { id } = req.query;
    try {
        const photoReference = await getPhotoReference(id);
        res.json({ photoReference });
    }
    catch (error) {
        next(error);
    }
});
googleRoutes.get("/cityDetails", async (req, res, next) => {
    const { id } = req.query;
    try {
        const cityInfo = await getCityInformation(id);
        res.json(cityInfo);
    }
    catch (error) {
        next(error);
    }
});
>>>>>>> main
googleRoutes.get("/cityInfo", async (req, res, next) => {
    const { city, state } = req.query;
    try {
        const placeId = await getPlaceId(city, state);
        if (placeId) {
            const photoReference = await getPhotoReference(placeId);
            res.json({ photoReference });
        }
        else {
            res.status(404).json({ error: "No place found" });
        }
    }
    catch (error) {
        next(error);
    }
});
googleRoutes.get("/nearbyCities", async (req, res, next) => {
    const { latitude, longitude } = req.query;
    try {
        const cities = await getNearbyCities(latitude, longitude);
        const updatedCities = await Promise.all(cities.map(async (city) => {
            const { city: cityName, state, distance } = city;
            try {
                const placeId = await getPlaceId(cityName, state);
                if (placeId) {
                    const photoReference = await getPhotoReference(placeId);
                    return {
                        city: cityName,
                        state,
                        distance,
                        googlePlaceId: placeId,
                        googlePlacesPhotoReference: photoReference,
                    };
                }
            }
            catch (error) {
                console.error(error);
            }
        }));
        const filteredCities = updatedCities.filter((city) => city !== undefined);
        res.json({ nearbyCities: filteredCities });
    }
    catch (error) {
        next(error);
    }
});
googleRoutes.get("/suggestedCities", async (req, res) => {
    const { input } = req.query;
    try {
        const suggestions = await getSuggestions(input);
        return res.json(suggestions);
    }
    catch (error) {
        return res.status(500).json({
            message: "Error",
            error: error.message,
        });
    }
});
googleRoutes.get("/api", (req, res) => {
    res.json({ message: "Welcome to the API!" });
});
export default googleRoutes;
//# sourceMappingURL=places.routes.js.map