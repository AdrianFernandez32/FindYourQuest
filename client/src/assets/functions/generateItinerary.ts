import axios from "axios";
import { createEventId } from "../../pages/planYourTrip/components/calendar/event-utils";
import { formattedDateCalendar } from "./FormatDate";

const longActivities = new Set([
  "museum",
  "stadium",
  "zoo",
  "amusement_park",
  "campground",
]);
const midActivities = new Set([
  "art_gallery",
  "aquarium",
  "shopping_mall",
  "tourist_attraction",
  "church",
]);
const shortActivities = new Set(["movie_theater"]);

const activities = [
  "movie_theater",
  "art_gallery",
  "aquarium",
  "shopping_mall",
  "tourist_attraction",
  "church",
  "museum",
  "park",
  "stadium",
  "zoo",
  "amusement_park",
  "campground",
];

var visitedPlacesSet = new Set();

const getPlaceToVisit = async (id: string, type: string) => {
  let isVisited = true;
  let attemptedTypes = new Set();
  while (isVisited) {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/establishments?id=${id}&type=${type}`
      );

      for (const place of response.data) {
        if (!visitedPlacesSet.has(place.place_id)) {
          visitedPlacesSet.add(place.place_id);
          return { place_id: place.place_id, name: place.name };
        }
      }
      if (type === "restaurant") {
        if (response.data.length > 0) {
          const place =
            response.data[Math.floor(Math.random() * response.data.length)];
          return { place_id: place.place_id, name: place.name };
        } else {
          return null;
        }
      } else {
        let typeIndex = Math.floor(Math.random() * activities.length);
        type = activities[typeIndex];
        attemptedTypes.add(type);
        if (attemptedTypes.size >= activities.length) {
          return null;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const activityByHour = (hour: number) => {
  if (hour >= 0 && hour < 10) {
    return null;
  } else if (hour >= 10 && hour < 12) {
    return "restaurants";
  } else {
    return activities[Math.floor(Math.random() * activities.length)];
  }
};

const timeByActivity = (act: string) => {
  if (longActivities.has(act)) return 4;
  else if (midActivities.has(act)) return 3;
  else return 2;
};

export const generateItinerary = async (
  events: any[],
  startDate: string | Date,
  endDate: string | Date,
  startingPoint: string
) => {
  let currentDate = new Date(startDate);
  const end_date = new Date(endDate);
  let currentPoint = startingPoint;

  while (currentDate < end_date) {
    const currHour = currentDate.getHours();
    const act = activityByHour(currHour);
    if (!act) {
      currentPoint = startingPoint;
      console.log("nada");
      currentDate.setHours(currentDate.getHours() + 1);
    } else {
      console.log(
        act,
        currentDate,
        new Date(
          new Date(currentDate).setHours(
            currentDate.getHours() + timeByActivity(act)
          )
        )
      );

      const place_obj = await getPlaceToVisit(currentPoint, act);
      console.log(timeByActivity(act));
      if (place_obj) {
        const startTime = new Date(currentDate);
        const endTime = new Date(
          new Date(currentDate).setHours(
            currentDate.getHours() + timeByActivity(act)
          )
        );

        events.push({
          id: createEventId(),
          place_id: place_obj.place_id,
          title: place_obj.name,
          start: formattedDateCalendar(startTime),
          end: formattedDateCalendar(endTime),
        });

        const timeSpent =
          act === "restaurants" ? 120 : timeByActivity(act) * 60;

        currentDate = new Date(
          currentDate.setMinutes(currentDate.getMinutes() + timeSpent)
        );
        currentPoint = place_obj.place_id;
      } else {
        currentDate.setHours(currentDate.getHours() + 1);
      }
    }
  }
  return events;
};
