import { useParams } from "react-router";
import CityImage from "./components/CityImage";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceCard from "./components/PlaceCard";
import { RiEmotionSadLine } from "react-icons/ri";
import "./CityPage.css";
import Layout from "../../components/Layout";

const CityPage = () => {
  const { id } = useParams<{ id: string }>();
  const [nearbyPlaces, setNearbyPlaces] = useState<any>([]);
  const [type, setType] = useState<string>("restaurants");

  const types = [
    {
      name: "Restaurants",
      type: "restaurants",
    },
    {
      name: "Airports",
      type: "airport",
    },
    {
      name: "Café",
      type: "cafe",
    },
    {
      name: "Hotels",
      type: "lodging",
    },
    {
      name: "Museums",
      type: "museum",
    },
    {
      name: "Parks",
      type: "park",
    },
    {
      name: "Night clubs",
      type: "night_club",
    },
  ];

  const fetchNearbyPlaces = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/establishments?id=${id}&type=${type}`
      );
      setNearbyPlaces(
        response.data.filter(
          (place: any) =>
            place.rating &&
            place.photos &&
            place.business_status === "OPERATIONAL"
        )
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const handleClick = (newType: string) => {
    setType(newType);
  };

  useEffect(() => {
    fetchNearbyPlaces();
  }, [type]);

  return id ? (
    <Layout>
      <CityImage id={id} type="city" />
      <ul className="tabList">
        {types.map((item) => (
          <li
            key={item.type}
            className={`tabItem ${item.type === type ? "tabItemSelected" : ""}`}
            onClick={() => handleClick(item.type)}
          >
            {item.name}
          </li>
        ))}
      </ul>

      {nearbyPlaces.length > 0 ? (
        <div className="nearbyPlacesContainer">
          <h1 className="placesNearYou">Places near you</h1>
          <div className="nearbyPlacesContainer2">
            <div className="nearbyPlacesGrid">
              {nearbyPlaces.map((place: any) => (
                <PlaceCard key={place.place_id} place={place} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="notFoundMessageDiv">
          <RiEmotionSadLine size="4rem" />
          <h1 className="notFoundMessage">
            Sorry, we couldn't find a place like this in this city
          </h1>
        </div>
      )}
    </Layout>
  ) : null;
};

export default CityPage;
