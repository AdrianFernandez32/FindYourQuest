import React from "react";
import { ICity } from "../../../assets/interfaces/City";
import defaultcity from "../../../assets/images/defaultcity.png";
import { useNavigate } from "react-router";

const NearbyCityCard = (props: { city: ICity }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full shadow-md h-52 rounded-lg flex flex-col justify-center items-center overflow-hidden cursor-pointer duration-200 hover:scale-105"
      onClick={() => navigate(`/city/${props.city.googlePlaceId}`)}
    >
      {props.city.googlePlacesPhotoReference ? (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=${props.city.googlePlacesPhotoReference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          alt={props.city.city}
          className="w-full h-2/3 object-cover"
        />
      ) : (
        <img
          src={defaultcity}
          alt={props.city.city}
          className="w-full h-2/3 object-cover"
        />
      )}

      <div className="w-full h-1/3 flex flex-col p-2">
        <h1 className="text-lg font-bold">
          {props.city.city}, {props.city.state}
        </h1>
        <h4 className="text-md font-medium text-gray-600">
          {props.city.distance.substring(0, 4)} miles away
        </h4>
      </div>
    </div>
  );
};

export default NearbyCityCard;
