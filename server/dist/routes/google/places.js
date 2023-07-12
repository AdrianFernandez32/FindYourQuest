import express from "express";
import axios from "axios";
const googleRoutes = express.Router();
const APIKey = "AIzaSyDftQGUsW_B4O4ewqCW4BGH-zV1loSwkMc";
const getPlaceId = async (city, state) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city + " " + state}&types=(cities)&key=${APIKey}`);
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
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${APIKey}`);
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
const getNearbyCities = async (latitude, longitude) => {
    try {
        const response = await axios.get(`http://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&cities=cities1000&radius=50&maxRows=10&username=adrianfersa`);
        if (response.data.geonames && response.data.geonames.length > 0) {
            const nearbyCities = response.data.geonames.map((city) => ({
                city: city.toponymName,
                state: city.adminName1,
                distance: city.distance,
                googlePlaceId: "",
                googlePlacesPhotoReference: "",
            }));
            console.log("##############NearbyCities###########", nearbyCities);
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
        const updatedCities = [];
        for (const city of cities) {
            const { city: cityName, state, distance } = city;
            try {
                const placeId = await getPlaceId(cityName, state);
                if (placeId) {
                    const photoReference = await getPhotoReference(placeId);
                    const updatedCity = {
                        city: cityName,
                        state,
                        distance,
                        googlePlaceId: placeId,
                        googlePlacesPhotoReference: photoReference,
                    };
                    updatedCities.push(updatedCity);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        res.json({ nearbyCities: updatedCities });
    }
    catch (error) {
        next(error);
    }
});
googleRoutes.get("/api", (req, res) => {
    res.json({ message: "Welcome to the API!" });
});
export default googleRoutes;
//# sourceMappingURL=places.js.map