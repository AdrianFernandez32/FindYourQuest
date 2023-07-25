import defaultcity from "../../../assets/images/defaultcity.png";
import "./Components.css";

const PlaceCard = ({ place }: any) => {
  console.log(place);

  const getRatingColor = (rating: number) => {
    if (rating < 3) {
      return "rating-low";
    } else if (rating < 4) {
      return "rating-medium";
    } else {
      return "rating-high";
    }
  };

  return (
    <div
      className="placeContainer"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.place_id}`,
          "_blank"
        )
      }
    >
      {place.photos && place.photos.length > 0 ? (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          alt={place.name}
          className="placeImage"
        />
      ) : (
        <img src={defaultcity} alt={place.name} className="placeImage" />
      )}

      <div className="detailsContainer">
        <h1 className="placeName">{place.name}</h1>
        <p className="placeAddress">{place.vicinity}</p>
      </div>

      <h4 className={`placeRating ${getRatingColor(place.rating)}`}>
        {place.rating}
      </h4>

      <div className="googleMapsLabel">Click to view on Google Maps</div>
    </div>
  );
};

export default PlaceCard;
