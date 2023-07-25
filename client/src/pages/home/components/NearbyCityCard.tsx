import React, { useState } from "react";
import { ICity } from "../../../assets/interfaces/City";
import defaultcity from "../../../assets/images/defaultcity.png";
import { useNavigate } from "react-router";

const NearbyCityCard = (props: { city: ICity }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const hoverIn = () => {
    setHovered(true);
  };

  const hoverOut = () => {
    setHovered(false);
  };

  const image = props.city.googlePlacesPhotoReference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=${props.city.googlePlacesPhotoReference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    : defaultcity;

  const iframe = `https://maps.google.com/maps?q=${props.city.city},${props.city.state}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className="w-full shadow-md h-52 rounded-lg flex flex-col justify-center items-center overflow-hidden cursor-pointer duration-200 hover:scale-105"
      onClick={() => navigate(`/city/${props.city.googlePlaceId}`)}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {hovered ? (
        <iframe
          src={iframe}
          style={{ width: "100%", height: "2/3" }}
          title="City Map"
          loading="lazy"
        />
      ) : (
        <img
          src={image}
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
